package com.datrixo.crypto_datrixo_site.ico_page.service;

import com.datrixo.crypto_datrixo_site.ico_page.dto.*;
import com.datrixo.crypto_datrixo_site.ico_page.mysql.model.HolderAccount;
import com.datrixo.crypto_datrixo_site.ico_page.mysql.model.ImageContent;
import com.datrixo.crypto_datrixo_site.ico_page.mysql.model.Organization;
import com.datrixo.crypto_datrixo_site.ico_page.mysql.model.User;
import com.datrixo.crypto_datrixo_site.ico_page.mysql.model.util.Role;
import com.datrixo.crypto_datrixo_site.ico_page.mysql.model.util.UserTitle;
import com.datrixo.crypto_datrixo_site.ico_page.mysql.model.util.UserType;
import com.datrixo.crypto_datrixo_site.ico_page.mysql.repository.*;
import com.datrixo.crypto_datrixo_site.ico_page.security.MediUser;
import com.datrixo.crypto_datrixo_site.ico_page.service.nikname_generator.NiknameGenerator;
import com.datrixo.crypto_datrixo_site.ico_page.service.password_generator.PasswordGenerator;
import com.datrixo.crypto_datrixo_site.ico_page.util.RequestUpdateUserData;
import com.datrixo.crypto_datrixo_site.ico_page.util.RequestUpdateUserPassword;
import org.apache.commons.io.IOUtils;
import org.hibernate.Hibernate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Created by Yuri Nikiforov.
 * Date: 20.05.2019
 * Time: 7:29
 **/
@Service
public class UserServiceImpl implements UserService {
    private final Logger LOGGER = LoggerFactory.getLogger(getClass());

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private OrganizationRepository organizationRepository;
    @Autowired
    private CountryRepository countryRepository;
    @Autowired
    private HolderAccountRepository holderAccountRepository;
    @Autowired
    private ImageContentRepository imageContentRepository;
    @Autowired
    private NiknameGenerator niknameGenerator;
    @Autowired
    private PasswordGenerator passwordGenerator;
    @Autowired
    PasswordEncoder passwordEncoder;

    private static final String USER_NOT_FOUND = "User not found";
    private static final String USER_PASSWORD_UPDATED = "User password is updated";
    private static final String CURRENT_PASSWORD_NOT_VALIDE = "Current password is not valid";
    private static final String REENTER_PASSWORD_IS_NOT_SAME = "Reenter password is not same";
    private static final String NEW_PASSWORD_IS_NOT_VALID = "Password must contain at least 1 lowercase alphabetical character, " +
            "must contain at least 1 uppercase alphabetical character, " +
            "must contain at least 1 numeric character, " +
            "must contain at least one special character in list: !@#$%^&* " +
            "and must be eight characters or longer.";

    //             ^	The password string will start this way.
//            (?=.*[a-z])	The string must contain at least 1 lowercase alphabetical character.
//            (?=.*[A-Z])	The string must contain at least 1 uppercase alphabetical character.
//            (?=.*[0-9])	The string must contain at least 1 numeric character.
//            (?=.*[!@#\$%\^&\*])	The string must contain at least one special character, but we are escaping
//                                  reserved RegEx characters to avoid conflict.
//            (?=.{8,})	The string must be eight characters or longer.
    private static final String PASSWORD_PATTERN =
            "((?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,})";
    // "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,})";

    @Override
    @Transactional(readOnly = true)
    public User findByUsername(String username) {
        Optional<User> optionalUser = userRepository.findByUsername(username);
        return optionalUser.orElse(null);
    }

    @Override
    @Transactional(readOnly = true)
    public User findByUsernameWithImage(String username) {
        Optional<User> optionalUser = userRepository.findByUsername(username);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            Hibernate.initialize(user.getImageContent());
            return user;
        } else {
            return null;
        }
    }

    @Override
    public User findUserByAccountAddress(String accountAddress) {

        return userRepository.findFirstByAccountAddress(accountAddress);
    }

    @Override
    @Transactional
    public User updateUser(MultipartFile file, RequestUpdateUserData updateUserData) throws IOException {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        MediUser currentUser = (MediUser) auth.getPrincipal();
        Optional<User> optionalUser = userRepository.findByUsername(currentUser.getUsername());
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            user.setTitle(UserTitle.valueOf(updateUserData.getTitle()));
            user.setFirstName(updateUserData.getFirstName());
            user.setLastName(updateUserData.getLastName());
            user.setPhone(updateUserData.getPhone());
            user.setEmail(updateUserData.getEmail());
            Hibernate.initialize(user.getImageContent());
            if (file != null) {
                if (user.getImageContent() != null) {
                    user.getImageContent().setContent(IOUtils.toByteArray(file.getInputStream()));
                    ImageContent imageContent = imageContentRepository.saveAndFlush(user.getImageContent());
                    user.setImageContent(imageContent);
                } else {
                    ImageContent imageContent = new ImageContent();
                    imageContent.setContent(IOUtils.toByteArray(file.getInputStream()));
                    imageContent = imageContentRepository.saveAndFlush(imageContent);
                    user.setImageContent(imageContent);
                }
            }
            return userRepository.saveAndFlush(user);
        } else {
            return null;
        }
    }

    @Override
    public String updateUserPassword(RequestUpdateUserPassword updateUserPassword) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        MediUser currentUser = (MediUser) auth.getPrincipal();
        Optional<User> optionalUser = userRepository.findByUsername(currentUser.getUsername());
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            if (!user.getPassword().equals(updateUserPassword.getCurrentPassword())) {
                return CURRENT_PASSWORD_NOT_VALIDE;
            }
            if (!updateUserPassword.getNewPassword().equals(updateUserPassword.getNewPasswordReent())) {
                return REENTER_PASSWORD_IS_NOT_SAME;
            }
            Pattern pattern = Pattern.compile(PASSWORD_PATTERN);
            Matcher matcher = pattern.matcher(updateUserPassword.getNewPassword());
            if (!matcher.matches()) {
                return NEW_PASSWORD_IS_NOT_VALID;
            }

            user.setPassword(passwordEncoder.encode(updateUserPassword.getNewPassword()));
            userRepository.saveAndFlush(user);
            return USER_PASSWORD_UPDATED;
        } else {
            return USER_NOT_FOUND;
        }
    }

    @Override
    public Optional<Role> getRoleForCurrentUser() {
        Optional<User> optionalUser = getCurrentUser();
        return optionalUser.map(User::getRole);
    }

    @Override
    public boolean checkRoleForCurrentUser(Role role) {
        Optional<Role> optionalRole = getRoleForCurrentUser();
        return optionalRole.filter(role::equals).isPresent();
    }

    @Override
    public List<User> findAll() {
        return userRepository.findAll();
    }

    @Override
    public Optional<User> getCurrentUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        MediUser currentUser = (MediUser) auth.getPrincipal();
        return userRepository.findByUsername(currentUser.getUsername());
    }

    @Override
    @Transactional
    public Optional<User> createUserByAdmin(MultipartFile file, UserDataDto userDataDto) throws IOException {
        if (userDataDto == null) {
            LOGGER.error("userDto == null");
            return Optional.empty();
        }
        if (checkRoleForCurrentUser(Role.ADMIN)) {
            User user = new User(userDataDto.getUsername(), userDataDto.getPassword(),
                    Role.valueOf(userDataDto.getRole()), UserType.valueOf(userDataDto.getUserType()),
                    userDataDto.getFirstName(), userDataDto.getLastName(), userDataDto.getAccountAddress(),
                    userDataDto.getEmail(), userDataDto.getPhone());
            user = userRepository.save(user);
            if (userDataDto.getUserType().equals(UserType.COMPANY.name()) && userDataDto.getOrganization() != null
                    && userDataDto.getOrganization().getCountry() != null
                    && userDataDto.getOrganization().getCountry().getCode() != null) {
                OrganizationDto orgDto = userDataDto.getOrganization();
                Optional<Organization> optionalOrganization =
                        organizationRepository.findFirstByCompanyName(orgDto.getCompanyName());
                if (optionalOrganization.isPresent()) {
                    user.setOrganization(optionalOrganization.get());
                } else {
                    Organization org = new Organization(orgDto.getCompanyName(), orgDto.getIncorporateDate(),
                            orgDto.getOpencorporatesId(),
                            orgDto.getEmail(),
                            orgDto.getPhone(), orgDto.getStreetAddress(),
                            orgDto.getCity(), orgDto.getState(), orgDto.getZip(),
                            countryRepository.findByCode(orgDto.getCountry().getCode()).orElse(null));
                    user.setOrganization(organizationRepository.save(org));
                }
            }
            if (file != null) {
                ImageContent imageContent = new ImageContent();
                imageContent.setContent(IOUtils.toByteArray(file.getInputStream()));
                imageContent = imageContentRepository.save(imageContent);
                user.setImageContent(imageContent);
            }
            if (userDataDto.getAccounts() != null && userDataDto.getAccounts().size() > 0) {
                List<HolderAccount> accounts = new ArrayList<>();
                for (HolderAccountDto accountDto : userDataDto.getAccounts()) {
                    accounts.add(holderAccountRepository.save(new HolderAccount(accountDto.getAddress(), user,
                            accountDto.getCreateDate(), accountDto.getPaidPrice(), accountDto.getInitialInvest())));
                }
                user.setAccounts(accounts);
            } else {
                user.getAccounts().clear(); // fix error with orphanRemoval = true for accounts
            }
            user = userRepository.save(user);

            return Optional.of(user);
        } else {
            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            MediUser currentUser = (MediUser) auth.getPrincipal();
            LOGGER.error("Current user is not ADMIN: {}", currentUser.getUsername());
            return Optional.empty();
        }

    }

    @Override
    public String generateUserName(String keyword) {
        String name = niknameGenerator.generate(keyword);
        Optional<User> optionalUser = userRepository.findByUsername(name);
        if (optionalUser.isEmpty()) {
            return name;
        } else {
            return generateUserName(keyword);
        }
    }

    @Override
    public String generatePassword() {
        return passwordGenerator.generate();
    }

    @Override
    @Transactional
    public Optional<UserDataDto> getUserDetail(Long id) {
        Optional<User> optionalUser = findById(id);
        if (optionalUser.isPresent()) {
            UserDataDto userDto = new UserDataDto();
            User user = optionalUser.get();
            if (user.getOrganization() != null) {
                OrganizationDto organizationDto = new OrganizationDto(user.getOrganization().getId(),
                        user.getOrganization().getCompanyName(),
                        user.getOrganization().getIncorporateDate(),
                        user.getOrganization().getOpencorporatesId(),
                        user.getOrganization().getEmail(),
                        user.getOrganization().getPhone(),
                        user.getOrganization().getStreetAddress(),
                        user.getOrganization().getCity(),
                        user.getOrganization().getState(),
                        user.getOrganization().getZip(),
                        user.getOrganization().getCountry() != null ?
                                new CountryDto(user.getOrganization().getCountry().getId(),
                                        user.getOrganization().getCountry().getName(),
                                        user.getOrganization().getCountry().getCode()) : null);

                userDto.setOrganization(organizationDto);
            }
            userDto.setId(user.getId());
            userDto.setUsername(user.getUsername());
            userDto.setPassword(user.getPassword());
            userDto.setRole(user.getRole() != null ? user.getRole().name() : null);
            userDto.setUserType(user.getUserType() != null ? user.getUserType().name() : null);
            userDto.setTitle(user.getTitle() != null ? user.getTitle().name() : null);
            userDto.setFirstName(user.getFirstName());
            userDto.setLastName(user.getLastName());
            userDto.setAccountAddress(user.getAccountAddress());
            userDto.setEmail(user.getEmail());
            userDto.setPhone(user.getPhone());
            if (user.getAccounts().size() > 0) {
                List<HolderAccountDto> accountDtos = new ArrayList<>();
                user.getAccounts()
                        .forEach(account -> {
                            HolderAccountDto accountDto = new HolderAccountDto(account.getId(),
                                    account.getAddress(),
                                    account.getUser() != null ? account.getUser().getId() : null,
                                    account.getCreateDate(), account.getPaidPrice(), account.getInitialInvest());
                            accountDtos.add(accountDto);
                        });
                userDto.setAccounts(accountDtos);
            }

            if (user.getImageContent() != null && user.getImageContent().getId() != null) {
                userDto.setImageContent(user.getImageContent().getContent());
                userDto.setImageContentId(user.getImageContent().getId());
            }

            return Optional.of(userDto);
        } else {
            LOGGER.error("User with ID = {} not found", id);
            return Optional.empty();
        }
    }

    @Transactional
    public Optional<User> findById(Long id) {
        return userRepository.findById(id);
    }

    @Override
    public void deleteUser(Long id) {
        if (checkRoleForCurrentUser(Role.ADMIN)) {
            userRepository.deleteById(id);
        }
    }

    @Override
    @Transactional
    public User updateUserByAdmin(MultipartFile file, UserDataDto userDto) throws IOException {
        if (!checkRoleForCurrentUser(Role.ADMIN)) {
            return null;
        }
        Optional<User> optionalUser = findById(userDto.getId());
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            user.setPassword(passwordEncoder.encode(userDto.getPassword()));
            user.setRole(Role.valueOf(userDto.getRole()));
            user.setUserType(UserType.valueOf(userDto.getUserType()));
            user.setFirstName(userDto.getFirstName());
            user.setLastName(userDto.getLastName());
            user.setAccountAddress(userDto.getAccountAddress());
            user.setEmail(userDto.getEmail());
            user.setPhone(userDto.getPhone());
            if (userDto.getUserType().equals(UserType.COMPANY.name()) && userDto.getOrganization() != null
                    && userDto.getOrganization().getCountry() != null
                    && userDto.getOrganization().getCountry().getCode() != null) {
                if (userDto.getOrganization().getId() != null) {
                    Optional<Organization> optionalOrganization = organizationRepository.findById(userDto.getId());
                    if (optionalOrganization.isPresent()) {
                        Organization organization = optionalOrganization.get();
                        organization.setCompanyName(userDto.getOrganization().getCompanyName());
                        organization.setIncorporateDate(userDto.getOrganization().getIncorporateDate());
                        organization.setOpencorporatesId(userDto.getOrganization().getOpencorporatesId());
                        organization.setEmail(userDto.getOrganization().getEmail());
                        organization.setPhone(userDto.getOrganization().getPhone());
                        organization.setStreetAddress(userDto.getOrganization().getStreetAddress());
                        organization.setCity(userDto.getOrganization().getCity());
                        organization.setState(userDto.getOrganization().getState());
                        organization.setZip(userDto.getOrganization().getZip());
                        organization.setCountry(countryRepository
                                .findByCode(userDto.getOrganization().getCountry().getCode()).orElse(null));
                    } else {
                        user = createOrganization(user, userDto);
                    }
                } else {
                    user = createOrganization(user, userDto);
                }
            } else if (userDto.getUserType().equals(UserType.INDIVIDUAL.name()) && user.getOrganization() != null) {
                user.setOrganization(null);
                user = userRepository.save(user);
            }
            if (file != null) {
                ImageContent imageContent = new ImageContent();
                imageContent.setContent(IOUtils.toByteArray(file.getInputStream()));
                imageContent = imageContentRepository.save(imageContent);
                user.setImageContent(imageContent);
            }
            Optional<List<HolderAccount>> optionalExistAccounts = holderAccountRepository.findHolderAccountsByUser(user);
            if (optionalExistAccounts.isPresent()) {
                List<HolderAccount> existAccounts = optionalExistAccounts.get();
                if (userDto.getAccounts() != null && userDto.getAccounts().size() > 0) {
                    List<HolderAccount> accountsForDel = new ArrayList<>();
                    existAccounts.forEach(holderAccount -> {
                        AtomicInteger flag = new AtomicInteger();
                        userDto.getAccounts().forEach(holderAccountDto -> {
                            if (holderAccount.getAddress().equalsIgnoreCase(holderAccountDto.getAddress())) {
                                flag.getAndIncrement();
                            }
                        });
                        if (flag.get() == 0) {
                            accountsForDel.add(holderAccount);
                        }
                    });
                    for (HolderAccount holderAccount : accountsForDel) {
                        user.getAccounts().remove(holderAccount);
                        user = userRepository.saveAndFlush(user);
                    }
                    for (HolderAccountDto accountDto : userDto.getAccounts()) {
                        HolderAccount account = holderAccountRepository.findFirstByAddress(accountDto.getAddress());
                        if (account != null) {
                            if (account.getUser() == null ||
                                    account.getUser() != null && account.getUser().getId() == user.getId()) {
                                account.setCreateDate(accountDto.getCreateDate());
                                account.setPaidPrice(accountDto.getPaidPrice());
                                account.setInitialInvest(accountDto.getInitialInvest());
                                if (account.getUser() == null) {
                                    account.setUser(user);
                                    user.getAccounts().add(holderAccountRepository.save(account));
                                } else {
                                    holderAccountRepository.save(account);
                                }
                            } else {
                                LOGGER.error("an attempt to add account {} to user {} owned by user {}",
                                        accountDto.getAddress(), user.getUsername(), account.getUser().getUsername());
                            }
                        } else {
                            user.getAccounts().add(holderAccountRepository.save(new HolderAccount(accountDto.getAddress(), user,
                                    accountDto.getCreateDate(), accountDto.getPaidPrice(), accountDto.getInitialInvest())));
                        }
                    }
                } else {
                    user.getAccounts().clear();
                    user = userRepository.saveAndFlush(user);
                }
            } else {
                if (userDto.getAccounts() != null && userDto.getAccounts().size() > 0) {
                    List<HolderAccount> accounts = new ArrayList<>();
                    for (HolderAccountDto accountDto : userDto.getAccounts()) {
                        accounts.add(holderAccountRepository.save(new HolderAccount(accountDto.getAddress(), user,
                                accountDto.getCreateDate(), accountDto.getPaidPrice(), accountDto.getInitialInvest())));
                    }
                    user.setAccounts(accounts);
                }
            }
            return userRepository.save(user);
        } else {
            LOGGER.error("User with ID = {} not found", userDto.getId());
            return null;
        }
    }

    @Override
    public Optional<User> findFirstByAccountAddress(String accountAddress) {
        return Optional.of(userRepository.findFirstByAccountAddress(accountAddress));
    }

    private User createOrganization(User user, UserDataDto userDto) {
        OrganizationDto orgDto = userDto.getOrganization();
        Optional<Organization> optionalOrganization =
                organizationRepository.findFirstByCompanyName(orgDto.getCompanyName());
        if (optionalOrganization.isPresent()) {
            user.setOrganization(optionalOrganization.get());
        } else {
            Organization org = new Organization(orgDto.getCompanyName(), orgDto.getIncorporateDate(),
                    orgDto.getOpencorporatesId(),
                    orgDto.getEmail(),
                    orgDto.getPhone(), orgDto.getStreetAddress(),
                    orgDto.getCity(), orgDto.getState(), orgDto.getZip(),
                    countryRepository.findByCode(orgDto.getCountry().getCode()).orElse(null));
            user.setOrganization(organizationRepository.save(org));
        }
        return user;
    }


}
