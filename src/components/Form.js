import React, {useState} from 'react'

export default function Form({handleSubmit, handleEdit, value, setValue, priceValue, setPriceValue, isEditing}) {
    
    const handleChange = (e) => {
        setValue(e.target.value);
    }
    const handlePriceChange = (e) => {
        setPriceValue(e.target.value);
    }



    if(isEditing) {
        return (
            <div>
                <form onSubmit={handleEdit} className='flex flex-col pt-2'>
                    <div className='flex justify-between gap-10'>
                        <div className='flex flex-col w-full'>
                            <h1 className='font-bold text-lg text-green-500'>지출 항목</h1>
                            <input value={value} onChange={handleChange} className='px-3 py-2 text-black border-b border-b-green-500 rounded' type='text' name='value' placeholder="예) 숙박비"/>
                        </div>
                        <div className='flex flex-col w-full'>
                            <h1 className='font-bold text-lg text-green-500'>비용</h1>
                            <input value={priceValue} onChange={handlePriceChange} className='px-3 py-2 text-black border-b border-b-green-500 rounded' type='text' name='priceValue' placeholder="10000원"/>
                        </div>
                    </div>
                    <input type='submit' className=' mt-4 py-1 bg-green-600 w-20 rounded text-white hover:bg-green-400 hover:scale-105' value='수정'/>
                </form>
            </div>
        )
    }
    else {
        return (
            <div>
                <form onSubmit={handleSubmit} className='flex flex-col pt-2'>
                    <div className='flex justify-between gap-10'>
                        <div className='flex flex-col w-full'>
                            <h1 className='font-bold text-lg text-green-500'>지출 항목</h1>
                            <input value={value} onChange={handleChange} className='w-full px-3 py-2 text-black border-b border-b-green-500 rounded' type='text' name='value' placeholder="예) 숙박비"/>
                        </div>
                        <div className='flex flex-col w-full'>
                            <h1 className='font-bold text-lg text-green-500'>비용</h1>
                            <input value={priceValue} onChange={handlePriceChange} className='w-full px-3 py-2 text-black border-b border-b-green-500 rounded' type='text' name='priceValue' placeholder="10000원"/>
                        </div>
                    </div>
                    <input type='submit' className=' mt-4 py-1 bg-green-600 w-20 rounded text-white hover:bg-green-400 hover:scale-105' value='제출'/>
                </form>
            </div>
        )
    }
}
