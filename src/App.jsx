import React from 'react'
import { Navbar } from './Components/Navbar'
import HeroSection from './Components/HeroSection'
import FeatureSection from './Components/FeatureSection'
import WorkFlow from './Components/WorkFlow'
import Pricing from './Components/Pricing'
import Testimonial from './Components/Testimonial'
import Footer from './Components/Footer'


export default function App() {
  return (
    <>
    <Navbar/>
    <div className="max-w-7xl mx-auto pt-20 px-6">
    <HeroSection/>
    <FeatureSection/>
    <WorkFlow/>
    <Pricing/>
    <Testimonial/>
    <Footer/>
    </div>
    </>
  )
}
