package com.datrixo.crypto_datrixo_site.ico_page.dto;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Yuri Nikiforov.
 * Date: 07.12.2020
 * Time: 13:34
 **/
public class SignedDocumentListByHolderAccountDto {
    private String holderAccount;
    private Long holderAccountId;
    private List<SignedDocumentDto> signedDocumentDtoList;

    public SignedDocumentListByHolderAccountDto() {
    }

    public SignedDocumentListByHolderAccountDto(String holderAccount, Long holderAccountId) {
        this.holderAccount = holderAccount;
        this.holderAccountId = holderAccountId;
    }

    public SignedDocumentListByHolderAccountDto(String holderAccount, Long holderAccountId,
                                                List<SignedDocumentDto> signedDocumentDtoList) {
        this.holderAccount = holderAccount;
        this.holderAccountId = holderAccountId;
        this.signedDocumentDtoList = signedDocumentDtoList;
    }

    public String getHolderAccount() {
        return holderAccount;
    }

    public void setHolderAccount(String holderAccount) {
        this.holderAccount = holderAccount;
    }

    public Long getHolderAccountId() {
        return holderAccountId;
    }

    public void setHolderAccountId(Long holderAccountId) {
        this.holderAccountId = holderAccountId;
    }

    public List<SignedDocumentDto> getSignedDocumentDtoList() {
        if (signedDocumentDtoList == null) {
            signedDocumentDtoList = new ArrayList<>();
        }
        return signedDocumentDtoList;
    }

    public void setSignedDocumentDtoList(List<SignedDocumentDto> signedDocumentDtoList) {
        this.signedDocumentDtoList = signedDocumentDtoList;
    }
}
