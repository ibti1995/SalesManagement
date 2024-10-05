/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import {LOGIN_ROUTE } from 'src/constants/routes';
 import Link from 'next/link';
import { useRouter } from 'next/navigation';
import InputField from 'src/components/inputField';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { registerSchema } from 'src/validationSchema/auth';
 import CustomButton from 'src/components/button';
import { registerUser } from 'src/services/apiCall';
 
const Register = () => {
  const router = useRouter();
 
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
  });
  const submitForm = async (values: any) => {
    try {
      await registerUser(values.email, values.password);
      router.push(LOGIN_ROUTE);
    } catch (e:any) {
      console.log('Login Error:', e.message);
      alert('Please try Again');
    }
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="w-1/2 rounded-md bg-white/30 shadow-lg flex justify-between flex-col">
        <div className="h-28 w-full justify-center flex items-center">
          <span className="text-3xl text-black font-mono font-semibold p-3 rounded-lg">
            Register
          </span>
        </div>
        <form
          onSubmit={handleSubmit(submitForm)}
          className="h-full w-1/2 mx-auto "
        >
          <InputField
            register={register}
            error={errors.email}
            type="text"
            placeholder="Enter Your Email Here..."
            name="email"
            label="Email"
          />
          <InputField
            register={register}
            error={errors.password}
            type="password"
            placeholder="Enter Your Password Here..."
            name="password"
            label="Password"
          />
          <InputField
            register={register}
            error={errors.cnfPassword}
            type="password"
            placeholder="Enter Your Confirm Password Here..."
            name="cnfPassword"
            label="Confirm Password"
          />
          <CustomButton
            classname="bg-blue-500 rounded-md py-2 px-3"
            label="Submit"
          />
        </form>
        <div className="h-20 mx-auto">
          <span className="text-sm text-gray-600">
            Already have account?
            <Link href={LOGIN_ROUTE}>
              <span className="text-blue-500 font-semibold text-md">
                {' '}
                Login Here
              </span>
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Register;
