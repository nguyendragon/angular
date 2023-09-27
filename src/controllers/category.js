import mongoose from 'mongoose';

import * as validates from '../validations/validateCategory';
import Category from '../models/category';

export const getAllCategory = async function (req, res) {
    try {
        const category = await Category.find({});

        if (category) {
            res.status(200).json(category);
        } else {
            res.status(500).json({ error: 'Internal server error' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const getCategoryById = async function (req, res) {
    try {
        const { categoryId } = req.params;

        if (!mongoose.isValidObjectId(String(categoryId))) {
            return res.status(400).json({ message: 'Invalid movieId' });
        }

        const category = await Category.findOne({ _id: categoryId });

        if (!category) {
            res.status(404).json({ error: 'Category not found' });
        } else {
            res.status(200).json(category);
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const createCategory = async function (req, res) {
    try {
        const { name } = req.body;

        const categoryExist = await Category.findOne({ name: name });

        if (categoryExist) {
            res.status(409).json({ error: 'Category already exists' });
            return;
        }

        const error = validates.validateCategory({ name });

        if (error) {
            res.status(400).json({ error: error.message });
            return;
        }

        const category = await Category.create({ name });

        if (!category) {
            res.status(400).json({
                message: 'Thêm danh mục thất bại',
                status_code: 400,
            });
        }

        res.status(201).json({
            message: 'Category created successfully',
            category: category || {},
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const updateCategory = async function (req, res) {
    try {
        const { id, name } = req.body;

        if (!mongoose.isValidObjectId(String(id))) {
            return res.status(400).json({ message: 'Invalid movieId' });
        }

        const error = validates.validateCategoryUpdate({ id, name });

        if (error) {
            res.status(400).json({ error: error.message });
            return;
        }

        const category = await Category.findOneAndUpdate({ _id: id }, { name: name }, { new: true });

        if (!category) {
            res.status(404).json({ error: 'Category not found' });
        } else {
            res.status(200).json({
                message: 'Genre updated successfully',
                category: category,
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const deleteCategory = async function (req, res) {
    try {
        const { id } = req.body;

        if (!mongoose.isValidObjectId(String(id))) {
            return res.status(400).json({ message: 'Invalid movieId' });
        }

        const category = await Category.findByIdAndDelete({ _id: id });

        if (!category) {
            res.status(404).json({ error: 'Category not found' });
            return;
        }

        res.status(200).json({ message: 'Category deleted successfully', category: category });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
