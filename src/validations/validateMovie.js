import Joi from 'joi';

export const validateMovie = (data) => {
    const schema = Joi.object({
        title: Joi.string().trim().required().messages({
            'string.empty': 'Vui lòng nhập tiêu đề',
            'any.required': 'Tiêu đề là trường bắt buộc',
        }),
        year: Joi.number().integer().required().messages({
            'number.base': 'Năm phải là một số',
            'number.integer': 'Năm phải là một số nguyên',
            'any.required': 'Năm là trường bắt buộc',
        }),
        categories: Joi.array().items(Joi.string()).required().messages({
            'array.base': 'Danh sách thể loại phải là một mảng',
            'any.required': 'Danh sách thể loại là trường bắt buộc',
        }),
        extract: Joi.string().required().messages({
            'string.empty': 'Vui lòng nhập mô tả',
            'any.required': 'Mô tả là trường bắt buộc',
        }),
    });

    const { error } = schema.validate(data);
    if (error) return { message: error.message };
};

export const validateMovieUpdate = (data) => {
    const schema = Joi.object({
        id: Joi.string().trim().optional().empty('').messages({
            'string.empty': 'Vui lòng nhập ID Phim',
        }),
        title: Joi.string().trim().optional().empty('').messages({
            'string.empty': 'Vui lòng nhập tiêu đề',
        }),
        year: Joi.number().integer().optional().messages({
            'number.base': 'Năm phải là một số',
            'number.integer': 'Năm phải là một số nguyên',
        }),
        categories: Joi.array().items(Joi.string()).optional().messages({
            'array.base': 'Danh sách thể loại phải là một mảng',
        }),
        extract: Joi.string().optional().empty('').messages({
            'string.empty': 'Vui lòng nhập mô tả',
        }),
    });

    const { error } = schema.validate(data);
    if (error) return { message: error.message };
};
