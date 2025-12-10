import {Outlet, Link} from 'react-router'
import { createUserSlice } from '../../store/authSlice'

import { CalendarDays } from 'lucide-react'

import type { JSX } from 'react'



export const DashboardLayout = (): JSX.Element => {
    
    const user = createUserSlice((state) => state.user)

    return (
        <>
            <section className='dashboard-greeting-section'>
                <div className='dashboard-greeting'>
                    <h2>
                        ¡Welcome, <br /> {user?.firstname} {user?.lastname}!
                    </h2>
                </div>
                <nav className='dashboard-nav-container'>
                    <div className='dashboard-links'>
                        <Link className='dashboard-link-pages' to='projects'>
                            Projects
                        </Link>
                        <Link className='dashboard-link-pages' to='productivity'>
                            Productivity
                        </Link>
                    </div>
                    <Link to='calendar'>
                        <CalendarDays size={30} color='#181a2a' />
                    </Link>
                </nav>
            </section>
            <Outlet />
        </>
    )
}