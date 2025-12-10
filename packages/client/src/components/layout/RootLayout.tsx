import { Outlet } from 'react-router'

import { useSessionPersistent } from '../../api/user.api'
import { Navbar } from '../../features/common/components/Navbar'

import BlockShuffle from '../../assets/svg/blocks-shuffle.svg?react'
import SynergyLogo from '../../assets/public/logo.png'

import type { JSX } from 'react'



export const RootLayout = (): JSX.Element => {

    const { isLoading } = useSessionPersistent()

    if (isLoading) {
        return (
            <div className='root-loading-state'>
                <div className='root-logo-loading-state'>
                    <img src={SynergyLogo}/>
                </div>
                <div className='root-shuffle-loading-state'>
                    <BlockShuffle width='300px'/>
                    <h1>Loading app..</h1>
                </div>
            </div>
        )
    }

    return (
        <div className='site-wrapper'>
            <Navbar />
            <main>
                <Outlet />
            </main>
        </div>
    )
}