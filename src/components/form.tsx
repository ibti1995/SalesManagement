/* eslint-disable @typescript-eslint/no-explicit-any */
import { yupResolver } from '@hookform/resolvers/yup';
 import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { HOME_ROUTE } from 'src/constants/routes';
 import { salesSchema } from 'src/validationSchema/sales';
import InputField from './inputField';
import { Sales, SalesFormValues } from 'src/types/formTypes';
import SubmitButton from './button';
import { addSalesDocument, updateSalesDocument } from 'src/services/apiCall';
export default function FormComponent({ data }: { data?: Sales }) {
  const router = useRouter();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(salesSchema),
  });

  useEffect(() => {
    if (data) {
      const { id, ...formInitialValues } = data;
      reset(formInitialValues);
    }
  }, [data, reset]);

  const submitForm = async (values: SalesFormValues) => {
    try {
      if (!data) {
        addSalesDocument(values).then((res) => router.push(HOME_ROUTE));
      } else {
        const updatedValues: any = {};
        for (const key in values) {
          if (
            values[key as keyof SalesFormValues] !== data[key as keyof Sales]
          ) {
            updatedValues[key as keyof SalesFormValues] =
              values[key as keyof SalesFormValues];
          }
        }
        updateSalesDocument(data.id, updatedValues).then((res) =>
          router.push(HOME_ROUTE)
        );
      }
    } catch (e) {
      console.error('Error:', e);
      alert('Please try again');
    }
  };

  return (
    <div className="mt-10 flex justify-center items-center">
      <div className="w-1/2 rounded-md bg-white/30 shadow-lg flex justify-between flex-col">
        <div className="h-28 w-full justify-center flex items-center">
          <span className="text-3xl text-black font-mono font-semibold p-3 rounded-lg">
            {data ? 'Update sales' : 'Add sales'}
          </span>
        </div>
        <form
          onSubmit={handleSubmit(submitForm)}
          className="h-full w-1/2 mx-auto"
        >
          <InputField
            register={register}
            error={errors.customer}
            type="text"
            placeholder="Enter Customer name..."
            name="customer"
            label="Customer"
          />
          <InputField
            register={register}
            error={errors.product}
            type="text"
            placeholder="Enter Your product Here..."
            name="product"
            label="Product"
          />
          <InputField
            register={register}
            error={errors.quantity}
            type="text"
            placeholder="Enter The Quantity Here..."
            name="quantity"
            label="Quantity"
          />
          <InputField
            register={register}
            error={errors.totalAmount}
            type="text"
            placeholder="Enter The Total Amount Here..."
            name="totalAmount"
            label="Total Amount"
          />
          <SubmitButton
            classname="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            label={data ? 'Update' : 'Add'}
          />
        </form>
      </div>
    </div>
  );
}
