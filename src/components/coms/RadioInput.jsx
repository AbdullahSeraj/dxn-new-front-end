import { useRef, useState } from 'react'

const RadioInput = ({ title, color, name, value, onChange }) => {
    const [checkbox, setCheckbox] = useState(false);
    const checkboxRef = useRef(null)

    const handleClick = () => {
        checkboxRef.current.click();
    }

    return (
        <div className='flex items-center gap-2 cursor-pointer w-fit' onClick={handleClick}>
            <div className='relative'>
                <div className={`w-[16px] h-[16px] rounded-full border ${color == "White" ? "bg-gray-300" : `bg-${color}`} flex items-center justify-center`} style={{ backgroundColor: color }}>
                    <input type="checkbox" name={name} hidden ref={checkboxRef} value={value} onChange={(e) => { setCheckbox(!checkbox); onChange(e) }} />
                </div>
                <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-lg'>
                    <div className={`rounded-full w-[11px] h-[11px] border-gray-100 ${checkbox ? "border-2" : `border-none`}`}></div>
                </div>
            </div>
            {title &&
                <label htmlFor={title} className='text-gray-500 text-xs'>{title}</label>
            }
        </div>
    )
}

export default RadioInput