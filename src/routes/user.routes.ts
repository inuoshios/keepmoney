import express, { Request, Response } from 'express';
import { createUser, loginUser } from '../services/user.service';
import { StatusCodes } from 'http-status-codes';

const router = express.Router();

router.post('/signup', async (req: Request, res: Response) => {
    const data = await createUser(req.body);
    res.status(StatusCodes.CREATED).json({ msg: "user created successfully", data });
});

router.post('/signin', async (req: Request, res: Response) => {
    const data = await loginUser(req.body);
    res.status(StatusCodes.OK).json({
        user: data.user,
        accessToken: data.accessToken,
        refreshToken: data.refreshToken
    });
});

export {
    router as userRouter
};