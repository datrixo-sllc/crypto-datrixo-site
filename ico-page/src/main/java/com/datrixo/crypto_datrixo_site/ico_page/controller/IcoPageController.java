package com.datrixo.crypto_datrixo_site.ico_page.controller;

import com.datrixo.crypto_datrixo_site.ico_page.dto.IcoPageDto;
import com.datrixo.crypto_datrixo_site.ico_page.service.IcoPageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by Yuri Nikiforov.
 * Date: 05.02.2019
 * Time: 10:45
 */
@RestController
@RequestMapping("ico")
public class IcoPageController {

    @Autowired
    IcoPageService icoPageService;

    @GetMapping(value = "/ico-page", produces = "application/json")
    public @ResponseBody
    IcoPageDto getIcoPage() {
        return icoPageService.getAllData();
    }
}
