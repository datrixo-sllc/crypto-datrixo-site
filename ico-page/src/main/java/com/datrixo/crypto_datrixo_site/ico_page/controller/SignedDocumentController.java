package com.datrixo.crypto_datrixo_site.ico_page.controller;

import com.datrixo.crypto_datrixo_site.ico_page.dto.SignedDocumentAdmListDto;
import com.datrixo.crypto_datrixo_site.ico_page.dto.SignedDocumentDto;
import com.datrixo.crypto_datrixo_site.ico_page.dto.SignedDocumentListDto;
import com.datrixo.crypto_datrixo_site.ico_page.service.SignedDocumentService;
import com.datrixo.crypto_datrixo_site.ico_page.service.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.IOException;
import java.net.URI;

/**
 * Created by Yuri Nikiforov.
 * Date: 30.09.2020
 * Time: 19:12
 **/
@RestController
@RequestMapping("signed-documents")
public class SignedDocumentController {
    @Autowired
    private SignedDocumentService signedDocumentService;
    @Autowired
    private UserService userService;

    @PostMapping()
    public ResponseEntity<Object> createSignedDocument(@RequestParam(required = true, name="file") MultipartFile file,
                                             @RequestParam("itemdata") String itemData) throws IOException {
        SignedDocumentDto signedDocumentDto = readData(itemData);
        signedDocumentDto = signedDocumentService.save(file, signedDocumentDto);
        if (signedDocumentDto != null && signedDocumentDto.getId() != null) {
            URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
                    .buildAndExpand(signedDocumentDto.getId()).toUri();
            return ResponseEntity.created(location).build();
        } else {
            return ResponseEntity.badRequest().build();
        }

    }

    @PostMapping(value = "/byadmin")
    public ResponseEntity<Object> createSignedDocumentByAdmin(@RequestParam(required = true, name="file") MultipartFile file,
                                                       @RequestParam("itemdata") String itemData) throws IOException {
        SignedDocumentDto signedDocumentDto = readData(itemData);
        signedDocumentDto = signedDocumentService.saveByAdmin(file, signedDocumentDto);
        if (signedDocumentDto != null && signedDocumentDto.getId() != null) {
            URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
                    .buildAndExpand(signedDocumentDto.getId()).toUri();
            return ResponseEntity.created(location).build();
        } else {
            return ResponseEntity.badRequest().build();
        }

    }

    @PutMapping()
    public ResponseEntity<Void> updateSignedDocument(@RequestParam(required = true, name="file") MultipartFile file,
                                                          @RequestParam("itemdata") String itemData) throws IOException {
        SignedDocumentDto signedDocumentDto = readData(itemData);
        if (signedDocumentDto != null && signedDocumentDto.getId() != null) {
            signedDocumentDto = signedDocumentService.update(file, signedDocumentDto);
            if (signedDocumentDto == null || signedDocumentDto.getId() == null)
                return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.noContent().build();
    }
    @PutMapping(value = "/document")
    public ResponseEntity<Void> updateSignedDocumentByDocument(@RequestParam("itemdata") String itemData) throws IOException {
        SignedDocumentDto signedDocumentDto = readData(itemData);
        if (signedDocumentDto != null && signedDocumentDto.getId() != null) {
            signedDocumentDto = signedDocumentService.updateByDocument(signedDocumentDto);
            if (signedDocumentDto == null || signedDocumentDto.getId() == null)
                return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.noContent().build();
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<SignedDocumentDto> getDocumentForDownloadDetail(@PathVariable("id") Long id) {
        SignedDocumentDto documentForDownloadDto = signedDocumentService.findById(id);
        if(documentForDownloadDto != null) {
            return ResponseEntity.ok(documentForDownloadDto);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<Void> deleteSignedDocument(@PathVariable("id") Long id) throws IOException {
        signedDocumentService.delete(id);
        return ResponseEntity.noContent().build();
    }

    private SignedDocumentDto readData(String data) throws IOException {
        ObjectMapper mapper = new ObjectMapper();
        return mapper.readValue(data, SignedDocumentDto.class);
    }

    @GetMapping(value = "/list", produces = "application/json")
    public @ResponseBody
    SignedDocumentAdmListDto getSignedDocumentList() {
        return signedDocumentService.findAllAdm();
    }

    @GetMapping(value = "/check", produces = "application/json")
    public @ResponseBody String getCheck() {
        return "success";
    }
}
