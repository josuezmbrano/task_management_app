import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

import { signupSchema } from '@task-app/common/src/zod-schemas/auth/signup.schema';
import { useSignup } from '../../../api/auth.api';
import { useErrorHandler } from '../../../utils/useErrorHandler';

import type { JSX } from 'react';
import type { SignupForm } from '../../../types/schema.types';
import type { SubmitHandler } from 'react-hook-form';
import type { NavigateFunction } from 'react-router';



export const RegisterComponent = (): JSX.Element => {
    
    const { register, handleSubmit, setError, formState: { errors } } = useForm<SignupForm>({
        resolver: zodResolver(signupSchema)
    })

    const { mutate: signup } = useSignup()
    const { handleAxiosError } = useErrorHandler(setError)
    const navigate: NavigateFunction = useNavigate()

    const onSubmit: SubmitHandler<SignupForm> = (credentials: SignupForm) => {
        signup(credentials, {
            onSuccess: (response) => {
                alert(response.message)
                navigate('/session', { replace: true })
            },
            onError: handleAxiosError
        })
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='register-form-div'>
            <div className='inputfield-container'>
                <input className='register-field' {...register('username')} type='text' placeholder='Username' />
            </div>
            {errors.username && <span className='register-error'>{errors.username.message}</span>}

            <div className='inputfield-container'>
                <input className='register-field' {...register('email')} type='email' placeholder='Email' />
            </div>
            {errors.email && <span className='register-error'>{errors.email.message}</span>}

            <div className='inputfield-container'>
                <input className='register-field' {...register('password')} type='password' placeholder='Password' />
            </div>
            {errors.password && <span className='register-error'>{errors.password.message}</span>}

            <div className='inputfield-container'>
                <input className='register-field' {...register('firstname')} type='text' placeholder='Firstname' />
            </div>
            {errors.firstname && <span className='register-error'>{errors.firstname.message}</span>}

            <div className='inputfield-container'>
                <input className='register-field' {...register('lastname')} type='text' placeholder='Lastname' />
            </div>
            {errors.lastname && <span className='register-error'>{errors.lastname.message}</span>}

            <button className='register-form-submit' type='submit'>Register</button>
            {errors.root?.serverError && <span>{errors.root.serverError.type}: {errors.root.serverError.message}</span>}
        </form>
    )
}