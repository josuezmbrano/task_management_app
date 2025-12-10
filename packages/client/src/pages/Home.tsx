import { Link } from 'react-router'

import ProjectImg from '../assets/public/home-projects.png'

import type { JSX } from 'react'



export const Home = (): JSX.Element => {
    return (
        <section className='home-section' >
            <div className='home-section-info-container'>
                <h1>
                    Effortless task <br /> management, <span className='home-section-attenuance'>anytime</span>
                </h1>
                <p>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facere
                    minima temporibus natus qui molestiae iste nisi
                </p>
            </div>
            <div className='home-section-img-div'>
                <img
                    className='home-section-img'
                    src={ProjectImg}
                    alt='home porject image'
                />
            </div>
            <div className='home-section-button-div'>
                <p>
                    manage tasks and projects easily with an all-in-one platform
                </p>
                <div className='home-section-button-link'>
                    <Link to='about'>Learn more</Link>
                </div>
            </div>
        </section>
    )
}