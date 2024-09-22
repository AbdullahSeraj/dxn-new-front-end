import React from 'react'
import CircleCard from '../cards/CircleCard'

const TopCategories = () => {
    return (
        <div className="py-10 w-[90%] mx-auto">
            <h2 className="text-title_color text-center text-3xl font-bold my-7">Top Categories</h2>

            <div className='flex flex-wrap justify-center gap-8'>
                <CircleCard />
                <CircleCard />
                <CircleCard />
                <CircleCard />
            </div>
        </div>
    )
}

export default TopCategories