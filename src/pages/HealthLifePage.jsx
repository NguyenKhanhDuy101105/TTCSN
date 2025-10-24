import React from 'react'
import HeaderMain from '../components/HeaderMain'
import Footer from '../components/Footer'
import Remote from '../components/Remote'
import Ask from '../components/Ask'
const HealthLifePage = () => {
    return (
        <div>
            <HeaderMain check={"songkhoe"} />

            <div className='w-full pt-[140px]'>
                <div className=' max-w-[1300px] mx-auto'>
                    <img src="https://cdn.bookingcare.vn/fo/2023/11/02/142138-song-khoe-suot-doi-1.png"
                        alt="anhminhoa"
                        className='rounded-3xl w-full object-cover h-[400px]'
                    />
                </div>
            </div>

            <Remote />
            <Ask />
            <Footer />
        </div>
    )
}

export default HealthLifePage
