"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PWD_REGEX = exports.EMAIL_REGEX = exports.NAME_REGEX = void 0;
exports.NAME_REGEX = /^([a-zA-Z ]){3,}/;
exports.EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
exports.PWD_REGEX = /^(?=.*\d).{8,}$/;
//# sourceMappingURL=regex.js.map