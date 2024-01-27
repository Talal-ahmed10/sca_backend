"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCreateAdmin = void 0;
const errors_1 = require("../messages/errors");
const statusCodes_1 = require("../messages/statusCodes");
const regex_1 = require("../app_constants/regex");
const validateCreateAdmin = (req, res, next) => {
    try {
        const { first_name = "", last_name = "", email = "", password = "", } = req.body;
        if (regex_1.NAME_REGEX.test(first_name.trim()) === false)
            throw new Error(errors_1.ERRORS.valid_first_name);
        if (regex_1.NAME_REGEX.test(last_name.trim()) === false)
            throw new Error(errors_1.ERRORS.valid_last_name);
        if (regex_1.EMAIL_REGEX.test(email.trim()) === false)
            throw new Error(errors_1.ERRORS.email);
        if (regex_1.PWD_REGEX.test(password.trim()) === false)
            throw new Error(errors_1.ERRORS.password);
        next();
    }
    catch (error) {
        res.status(statusCodes_1.STATUS.badRequest).send({ message: error.message });
    }
};
exports.validateCreateAdmin = validateCreateAdmin;
//# sourceMappingURL=admin.validation.js.map