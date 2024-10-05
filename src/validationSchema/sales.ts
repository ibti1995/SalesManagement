 
import * as Yup from 'yup';

export const salesSchema = Yup.object({
    customer:Yup.string().required("Please fill this field"),
    product: Yup.string().required("Please fill this field"),
    quantity: Yup.number().required("Please fill this field"),
    totalAmount: Yup.number().required("Please fill this field"),

})

