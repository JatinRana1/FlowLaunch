import * as Yup from "yup";

export const todoSchema = Yup.object().shape({
    title: Yup.string()
        .required("Title is required")
        .min(3, "Title must be at least 3 characters")
        .max(25, "Title must be less than 25 characters"),
    description: Yup.string()
        .required("Description is required")
        .min(4, "Description must be at least 4 characters")
        .max(50, "Description must be less than 50 characters"),
    status: Yup.string().required("Status is required"),
});
