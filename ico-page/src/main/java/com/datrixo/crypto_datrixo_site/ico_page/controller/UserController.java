package com.datrixo.crypto_datrixo_site.ico_page.controller;

import com.datrixo.crypto_datrixo_site.ico_page.dto.*;
import com.datrixo.crypto_datrixo_site.ico_page.mysql.model.Country;
import com.datrixo.crypto_datrixo_site.ico_page.mysql.model.HolderAccount;
import com.datrixo.crypto_datrixo_site.ico_page.mysql.model.Organization;
import com.datrixo.crypto_datrixo_site.ico_page.mysql.model.User;
import com.datrixo.crypto_datrixo_site.ico_page.service.UserService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.IOException;
import java.net.URI;
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


    @PostMapping()
    public ResponseEntity<Object> createUser(@RequestParam(required = false, name = "file") MultipartFile file,
                                             @RequestParam("userdata") String userData) throws IOException {
        UserDataDto userDto = readData(userData);
        Optional<User> optionalUser = userService.createUserByAdmin(file, userDto);
        if (optionalUser.isPresent()) {
            URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
                    .buildAndExpand(optionalUser.get().getId()).toUri();
            return ResponseEntity.created(location).build();
        } else {
            return ResponseEntity.badRequest().build();
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
}
