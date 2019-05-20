package com.datrixo.crypto_datrixo_site.ico_page.security;

public enum StatusResponseAuth {
    /* аутентификация успешна */
    OK,
    /* незарегистрированный логин */
    LOGIN_NOT_FOUND,
    /* неверный запрос*/
    BAD_REQUEST,
    /* неверный пароль */
    PASSWORD_INVALID
}
