export const enum StatusResponseAuth {
    /* аутентификация успешна */
    OK = 'OK',
    /* незарегистрированный логин */
    LOGIN_NOT_FOUND = 'LOGIN_NOT_FOUND',
    /* срок действия логина истек*/
    LOGIN_EXPIRED = 'LOGIN_EXPIRED',
    /* неверный домен */
    DOMEN_INVALID = 'DOMEN_INVALID',
    /* неверный пароль */
    PASSWORD_INVALID = 'PASSWORD_INVALID',
    /* срок действия пароля истек*/
    PASSWORD_EXPIRED = 'PASSWORD_EXPIRED',
    /*Пользователь заблокирован*/
    USER_BLOCKED = 'BLOCK'
}
