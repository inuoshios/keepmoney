import express, { Request, Response } from 'express';
import { createUser, loginUser } from '../services/user.services';
import { StatusCodes } from 'http-status-codes';
import { validate } from '../middleware/validateResource';
import {
    CreateLoginInput,
    createLoginSchema,
    CreateUserInput,
    createUserSchema
} from '../schema/user.schema';
import { generateToken } from '../utils/jwt';
import config from '../config';

const router = express.Router();

router.post('/signup', validate(createUserSchema),
    async (req: Request<{}, {}, CreateUserInput['body']>, res: Response) => {
        const data = await createUser(req.body);

        const accessToken = generateToken(
            { id: data._id, email: data.email },
            { expiresIn: config.accessTokenExpiry }
        );

        const refreshToken = generateToken(
            { id: data._id, email: data.email },
            { expiresIn: config.refreshTokenExpiry }
        );

        // store the accessToken in the cookie
        res.cookie('accessToken', accessToken, {
            maxAge: 900000, // time is in milliseconds
            httpOnly: true
        });

        // store the refreshToken in the cookie
        res.cookie('refreshToken', refreshToken, {
            maxAge: 3.154e+10, // time is in milliseconds 
            httpOnly: true
        });

        res.status(StatusCodes.CREATED).json(
            {
                msg: "user created successfully",
                data,
                accessToken,
                refreshToken
            }
        );
    }
);

router.post('/signin', validate(createLoginSchema),
    async (req: Request<{}, {}, CreateLoginInput['body']>, res: Response) => {
        const data = await loginUser(req.body);

        // store the accessToken in the cookie
        res.cookie('accessToken', data.accessToken, {
            maxAge: 900000, // time is in milliseconds
            httpOnly: true
        });

        // store the refreshToken in the cookie
        res.cookie('refreshToken', data.refreshToken, {
            maxAge: 3.154e+10, // time is in milliseconds 
            httpOnly: true
        });

        res.status(StatusCodes.OK).json({
            accessToken: data.accessToken,
            refreshToken: data.refreshToken
        });
    }
);

router.post('refresh-token', async (req: Request, res: Response) => {

});

router.delete('/logout', async (req: Request, res: Response) => {

});

export {
    router as userRouter
};