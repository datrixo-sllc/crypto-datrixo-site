package com.datrixo.crypto_datrixo_site.ico_page.dto;

/**
 * Created by Yuri Nikiforov.
 * Date: 03.06.2020
 * Time: 19:03
 **/
public class UserMainDataDto {
    private int totalInvestedInt;
    private int totalInvestedDec;
    private int valueEstimateInt;
    private int valueEstimateDec;

    public UserMainDataDto() {
    }

    public UserMainDataDto(int totalInvestedInt, int totalInvestedDec, int valueEstimateInt, int valueEstimateDec) {
        this.totalInvestedInt = totalInvestedInt;
        this.totalInvestedDec = totalInvestedDec;
        this.valueEstimateInt = valueEstimateInt;
        this.valueEstimateDec = valueEstimateDec;
    }

    public int getTotalInvestedInt() {
        return totalInvestedInt;
    }

    public void setTotalInvestedInt(int totalInvestedInt) {
        this.totalInvestedInt = totalInvestedInt;
    }

    public int getTotalInvestedDec() {
        return totalInvestedDec;
    }

    public void setTotalInvestedDec(int totalInvestedDec) {
        this.totalInvestedDec = totalInvestedDec;
    }

    public int getValueEstimateInt() {
        return valueEstimateInt;
    }

    public void setValueEstimateInt(int valueEstimateInt) {
        this.valueEstimateInt = valueEstimateInt;
    }

    public int getValueEstimateDec() {
        return valueEstimateDec;
    }

    public void setValueEstimateDec(int valueEstimateDec) {
        this.valueEstimateDec = valueEstimateDec;
    }
}
