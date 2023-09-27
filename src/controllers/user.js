import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import User from '../models/user';
import { validateSignup, validateSignIn } from '../validations/validateUser';

export const signUp = async (req, res) => {
    try {
        const { error } = validateSignup.validate(req.body, { abortEarly: false });
        if (!error) {
            const { lastname, firstname, email, password } = req.body;

            const mail = await User.findOne({ email: email }).select('_id');

            if (mail) {
                return res.status(409).json({
                    status_code: 409,
                    message: 'Email đã tồn tại trong hệ thống.',
                });
            }

            const hash = bcrypt.hashSync(password, 10);
            const user = await User.create({ lastname, firstname, email, password: hash });
            res.send({
                status_code: 201,
                message: 'Đăng ký thành công.',
                data: user,
            });
        } else {
            const messages = error.details.map((item) => item.message);
            res.status(400).send({
                status_code: 400,
                message: messages,
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: 'Đã có lỗi xảy ra.',
        });
    }
    res.end();
};

export const signIn = async (req, res) => {
    try {
        const { error } = validateSignIn.validate(req.body, { abortEarly: false });

        if (error) {
            const message = error.details.map((item) => item.message);
            res.status(400).send({
                status_code: 400,
                message: message,
            });
            return;
        }

        const { email, password } = req.body;

        const user = await User.findOne({ email: email });

        if (!user) {
            res.status(401).send({
                status_code: 401,
                message: 'Tài khoản hoặc mật khẩu không chính xác.',
            });
            return;
        }
        const check = bcrypt.compareSync(password, user.password);
        if (!check) {
            res.status(401).send({
                status_code: 401,
                message: 'Tài khoản hoặc mật khẩu không hợp lệ.',
            });
            return;
        }
        const token = jwt.sign({ _id: user._id }, 'wd18101', { expiresIn: '1d' });
        res.send({
            message: 'Đăng nhập thành công.',
            accessToken: token,
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({
            status_code: 500,
            message: 'Đã Có lỗi xảy ra.',
        });
    }
};
