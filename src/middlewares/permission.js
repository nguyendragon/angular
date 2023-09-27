import jwt from 'jsonwebtoken';
import User from '../models/user';

export const checkPermission = async (req, res, next) => {
    try {
        // 1. Kiểm tra có token không?
        // 2. Token có hợp lệ ?
        // 3. Kiếm tra có quyền truy cập ?
        // 4. Cho phép qua hay không qua
        const authorization = req.headers.authorization;
        if (!authorization || !authorization.split(' ')[1]) {
            res.status(401).send({
                message: 'Invalid token',
            });
            return;
        }

        const token = authorization.split(' ')[1];

        const decoded = jwt.verify(token, 'wd18101');
        if (!decoded) {
            res.status(401).send({
                message: 'Invalid signature',
            });
            return;
        }
        const _id = decoded._id;
        const user = await User.findById(_id);

        if (!user.isAdmin) {
            res.status(401).send({
                message: 'Không có quyền truy cập tài nguyên',
            });
            return;
        }
        next();
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: 'Đã có lỗi xảy ra.',
        });
    }
};
