 
import * as Yup from 'yup';

export const loginSchema = Yup.object({
    email:Yup.string().email("Please enter valid email").required("Please fill this field"),
    password: Yup.string().required("Please fill this field").min(6,"Please enter minimum 6 characters for password.")
})



export const registerSchema = Yup.object({
    email:Yup.string().email("Please enter valid email").required("Please fill this field"),
    password: Yup.string().required("Please fill this field").min(6,"Please enter minimum 6 characters for password."),
    cnfPassword: Yup.string().required("Please fill this field").oneOf([Yup.ref('password')],"Enter password not matched.")
});

