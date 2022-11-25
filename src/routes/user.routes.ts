import express, { Request, Response } from 'express';
import { createUser, loginUser } from '../services/user.services';
import { StatusCodes } from 'http-status-codes';
import { validate } from '../middleware/validateResource';
import { CreateLoginInput, createLoginSchema, CreateUserInput, createUserSchema } from '../schema/user.schema';

const router = express.Router();

router.post('/signup', validate(createUserSchema),
    async (req: Request<{}, {}, CreateUserInput['body']>, res: Response) => {
        const data = await createUser(req.body);
        res.status(StatusCodes.CREATED).json({ msg: "user created successfully", data });
    }
);

router.post('/signin', validate(createLoginSchema),
    async (req: Request<{}, {}, CreateLoginInput['body']>, res: Response) => {
        const data = await loginUser(req.body);
        res.status(StatusCodes.OK).json({
            accessToken: data.accessToken,
            refreshToken: data.refreshToken
        });
    }
);

export {
    router as userRouter
};