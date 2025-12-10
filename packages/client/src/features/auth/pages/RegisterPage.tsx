import { RegisterComponent } from '../components/RegisterComponent'

import type { JSX } from 'react'


export const RegisterPage = (): JSX.Element => {
    return (
        <section className='register-section'>
            <div className='register-welcome'>
                <h1>Create an account</h1>
                <h5>
                    Create your account. It takes less than a minute. Enter your email &
                    password
                </h5>
            </div>

            <RegisterComponent />

            <div className='register-terms-message'>
                <p>
                    By continuing, you agree to Synergy's{' '}
                    <span className='terms-attenuance'>privacy policy</span> and{' '}
                    <span className='terms-attenuance'> term of service</span>
                </p>
            </div>
        </section>
    )
}