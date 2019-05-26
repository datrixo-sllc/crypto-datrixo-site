package com.datrixo.crypto_datrixo_site.ico_page.controller;

import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
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

/**
 * Created by Yuri Nikiforov.
 * Date: 21.05.2019
 * Time: 1:05
 **/
@RestController
@RequestMapping("investor")
public class InvestorPageController {

    @RequestMapping(value = "/ppm", method = RequestMethod.GET)
    public ResponseEntity<Resource> getIcoPage() throws IOException {
        File file = ResourceUtils.getFile("classpath:ppm.pdf");
        HttpHeaders headers = new HttpHeaders();
        headers.add("Cache-Control", "no-cache, no-store, must-revalidate");
        headers.add("Pragma", "no-cache");
        headers.add("Expires", "0");

        InputStreamResource resource = new InputStreamResource(new FileInputStream(file));


        return ResponseEntity.ok()
                .headers(headers)
                .contentLength(file.length())
                .contentType(MediaType.parseMediaType("application/octet-stream"))
                .body(resource);
    }

    @PostMapping(value = "/signed-agreement")
    public UploadFileResponse uploadFile(@RequestParam("file") MultipartFile file) {
        return new UploadFileResponse("success");
    }
}
