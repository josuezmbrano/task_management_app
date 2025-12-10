import { Link } from 'react-router'

import HeroImg from '../assets/public/projectmanagement.jpg'
import AboutIcon from '../assets/public/about-icons.png'
import AboutIcon2 from '../assets/public/about-icons-2.png'

import type { JSX } from 'react'



export const About = (): JSX.Element => {
    return (
        <section className='about-section'>
            <div className='about-title-div'>
                <h1>
                    <span className='about-attenuance'>Enhancing</span> <br /> team{' '}
                    <span className='about-attenuance'>synergy</span> for common{' '}
                    <span className='about-attenuance'>goals</span>
                </h1>
            </div>
            <div className='about-hero-div'>
                <img src={HeroImg} alt='Hero image' />
            </div>
            <div className='about-info-div'>
                <p>
                    We believe that great ideas are born from teamwork. Our platform is
                    designed to connect people, break down barriers, and facilitate fluid
                    communication to achieve shared goals
                </p>
            </div>
            <div className='about-img-div'>
                <img src={AboutIcon} alt='About-icon-lupe' />
                <img src={AboutIcon2} alt='About-icon-lupe' />
            </div>
            <div className='about-info-div'>
                <p>
                    Our mission is to empower teams to focus on what they do best:
                    <span className='about-attenuance'> innovate</span>
                </p>
            </div>
            <div className='about-button-container'>
                <div className='about-button-div'>
                    <Link to='/login'>¡Join now!</Link>
                </div>
            </div>
        </section>
    )
}