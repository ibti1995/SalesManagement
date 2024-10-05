/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { HOME_ROUTE, REGISTER_ROUTE } from 'src/constants/routes';
import Link from 'next/link';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import InputField from 'src/components/inputField';
import { loginSchema } from 'src/validationSchema/auth';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { app } from 'src/services/firebase';
import SubmitButton from 'src/components/button';
const Login = () => {
  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });
  const submitForm = async (values: any) => {
    try {
      const credential =await signInWithEmailAndPassword(
        getAuth(app),
        values.email,
        values.password
      );
      const idToken = await credential.user.getIdToken();
       await fetch('/api/login', {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      });
      router.push(HOME_ROUTE);
    } catch (e) {
      console.log((e as Error).message);
    }
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="w-1/2 rounded-md shadow-lg flex justify-between flex-col">
        <div className="h-28 w-full justify-center flex items-center">
          <span className="text-3xl text-black font-mono font-semibold p-3 rounded-lg">
            SignIn
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
          <SubmitButton
            classname="bg-blue-500 rounded-md py-2 px-3"
            label="Submit"
          />
        </form>
        <div className="h-20 mx-auto">
          <span className="text-sm text-gray-600">
            Dont have an account?
            <Link href={REGISTER_ROUTE}>
              <span className="text-blue-500 font-semibold text-md">
                {' '}
                Register Here
              </span>
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
