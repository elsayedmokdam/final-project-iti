import * as zod from "zod"

export const updateUserDataValidationSchema = zod.object({
    name: zod
        .string()
        .nonempty("Name is required")
        .min(3, "Name must be at least 3 characters")
        .max(20, "Name must be less than 20 characters")
        .regex(/^[a-zA-Z][a-zA-Z ]{2,20}$/, "Please enter a valid username"),
    email: zod
        .string("Email is required")
        .nonempty("Email is required")
        .regex(
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            "Please enter a valid email",
        ),
})