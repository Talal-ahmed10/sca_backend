"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NO_REPLY_EMAIL = exports.PASS_DIGITS = exports.OTP_DIGITS = exports.OTP_EXPIRY = exports.OTP_TYPES = exports.WEB_BASE_URL = exports.LOGO_URI = exports.ADMIN_DIR = exports.APP_NAME = exports.CARD_DIR = exports.USER_DIR = exports.BUCKET = void 0;
exports.BUCKET = process.env.S3_BUCKET + '';
exports.USER_DIR = 'users-avatar';
exports.CARD_DIR = 'card-images';
exports.APP_NAME = 'Anki App';
exports.ADMIN_DIR = 'admins-avatar';
exports.LOGO_URI = 'https://res.cloudinary.com/dfkyd5npi/image/upload/v1695896105/samples/fitness-app/Group_56448_ulcioy.png';
exports.WEB_BASE_URL = 'https://localhost:3000';
exports.OTP_TYPES = ['none', 'authentication', 'reset_password', 'changed_email'];
exports.OTP_EXPIRY = 300000;
exports.OTP_DIGITS = 6;
exports.PASS_DIGITS = 8;
exports.NO_REPLY_EMAIL = 'no-reply@ankiapp.io';
//# sourceMappingURL=index.js.map