import { useForm } from 'react-hook-form';
import { GoogleSignIn, SignIn } from '@/services/firebase/config';
import toast from 'react-hot-toast';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import GoogleLogo from '@/assets/logo/google.svg'
import ErrorInput from '@/components/common/ErrorInput';

const SigninForm = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()
    const [Loading, setLoading] = useState(false)
    const [GoogleLoading, setGoogleLoading] = useState(false);

    const onSubmit = async (values) => {
        const { email, password } = values;

        try {
            setLoading(true);
            await SignIn(email, password);
            toast.success("Sign in successful.");
            console.log('Success');
        } catch (error) {
            setLoading(false);
            toast.error("Sign in failed.");
            console.log(error.code, error.message);
        } finally {
            setLoading(false);
        }
    }

    // create user for using google
    const handleGoogle = async () => {
        try {
            setGoogleLoading(true);
            await GoogleSignIn()

        } catch (error) {
            setGoogleLoading(false);
            toast.error("Sign in failed.");
            console.log(error.code, error.message);
        } finally {
            setGoogleLoading(false);
        }
    }

    return (
        <main className='flex justify-center items-center h-[100vh]'>
            <div className="p-6 w-full max-w-md">
                <div className='bg-container rounded-2xl border border-stroke  px-6 pt-7 pb-8 mb-4 text-center'>
                    <h1 className='texxt-title text-2xl'>Welcome Back</h1>
                    <h3 className='text-subtext'>{`Let's get started by signing in.`}</h3>
                    <hr className="hr" />
                    <form className="" onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-control">
                            <input {...register("email", { required: true })} type="email" className="input-form" id="username" placeholder="type your email" />
                            <ErrorInput error={errors.email} />
                        </div>
                        <div className="form-control">
                            <input size="large" {...register("password", { required: true, minLength: 1 })} className="mt-3 input-form !bg-container" id="password" type="password" placeholder="type your password" />
                            {errors.password && <span className='input-formtext-red-700 absolute -bottom-[1rem] left-0'>This field is required</span>}
                            <ErrorInput error={errors.password} />
                        </div>

                        <div className="grid gap-2">
                        <button className="btn bg-secondary !w-full mt-5" type="submit">
                            {Loading && <i className="bx bx-loader bx-spin"></i>}
                            {Loading ? "Signing  ..." : "Sign in"}
                        </button>
                        <button className="btn !bg-transparent !w-full !text-base border border-slate-500" onClick={handleGoogle}>
                            {GoogleLoading && <i className="bx bx-loader bx-spin"></i>}
                            {GoogleLoading ? "Signing  ..." : <div className='flex gap-3 items-center !text-text'><Image alt='google' className='size-4' src={GoogleLogo}></Image>Continue with Google</div>}
                        </button>
                        </div>
                        <p className='text-sm text-subtext my-4'>Dont Have Account yet? <Link href="/auth/signup"><b>Sign-up</b></Link></p>
                    </form>
                    <hr className="hr" />
                    <p className="text-center text-gray-500 text-xs">
                        &copy;2024 Dwi Wijaya. All rights reserved.
                    </p>
                </div>
            </div>
        </main>
    );
};

export default SigninForm
