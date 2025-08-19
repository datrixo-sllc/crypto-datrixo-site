package com.datrixo.crypto_datrixo_site.ico_page.controller;

import com.datrixo.crypto_datrixo_site.ico_page.dto.*;
// import com.datrixo.crypto_datrixo_site.ico_page.h2.model.Holder;
import com.datrixo.crypto_datrixo_site.ico_page.mysql.model.Holder;
import com.datrixo.crypto_datrixo_site.ico_page.mysql.model.Country;
import com.datrixo.crypto_datrixo_site.ico_page.mysql.model.HolderAccount;
import com.datrixo.crypto_datrixo_site.ico_page.mysql.model.Organization;
import com.datrixo.crypto_datrixo_site.ico_page.mysql.model.User;
import com.datrixo.crypto_datrixo_site.ico_page.security.MediUser;
import com.datrixo.crypto_datrixo_site.ico_page.service.HolderService;
import com.datrixo.crypto_datrixo_site.ico_page.service.UserService;
import com.datrixo.crypto_datrixo_site.ico_page.util.RequestUpdateUserData;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.IOException;
import java.math.BigDecimal;
import java.net.URI;
import java.text.DecimalFormat;
import java.text.DecimalFormatSymbols;
import java.util.*;

/**
 * Created by Yuri Nikiforov.
 * Date: 05.09.2021
 * Time: 11:15
 **/
@RestController
@RequestMapping("user")
public class UserController {
    @Autowired
    private UserService userService;
    @Autowired
    HolderService holderService;

    private final static int UNIT_VALUE = 187;
    private static DecimalFormatSymbols symbols = new DecimalFormatSymbols(Locale.US);
    private static DecimalFormat df2 = new DecimalFormat("0.00", symbols);
    private static DecimalFormat df1 = new DecimalFormat("0.0", symbols);


    @PostMapping()
    public ResponseEntity<Object> createUser(@RequestParam(required = false, name = "file") MultipartFile file,
                                             @RequestParam("itemdata") String itemData) throws IOException {
        UserDataDto userDto = readData(itemData);
        Optional<User> optionalUser = userService.createUserByAdmin(file, userDto);
        if (optionalUser.isPresent()) {
            URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
                    .buildAndExpand(optionalUser.get().getId()).toUri();
            return ResponseEntity.created(location).build();
        } else {
            return ResponseEntity.badRequest().build();
        }

    }

    @PutMapping()
    public ResponseEntity<Void> updateUser(@RequestParam(required = false, name = "file") MultipartFile file,
                                           @RequestParam("itemdata") String itemData) throws IOException {

        UserDataDto userDto = readData(itemData);

        User currentUser = userService.updateUserByAdmin(file, userDto);
        if (currentUser == null) {
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.noContent().build();
        }
    }

    private UserDataDto readData(String data) throws IOException {
        ObjectMapper mapper = new ObjectMapper();
        return mapper.readValue(data, UserDataDto.class);
    }

    @PostMapping(value = "/name", produces = "application/json")
    public @ResponseBody
    Map<String, String> generateName(@RequestParam(required = false, name = "keyword") String keyword) {
        HashMap<String, String> map = new HashMap<>();
        map.put("name", userService.generateUserName(keyword));
        return map;
    }

    @GetMapping(value = "/password", produces = "application/json")
    public @ResponseBody
    Map<String, String> generatePassword() {
        HashMap<String, String> map = new HashMap<>();
        map.put("password", userService.generatePassword());
        return map;
    }

    @GetMapping(value = "/list", produces = "application/json")
    public @ResponseBody
    UserDataListDto getUserList() {
        List<User> users = userService.findAll();
        UserDataListDto listDto = new UserDataListDto();
        for (User user : users) {
            UserDataDto userDto = new UserDataDto(user.getId(), user.getUsername(), user.getRole().name(),
                    user.getUserType().name(), user.getTitle().name(), user.getFirstName(), user.getLastName(),
                    user.getEmail(), user.getPhone(),
                    user.getImageContent() != null ? user.getImageContent().getContent() : null);
            List<HolderAccountDto> accountDtoList = new ArrayList<>();
            for (HolderAccount account : user.getAccounts()) {
                HolderAccountDto accountDto = new HolderAccountDto(account.getId(), account.getAddress(),
                        account.getUser().getId(), account.getCreateDate(), account.getPaidPrice(), account.getInitialInvest());
                accountDtoList.add(accountDto);
            }
            userDto.setAccounts(accountDtoList);
            if (user.getOrganization() != null) {
                Organization org = user.getOrganization();
                Country country = org.getCountry();
                OrganizationDto organizationDto = new OrganizationDto(org.getId(), org.getCompanyName(), org.getIncorporateDate(),
                        org.getOpencorporatesId(), org.getEmail(), org.getPhone(), org.getStreetAddress(), org.getCity(),
                        org.getState(), org.getZip(),
                        new CountryDto(country.getId(), country.getName(), country.getCode()));
            }
            listDto.getUsers().add(userDto);
        }

        return listDto;
    }

    @GetMapping(value = "/check", produces = "application/json")
    public @ResponseBody String getCheck() {
        return "success";
    }

    @GetMapping(value = "/{id}", produces = "application/json")
    public ResponseEntity<UserDataDto> getUserDetail(@PathVariable("id") Long id) {
        Optional<UserDataDto> optionalUserDto = userService.getUserDetail(id);
        if (optionalUserDto.isPresent()) {
            return ResponseEntity.ok(optionalUserDto.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<Void> deleteMeal(@PathVariable("id") Long id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping(value = "/user-data/{id}", produces = "application/json")
    public @ResponseBody
    UserDto getUserData(@PathVariable("id") Long id) {
        Optional<User> optionalUser = userService.findById(id);
        if (!optionalUser.isPresent()){
            throw new UsernameNotFoundException("user not found");
        }
        User user = userService.findByUsernameWithImage(optionalUser.get().getUsername());
        UserDto userDto = null;
        if (user != null) {
            List<HolderAccountDto> holderAccountDtos = new ArrayList<>();
            Optional<List<HolderAccount>> optionalHolderAccounts = holderService.findHolderAccountsByUser(user);
            if (optionalHolderAccounts.isPresent() && optionalHolderAccounts.get().size() > 0) {
                optionalHolderAccounts.get().forEach(account -> {
                    Optional<Holder> optionalHolder = holderService.findHolderByAddress(account.getAddress().toLowerCase());
                    BigDecimal paidPrice = null;
                    if (account != null) {
                        if (!account.getInitialInvest()) {
                            paidPrice = account.getPaidPrice();
                        } else {
                            paidPrice = BigDecimal.ZERO;
                        }
                    }
                    String shareTokens = null;
                    String share = null;
                    Date createDate = null;
                    if (optionalHolder.isPresent()) {
                        createDate = optionalHolder.get().getTimeDate();
                        shareTokens = String.valueOf(optionalHolder.get().getShareTokens());
                        share = df2.format(optionalHolder.get().getShare());
                    }
                    HolderAccountDto holderAccountDto = new HolderAccountDto(account.getId(), account.getAddress(), null, createDate,
                            paidPrice, account.getInitialInvest(), shareTokens, share);
                    holderAccountDtos.add(holderAccountDto);
                });
            }
            userDto = new UserDto(null, user.getUsername(), user.getRole().name(), user.getTitle().name(),
                    user.getFirstName(), user.getLastName(),
                    user.getPhone(),
                    user.getEmail(),
                    user.getOrganization() != null ? user.getOrganization().getCompanyName() : "",
                    user.getOrganization() != null ? user.getOrganization().getIncorporateDate() : null,
                    user.getOrganization() != null ? user.getOrganization().getOpencorporatesId() : null,
                    user.getOrganization() != null ? user.getOrganization().getPhone() : "",
                    user.getOrganization() != null ? user.getOrganization().getStreetAddress() : "",
                    user.getOrganization() != null ? user.getOrganization().getCity() : "",
                    user.getOrganization() != null ? user.getOrganization().getState() : "",
                    user.getOrganization() != null ? user.getOrganization().getZip() : "",
                    user.getOrganization() != null ? user.getOrganization().getCountry() != null ?
                            user.getOrganization().getCountry().getName() : ""
                            : "",
                    user.getImageContent() != null ? user.getImageContent().getContent() : null,
                    holderAccountDtos.size() > 0 ? holderAccountDtos : null);
        } else {
            throw new UsernameNotFoundException("user not found");
        }
        return userDto;
    }
}
