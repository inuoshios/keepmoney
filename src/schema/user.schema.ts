import { z } from 'zod';

/**
 * createUserSchema helps validate the data the user is going to input in the req.body
 * {
 *      "firstName": "firstName",
 *      "lastName": "lastName",
 *      "email": "email@email.com",
 *      "password": "1234456",
 *      "phoneNumber": "+234-----",
 *      "socialLinks": ["twitter.com", "instagram.com"]
 * }
 */
export const createUserSchema = z.object({
    body: z.object({
        firstName: z.string({
            required_error: "first name is required"
        })
            .min(2, "first name must be greater than 2 characters")
            .max(100, "first name is cannot exceed 100 characters"),

        lastName: z.string({
            required_error: "last name is required"
        })
            .min(2, "last name must be greater than 2 characters")
            .max(100, "last name is cannot exceed 100 characters"),

        email: z.string({
            required_error: "email is required"
        })
            .email("not a valid email address"),

        password: z.string({
            required_error: "please enter a password"
        })
            .min(6, "password is too short; password must be 6 characters or more"),
    })
});

/**
 * createLoginSchema
 * {
 *      "email": "email@email.com",
 *      "password": "password"
 * }
 */
export const createLoginSchema = z.object({
    body: z.object({
        email: z.string({
            required_error: "email cannot be empty"
        }),

        password: z.string({
            required_error: "password cannot be empty"
        })
    }),
});

export type CreateLoginInput = z.TypeOf<typeof createLoginSchema>;

export type CreateUserInput = z.TypeOf<typeof createUserSchema>;