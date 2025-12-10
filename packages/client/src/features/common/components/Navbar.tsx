import { NavLink, useNavigate } from 'react-router'
import { useLogout } from '../../../api/auth.api'
import { createUserSlice } from '../../../store/authSlice'
import { parseLocalStateError } from '../../../utils/parseLocalStateError'

import type { JSX } from 'react'
import type { AxiosError } from 'axios'
import type { NavigateFunction } from 'react-router'



export const Navbar = (): JSX.Element => {

    const isLoggedIn: boolean = createUserSlice((state) => state.isLoggedIn)

    const { mutate: logout } = useLogout()

    const navigate: NavigateFunction = useNavigate()

    const logoutHandler = async (): Promise<void> => {
        logout(undefined, {
            onSuccess: (response) => {
                alert(response.message)
                navigate('/login', {replace: true})
            },
            onError: async (error: AxiosError) => {
                const errorState = parseLocalStateError(error)
                console.log(`Error during logout: [${errorState.type}] ${errorState.message}`)
            }
        })
    }


    return (
        <header className='header-nav'>
            <NavLink to='/' end>Synergy</NavLink>
            {isLoggedIn ?
                (
                    <nav className='nav-bar'>
                        <NavLink to='/session'>dashboard</NavLink>
                        <button onClick={logoutHandler}>Logout</button>
                    </nav>
                )
                :
                (
                    <nav className='nav-bar'>
                        <NavLink to='/login' end>Login</NavLink>
                        <NavLink to='/register'>Register</NavLink>
                    </nav>
                )
            }
        </header>
    )
}