import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, useLocation } from 'react-router';

import { loginSchema } from '@task-app/common/src/zod-schemas/auth/login.schema';
import { useLogin } from '../../../api/auth.api';
import { useErrorHandler } from '../../../utils/useErrorHandler';

import type { LoginForm } from '../../../types/schema.types';
import type { SubmitHandler } from 'react-hook-form';
import type { NavigateFunction } from 'react-router';
import type { JSX } from 'react';



export const LoginComponent = (): JSX.Element => {

    const { register, handleSubmit, setError, formState: { errors } } = useForm<LoginForm>({
        resolver: zodResolver(loginSchema)
    })

    const { mutate: login } = useLogin()
    const { handleAxiosError } = useErrorHandler(setError)

    const location = useLocation()
    const redirect = location.state?.from || '/session'
    const navigate: NavigateFunction = useNavigate()

    const onSubmit: SubmitHandler<LoginForm> = (credentials: LoginForm) => {
        login(credentials, {
            onSuccess: (response) => {
                alert(response.message)
                navigate(redirect, { replace: true })
            },
            onError: handleAxiosError
        })
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='login-form-div'>

            <div className='inputfield-container'>
                <input className='login-field' {...register('username')} type='text' placeholder='Username' />
            </div>
            {errors.username && <span className='login-errors'>{errors.username.message}</span>}

            <div className='inputfield-container'>
                <input className='login-field' {...register('email')} type='email' placeholder='Email' />
            </div>
            {errors.email && <span className='login-errors'>{errors.email.message}</span>}

            <div className='inputfield-container'>
                <input className='login-field' {...register('password')} type='password' placeholder='Password' />
            </div>
            {errors.password && <span className='login-errors'>{errors.password.message}</span>}

            <div className='forgot-password-div'>
                <span>Forgot password? (soon)</span>
            </div>

            <button className='login-form-submit' type='submit'>Login</button>
            {errors.root?.serverError && <span className='login-errors'>{errors.root.serverError.type}: {errors.root.serverError.message}</span>}
        </form>
    )
}