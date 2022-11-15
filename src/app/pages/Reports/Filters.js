import React from 'react'

const Filters = () => {
    return (
        <>
            <div className='d-flex justify-content-around my-sm-5'>
                <div className='mt-3'><span>From</span> <span className='mr-3' > <input className='p-3 border border-secondary rounded-1 cursor-pointer ' type="date" /></span> </div>
                <div className='mt-3'><span>To</span> <span> <input className='p-3 border border-secondary rounded-1 ' type="date" /></span> </div>
                {/* Select by organisation */}
                <div>
                    <select className ="form-select mt-3 cursor-pointer">
                        <option>organisation</option>
                        <option>DUMMY1</option>
                        <option>3</option>
                        <option>4</option>
                    </select>
                </div>
                <div>
                    <select className='form-select mt-3 cursor-pointer'>
                        <option>User</option>
                        <option>DUMMY1</option>
                        <option>3</option>
                        <option>4</option>
                    </select>
                </div>
                <div>
                    <select className="form-select mt-3 cursor-pointer">
                        <option>Products</option>
                        <option>DUMMY1</option>
                        <option>3</option>
                        <option>4</option>
                    </select>
                </div>
            </div>
        </>
    )
}

export default Filters