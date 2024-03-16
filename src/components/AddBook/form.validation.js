import Joi from 'joi';

export const schema = Joi.object({
  title: Joi.string().required().messages({
    'string.empty': 'Title is required.',
    'any.required': 'Title is required.',
  }),
  author: Joi.string().required().messages({
    'string.empty': 'Author is required.',
    'any.required': 'Author is required.',
  }),
  category: Joi.string().required().messages({
    'string.empty': 'Category is required.',
    'any.required': 'Category is required.',
  }),
  coverImageType: Joi.string().valid('image/jpeg', 'image/png').required().messages({
    'string.empty': 'A cover image is required.',
    'any.required': 'A cover image is required.',
    'any.only': 'The cover image must be in JPEG or PNG format.',
  }),
  pdfFileType: Joi.string().valid('application/pdf').required().messages({
    'string.empty': 'A PDF file is required.',
    'any.required': 'A PDF file is required.',
    'any.only': 'The file must be a PDF.',
  }),
}).required();
