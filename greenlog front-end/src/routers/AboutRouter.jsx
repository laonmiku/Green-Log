import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AboutClover from '../components/about/AboutClover'
import AboutGreenLog from '../components/about/AboutGreenLog'
import AboutSeed from '../components/about/AboutSeed'
import CarSpot from '../components/community/CarSpot'

const AboutRouter = () => {
    return (
        <Routes>
            <Route path='clover' element={<AboutClover />}></Route>
            <Route path='greenlog' element={<AboutGreenLog />}></Route>
            <Route path='seed' element={<AboutSeed />}></Route>
            <Route path='carspot' element={<CarSpot />}></Route>
        </Routes>
    )
}

export default AboutRouter