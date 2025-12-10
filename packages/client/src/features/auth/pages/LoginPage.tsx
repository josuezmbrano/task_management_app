import { LoginComponent } from '../components/LoginComponent'
import { Link, useLocation } from 'react-router'

import GoogleIcon from '../../../assets/public/google-icon.png'

import type { JSX } from 'react'



export const LoginPage = (): JSX.Element => {
    const location = useLocation()
    const message = location.state?.message

    return (
        <section className='login-container'>
            <div className='login-welcome'>
                <h1>Welcome back,</h1>
                <h5>
                    We have to see you here again. Enter your email address and password
                </h5>
            </div>

            {message && <p className='attempt-warning'>{message}</p>}
            <LoginComponent />

            <div className='vertical-login-line'>
                <hr className='line' />
                <span>or</span>
                <hr className='line' />
            </div>

            <div className='login-methods'>
                <button disabled className='login-method-button'>
                    <img className='login-methods-icon' src={GoogleIcon} />
                    Google
                    <p>(Soon..)</p>
                </button>
            </div>

            <div className='login-register-link'>
                <p>
                    New user?{' '}
                    <Link to='/register'>
                        Create an Account
                    </Link>
                </p>
            </div>
        </section>
    )
}