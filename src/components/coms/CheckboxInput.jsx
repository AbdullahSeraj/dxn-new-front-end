import { useEffect, useRef, useState } from 'react'
import CheckboxIcon from '../../assets/Icons/CheckboxIcon';

const CheckboxInput = ({ title, color, name, value, onChange }) => {
    const [checkbox, setCheckbox] = useState(false);
    const checkboxRef = useRef(null)

    const handleClick = () => {
        checkboxRef.current.click();
    }

    return (
        <div className='flex items-center gap-2 cursor-pointer w-fit' onClick={handleClick}>
            <div className='relative'>
                <div className={`w-[16px] h-[16px] rounded-sm shadow-lg ${checkbox ? `opacity-100` : `opacity-30`} flex items-center justify-center`} style={{ backgroundColor: color }}>
                    <input type="checkbox" name={name} hidden ref={checkboxRef} value={value} onChange={(e) => { setCheckbox(!checkbox); onChange(e) }} />
                </div>
                {checkbox &&
                    <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
                        <CheckboxIcon style={{ color: checkbox ? "white" : `${color}` }} />
                    </div>
                }
            </div>
            <label htmlFor={title} className='text-gray-500 text-sm'>{title}</label>
        </div>
    )
}

export default CheckboxInput