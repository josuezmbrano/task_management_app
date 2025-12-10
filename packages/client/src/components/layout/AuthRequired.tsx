import { Outlet, Navigate, useLocation } from 'react-router';
import { createUserSlice } from '../../store/authSlice';

import type { JSX } from 'react';


export const AuthRequired = (): JSX.Element => {

    const isLoggedIn = createUserSlice((state) => state.isLoggedIn)

    const location = useLocation()

    if (!isLoggedIn) {
        return <Navigate to='/login' state={{ message: 'Must log in first', from: location }} replace />
    }

    return <Outlet />
}