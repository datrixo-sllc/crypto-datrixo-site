package com.datrixo.crypto_datrixo_site.ico_page.controller;

import com.datrixo.crypto_datrixo_site.ico_page.dto.HolderDto;
import com.datrixo.crypto_datrixo_site.ico_page.dto.IcoPageDto;
import com.datrixo.crypto_datrixo_site.ico_page.dto.UserDto;
import com.datrixo.crypto_datrixo_site.ico_page.dto.UserMainDataDto;
import com.datrixo.crypto_datrixo_site.ico_page.mysql.model.HolderAccount;
import com.datrixo.crypto_datrixo_site.ico_page.mysql.model.User;
import com.datrixo.crypto_datrixo_site.ico_page.security.MediUser;
import com.datrixo.crypto_datrixo_site.ico_page.service.IcoPageService;
import com.datrixo.crypto_datrixo_site.ico_page.service.UserService;
import com.datrixo.crypto_datrixo_site.ico_page.util.RequestUpdateUserData;
import com.datrixo.crypto_datrixo_site.ico_page.util.RequestUpdateUserPassword;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.util.ResourceUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.math.BigDecimal;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.security.Principal;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Created by Yuri Nikiforov.
 * Date: 21.05.2019
 * Time: 1:05
 **/
@RestController
@RequestMapping("investor")
public class InvestorPageController {

    @Autowired
    ResourceLoader resourceLoader;
    @Autowired
    IcoPageService icoPageService;
    @Autowired
    UserService userService;

    private final static int UNIT_VALUE = 300;

    @RequestMapping(value = "/ppm", method = RequestMethod.GET)
    public ResponseEntity<Resource> getIcoPage() throws IOException {
        Resource fileResource = resourceLoader.getResource("classpath:ppm.pdf");
        HttpHeaders headers = new HttpHeaders();
        headers.add("Cache-Control", "no-cache, no-store, must-revalidate");
        headers.add("Pragma", "no-cache");
        headers.add("Expires", "0");

        InputStreamResource resource = new InputStreamResource(fileResource.getInputStream());


        return ResponseEntity.ok()
                .headers(headers)
                .contentLength(fileResource.contentLength())
                .contentType(MediaType.parseMediaType("application/octet-stream"))
                .body(resource);
    }

    @PostMapping(value = "/signed-agreement")
    public UploadFileResponse uploadFile(@RequestParam("file") MultipartFile file) {
        return new UploadFileResponse("success");
    }

    @GetMapping(value = "/holdings", produces = "application/json")
    public @ResponseBody
    IcoPageDto getHoldings() {
        IcoPageDto icoPageDto = icoPageService.getAllData();
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        MediUser currentUser = (MediUser)auth.getPrincipal();
        List<HolderDto> holderDtoList = icoPageDto.getHolders();
        icoPageDto.setHolders(holderDtoList.stream()
                .filter(holderDto -> hasAccount(holderDto.getAddress(), currentUser.getAccounts()))
                .collect(Collectors.toList()));
        return icoPageDto;
    }

    private boolean hasAccount(String holderAccountAddress, List<HolderAccount> principalAccounts) {
        boolean result = false;
        return principalAccounts.stream()
                .anyMatch(holderAccount1 -> holderAccount1.getAddress().equalsIgnoreCase(holderAccountAddress));
    }

    @GetMapping(value = "/user-data", produces = "application/json")
    public @ResponseBody
    UserDto getUserData() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        MediUser currentUser = (MediUser)auth.getPrincipal();
        User user = userService.findByUsernameWithImage(currentUser.getUsername());
        UserDto userDto = null;
        if (user != null) {
            userDto = new UserDto(user.getUsername(), user.getRole().name(), user.getTitle().name(),
                    user.getFirstName(), user.getLastName(),
                    user.getPhone(),
                    user.getOrganization() != null ? user.getOrganization().getCompanyName() : "",
                    user.getOrganization() != null ? user.getOrganization().getIncorporateDate() : null,
                    user.getOrganization() != null ? user.getOrganization().getPhone() : "",
                    user.getOrganization() != null ? user.getOrganization().getStreetAddress() : "",
                    user.getOrganization() != null ? user.getOrganization().getCity() : "",
                    user.getOrganization() != null ? user.getOrganization().getState() : "",
                    user.getOrganization() != null ? user.getOrganization().getZip() : "",
                    user.getOrganization() != null ? user.getOrganization().getCountry() != null ?
                            user.getOrganization().getCountry().getName() : ""
                            : "",
                    user.getImageContent() != null ? user.getImageContent().getContent() : null
                    );
        } else {
            throw new UsernameNotFoundException("user not found");
        }
        return userDto;
    }

    @PutMapping(value = "/update-user-data")
    public ResponseEntity<Void> updateUser(@RequestParam(required = false, name="file") MultipartFile file,
                                           @RequestParam("userdata") String userdata) throws IOException {

        ObjectMapper mapper = new ObjectMapper();
        RequestUpdateUserData updateUserData = mapper.readValue(userdata, RequestUpdateUserData.class);

        User currentUser = userService.updateUser(file, updateUserData);
        if (currentUser == null) {
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.noContent().build();
        }
    }
    @PostMapping(value = "/update-user-password")
    public @ResponseBody String updateUserPassword(@RequestBody RequestUpdateUserPassword updateUserPassword) {
        return userService.updateUserPassword(updateUserPassword);
    }

    @GetMapping(value = "/user-main-data", produces = "application/json")
    public @ResponseBody
    UserMainDataDto getUserMainData() {
        IcoPageDto icoPageDto = getHoldings();

        Integer investedTokens = icoPageDto.getHolders().parallelStream()
                .reduce(0, (partialResult, holder) ->
                        new BigDecimal(holder.getPaidPrice()).intValue() * Integer.valueOf(holder.getShareTokens()),
                        Integer::sum);

        Integer shareTokens = icoPageDto.getHolders().parallelStream()
                .reduce(0, (partialResult, holder) -> Integer.valueOf(holder.getShareTokens()), Integer::sum);
        return new UserMainDataDto(investedTokens, 0,
                shareTokens * UNIT_VALUE, 0);
    }

}
