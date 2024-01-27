const ENGLISH = {
    created: 'Successfully created',
    fetched: 'Successfully fetched',
    updated: 'Successfully updated',
    deleted: 'Successfully deleted',
    blocked: 'Successfully blocked',
    login: 'Successfully login',
    chg_pwd: 'Successfully changed password',
    chg_your_pwd: 'Change your password',
    reset_pwd: 'Successfully reset password',
    verified: 'Successfully verified',
    chg_email: 'Successfully changed email',
    otp_send: 'OTP has been sent',
    logout: 'Successfully logout',
    reset_password_link_sent: 'Link send',
};

const GERMAN = {
    created: 'Erfolgreich erstellt',
    fetched: 'Erfolgreich abgerufen',
    updated: 'Erfolgreich aktualisiert',
    deleted: 'Erfolgreich gelöscht',
    blocked: 'Erfolgreich gesperrt',
    login: 'Erfolgreich angemeldet',
    chg_pwd: 'Passwort erfolgreich geändert',
    chg_your_pwd: 'Ändern Sie Ihr Passwort',
    reset_pwd: 'Passwort erfolgreich zurückgesetzt',
    verified: 'Erfolgreich verifiziert',
    chg_email: 'E-Mail erfolgreich geändert',
    otp_send: 'OTP wurde gesendet',
    logout: 'Erfolgreich abgemeldet',
    reset_password_link_sent: 'Link gesendet',
};

const LANGUAGE = 'german';

export const SUCCESS = LANGUAGE === 'german' ? ENGLISH : GERMAN;
