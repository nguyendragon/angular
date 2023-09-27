import Joi from 'joi';

export const validateSignup = Joi.object({
    lastname: Joi.string().trim().required().messages({
        'string.empty': 'Vui lòng nhập họ',
        'any.required': 'Họ là trường bắt buộc',
    }),
    firstname: Joi.string().trim().required().messages({
        'string.empty': 'Vui lòng nhập tên',
        'any.required': 'Tên là trường bắt buộc',
    }),
    email: Joi.string().trim().email().required().messages({
        'string.empty': 'Vui lòng nhập email',
        'string.email': 'Email không hợp lệ',
        'any.required': 'Email là trường bắt buộc',
    }),
    password: Joi.string().required().messages({
        'string.empty': 'Vui lòng nhập mật khẩu',
        'any.required': 'Mật khẩu là trường bắt buộc',
    }),
});

export const validateSignIn = Joi.object({
    email: Joi.string().trim().email().required().messages({
        'string.empty': 'Vui lòng nhập email',
        'string.email': 'Email không hợp lệ',
        'any.required': 'Email là trường bắt buộc',
    }),
    password: Joi.string().required().messages({
        'string.empty': 'Vui lòng nhập mật khẩu',
        'any.required': 'Mật khẩu là trường bắt buộc',
    }),
});
