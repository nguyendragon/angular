import Joi from 'joi';

export const validateCategory = (data) => {
    const schema = Joi.object({
        name: Joi.string().required().messages({
            'string.empty': 'Vui lòng nhập thể loại',
            'any.required': 'Tên thể loại là trường bắt buộc',
        }),
    });

    const { error } = schema.validate(data);
    if (error) return { message: error.message };
};

export const validateCategoryUpdate = (data) => {
    const schema = Joi.object({
        id: Joi.string().trim().optional().empty('').messages({
            'string.empty': 'Vui lòng nhập ID Phim',
        }),
        name: Joi.string().trim().optional().empty('').messages({
            'string.empty': 'Vui lòng nhập thể loại',
        }),
    });

    const { error } = schema.validate(data);
    if (error) return { message: error.message };
};
