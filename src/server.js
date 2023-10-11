import createError from 'http-errors';
import mongoose from 'mongoose';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import movieRouter from './routes/movie';
import categoryRouter from './routes/category';
import userRouter from './routes/user';
import uploadRouter from './routes/upload';

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Static
app.use(express.static('src/public'));

// Router
app.use('/movie', movieRouter);
app.use('/category', categoryRouter);
app.use('/auth', userRouter);
app.use('/upload', uploadRouter);

app.use((req, res, next) => {
    next(createError.NotFound('This route does not exist.'));
});

app.use((err, req, res, next) => {
    res.json({
        status: err.status || 500,
        message: err.message,
    });
});

const connection = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/web18103');
        console.log('Connection Database successfully.');
    } catch (error) {
        console.error('Kết nối tới database thất bại: ', error);
    }
};
connection();

app.listen(port, function () {
    console.log(`Server is running on ${port}`);
});
