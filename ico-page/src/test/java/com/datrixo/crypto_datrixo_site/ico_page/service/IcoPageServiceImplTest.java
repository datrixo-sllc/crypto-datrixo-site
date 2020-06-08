package com.datrixo.crypto_datrixo_site.ico_page.service;

import com.datrixo.crypto_datrixo_site.ico_page.App;
import com.datrixo.crypto_datrixo_site.ico_page.dto.IcoPageDto;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import static org.junit.Assert.*;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = App.class)
public class IcoPageServiceImplTest {
    @Autowired
    private IcoPageService icoPageService;
    @Test
    public void getAllData() {
        IcoPageDto icoPageDto = icoPageService.getAllData();

    }
}
