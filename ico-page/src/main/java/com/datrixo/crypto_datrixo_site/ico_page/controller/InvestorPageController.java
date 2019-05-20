package com.datrixo.crypto_datrixo_site.ico_page.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by Yuri Nikiforov.
 * Date: 21.05.2019
 * Time: 1:05
 **/
@RestController
@RequestMapping("investor")
public class InvestorPageController {

    @GetMapping(value = "/ppm", produces = "application/json")
    public @ResponseBody
    String getIcoPage() {
        return "{\"a\": \"25\", \"b\": \"50\"}";
    }
}
