package com.datrixo.crypto_datrixo_site.ico_page.controller;

import com.datrixo.crypto_datrixo_site.ico_page.dto.DocumentForDownloadDto;
import com.datrixo.crypto_datrixo_site.ico_page.dto.DocumentForDownloadListDto;
import com.datrixo.crypto_datrixo_site.ico_page.service.DocumentForDownloadService;
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
@RequestMapping("documents-for-download")
public class DocumentForDownloadController {
    @Autowired
    private DocumentForDownloadService documentForDownloadService;
    @Autowired
    private UserService userService;

    @PostMapping()
    public ResponseEntity<Object> createDocumentForDownload(@RequestParam(required = true, name="file") MultipartFile file,
                                             @RequestParam("itemdata") String itemData) throws IOException {
        DocumentForDownloadDto documentForDownloadDto = readData(itemData);
        documentForDownloadDto = documentForDownloadService.save(file, documentForDownloadDto);
        if (documentForDownloadDto != null && documentForDownloadDto.getId() != null) {
            URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
                    .buildAndExpand(documentForDownloadDto.getId()).toUri();
            return ResponseEntity.created(location).build();
        } else {
            return ResponseEntity.badRequest().build();
        }

    }

    @PutMapping()
    public ResponseEntity<Void> updateDocumentForDownload(@RequestParam(required = true, name="file") MultipartFile file,
                                                          @RequestParam("itemdata") String itemData) throws IOException {
        DocumentForDownloadDto documentForDownloadDto = readData(itemData);
        if (documentForDownloadDto != null && documentForDownloadDto.getId() != null) {
            documentForDownloadDto = documentForDownloadService.update(file, documentForDownloadDto);
            if (documentForDownloadDto == null || documentForDownloadDto.getId() == null)
                return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.noContent().build();
    }

    @PutMapping(value = "/document")
    public ResponseEntity<Void> updateDocumentForDownloadByDocument(@RequestParam("itemdata") String itemData) throws IOException {
        DocumentForDownloadDto documentForDownloadDto = readData(itemData);
        if (documentForDownloadDto != null && documentForDownloadDto.getId() != null) {
            documentForDownloadDto = documentForDownloadService.updateByDocument(documentForDownloadDto);
            if (documentForDownloadDto == null || documentForDownloadDto.getId() == null)
                return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.noContent().build();
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<DocumentForDownloadDto> getDocumentForDownloadDetail(@PathVariable("id") Long id) {
        DocumentForDownloadDto documentForDownloadDto = documentForDownloadService.getDocumentById(id);
        if(documentForDownloadDto != null) {
            return ResponseEntity.ok(documentForDownloadDto);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping(value = "/actual/{doctype}")
    public ResponseEntity<DocumentForDownloadDto> getActualDocumentForDownloadDetailByDocType(@PathVariable("doctype") String typedoc) {
        DocumentForDownloadDto documentForDownloadDto = documentForDownloadService.findActualByDocType(typedoc);
        if(documentForDownloadDto != null) {
            return ResponseEntity.ok(documentForDownloadDto);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<Void> deleteDocumentForDownload(@PathVariable("id") Long id) {
        documentForDownloadService.delete(id);
        return ResponseEntity.noContent().build();
    }

    private DocumentForDownloadDto readData(String data) throws IOException {
        ObjectMapper mapper = new ObjectMapper();
        return mapper.readValue(data, DocumentForDownloadDto.class);
    }

    @GetMapping(value = "/list", produces = "application/json")
    public @ResponseBody
    DocumentForDownloadListDto getDocumentForDownloadList() {
        return documentForDownloadService.getAll();
    }

    @GetMapping(value = "/check", produces = "application/json")
    public @ResponseBody String getCheck() {
        return "success";
    }
}
