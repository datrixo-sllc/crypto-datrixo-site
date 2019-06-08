package com.datrixo.crypto_datrixo_site.ico_page.controller;

import com.datrixo.crypto_datrixo_site.ico_page.dto.IcoPageDto;
import com.datrixo.crypto_datrixo_site.ico_page.service.IcoPageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.ResourceUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.security.Principal;

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
    IcoPageDto getHoldings(Principal principal) {
        IcoPageDto icoPageDto = icoPageService.getAllData();

        return null;
    }
}
