import { NavLink, Outlet } from 'react-router'
import { PanelLeftOpen, BellRing, UserIcon } from 'lucide-react'
import { useSessionCounter } from '../../hooks/useSessionCounter'

import type { JSX } from 'react'






export const SessionLayout = (): JSX.Element => {

    useSessionCounter()


    return (
        <>
            <section className='session-layout-section'>
                <nav className='session-layout'>
                    <div className='left-session-layout'>
                        <button>
                            <PanelLeftOpen size={30} />
                        </button>
                        <NavLink end to='.'>
                            Dashboard
                        </NavLink>
                    </div>
                    <div className='right-session-layout'>
                        <button>
                            <BellRing size={35} color='#0090b5' />
                        </button>
                        <NavLink to='profile'>
                            <UserIcon size={35} color='#0090b5' />
                        </NavLink>
                    </div>
                </nav>
            </section>
            <Outlet />
        </>
    )
}