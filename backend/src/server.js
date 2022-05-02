import './db.js';
import './models/Posting.js';
import './models/User.js';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import rootRouter from './routers/rootRouter.js';
import userRouter from './routers/userRouter.js';
import postingRouter from './routers/postingRouter.js';
import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });

const app = express();
const logger = morgan('dev');
const PORT = 4000;
const corsOptions = { origin: 'localhost:3000' };
app.use(cors(corsOptions));

const handleListening = () => {
    console.log(`✅ Server listening on port http://localhost:${PORT}`);
};

//브라우저에게 session ID(cookie 안에 있는)를 전달합니다.
app.use(
    session({
        secret: process.env.COOKIE_SECRET,
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({
            mongoUrl: process.env.DB_URL,
        }),
        cookie: {
            domain: 'localhost',
            path: '/',
            maxAge: 24 * 6 * 60 * 1000,
            sameSite: 'none',
            httpOnly: true,
            secure: true,
        },
    })
);

app.use((req, res, next) => {
    if (req.session.loggedIn) {
        res.locals.loggedIn = Boolean(req.session.loggedIn);
        res.locals.loggedInUser = req.session.user;
    }

    console.log(res.locals);

    next();
});

app.use(logger);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', rootRouter);
app.use('/users', userRouter);
app.use('/posts', postingRouter);

app.listen(PORT, handleListening);

export default app;
