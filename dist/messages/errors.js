"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ERRORS = exports.GERMAN = void 0;
const ENGLISH = {
    valid_id: "Provide valid id",
    valid_first_name: "First name should at least 3 characters long",
    valid_last_name: "Last name should at least 3 characters long",
    valid_pwd: "Password should at least 8 characters long",
    valid_new_pwd: "New password should at least 8 characters long",
    please_verify_otp: "Please verify otp",
    password: "Provide password",
    email: "Provide email address",
    curr_pwd: "Provide current password",
    new_pwd: "Provide new password",
    valid_email: "Provide valid email address",
    pro_curr_pwd: "Provide current password",
    pro_at_least_one_field: "Provide at least one field for update",
    cannot_update: "Cannot update provided fields",
    already_exist: "Already Exist",
    otp: "Provide OTP",
    invalid_custom_id: "Invalid custom _id format",
    server_error: "Internal Server Error",
    unauthorized: "Unauthorized",
    provide_req_field: "Provide all required fields",
    email_exist: "Email already exist",
    email_not_exist: "Email does not exist",
    wrong_credentials: "Wrong email or password",
    invalid_otp: "Invalid OTP",
    invalid_curr_pwd: "Invalid current password",
    invalid_otp_type: "Invalid OTP type",
    agree: "Agree terms and condition",
    updateOnly: "You can only updates those fields first_name, last_name, avatar, notification, gender, weight, height and fat",
    not_found: "Not found",
    blocked: "You are blocked, please contact from admin",
    file_type: "Provide file type",
    key: "Provide key",
    pro_field: "Provide at least one field",
    response: "Provide response",
    image_params: "Provide image params",
    deck_params: "Provide deck id",
    card_params: "Provide card id",
};
exports.GERMAN = {
    valid_id: "Gültige ID erforderlich",
    valid_first_name: "Vorname muss mindestens 3 Zeichen lang sein",
    valid_last_name: "Nachname muss mindestens 3 Zeichen lang sein",
    valid_pwd: "Passwort muss mindestens 8 Zeichen lang sein",
    valid_new_pwd: "Neues Passwort muss mindestens 8 Zeichen lang sein",
    please_verify_otp: "Bitte OTP überprüfen",
    password: "Passwort angeben",
    email: "E-Mail-Adresse angeben",
    curr_pwd: "Aktuelles Passwort angeben",
    new_pwd: "Neues Passwort angeben",
    valid_email: "Gültige E-Mail-Adresse angeben",
    pro_curr_pwd: "Aktuelles Passwort angeben",
    pro_at_least_one_field: "Mindestens ein Feld für die Aktualisierung angeben",
    cannot_update: "Die bereitgestellten Felder können nicht aktualisiert werden",
    already_exist: "Bereits vorhanden",
    otp: "OTP angeben",
    invalid_custom_id: "Ungültiges benutzerdefiniertes _id-Format",
    server_error: "Interner Serverfehler",
    unauthorized: "Nicht autorisiert",
    provide_req_field: "Alle erforderlichen Felder angeben",
    email_exist: "E-Mail-Adresse bereits vorhanden",
    email_not_exist: "E-Mail-Adresse existiert nicht",
    wrong_credentials: "Falsche E-Mail oder falsches Passwort",
    invalid_otp: "Ungültiges OTP",
    invalid_curr_pwd: "Ungültiges aktuelles Passwort",
    invalid_otp_type: "Ungültiger OTP-Typ",
    agree: "Den Nutzungsbedingungen zustimmen",
    updateOnly: "Sie können nur die Felder Vorname, Nachname, Avatar, Benachrichtigung, Geschlecht, Gewicht, Größe und Fett aktualisieren",
    not_found: "Nicht gefunden",
    blocked: "Sie sind gesperrt. Bitte kontaktieren Sie den Administrator",
    file_type: "Dateityp angeben",
    key: "Schlüssel angeben",
    pro_field: "Mindestens ein Feld angeben",
    response: "Antwort angeben",
    image_params: "Bildparameter angeben",
    deck_params: "Deck-ID angeben",
    card_params: "Karten-ID angeben",
};
const LANGUAGE = "german";
exports.ERRORS = LANGUAGE === "german" ? ENGLISH : exports.GERMAN;
//# sourceMappingURL=errors.js.map