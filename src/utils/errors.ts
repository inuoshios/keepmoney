import { StatusCodes } from "http-status-codes";

export abstract class CustomError extends Error {
    constructor(public code: number, message: string) {
        super(message);
        this.code = code;
        this.message = message;
    }
}

export class NotFoundError extends CustomError {
    constructor(message: string) {
        super(StatusCodes.NOT_FOUND, message);
    }
}

export class BadRequestError extends CustomError {
    constructor(message: string) {
        super(StatusCodes.BAD_REQUEST, message);
    }
}

export class UnauthorizedError extends CustomError {
    constructor(message: string) {
        super(StatusCodes.UNAUTHORIZED, message);
    }
}

export class InternalServerError extends CustomError {
    constructor(message: string) {
        super(StatusCodes.INTERNAL_SERVER_ERROR, message);
    }
}

