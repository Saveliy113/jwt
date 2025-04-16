import { z } from "zod"

const SignUpSchema = z.object({
    username: z.string().min(3, {
      message: "Username must be at least 2 characters",
    }),
    email: z
        .string()
        .min(1, {
            message: "Email is required.",
        })
        .email({ message: 'Entera valid email address'}),
    password: z
        .string()
        .min(6, {
            message: "Password must be at least 6 characters long.",
        })
        .regex(/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()[\]{};:'",.<>/?\\|`~\-_=+]).{6,}$/, {
            message: 'Password must include at least one uppercase letter, one number, and one special character'
        }),
})

const SignInSchema = z.object({
    username: z.string().min(3, {
      message: "Username must be at least 2 characters",
    }),
    email: z
        .string()
        .min(1, {
            message: "Email is required.",
        })
        .email({ message: 'Entera valid email address'}),
    password: z
        .string()
        .min(6, {
            message: "Password must be at least 6 characters long.",
        })
        .regex(/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()[\]{};:'",.<>/?\\|`~\-_=+]).{6,}$/, {
            message: 'Password must include at least one uppercase letter, one number, and one special character'
        }),
})

export {
    SignInSchema,
    SignUpSchema,
};