import { useEffect, useRef, useState } from "react"

const Radio = ({ title, color, name, value, onChange, checked }) => {
    const checkboxRef = useRef(null)
    const [checkedRadio, setCheckedRadio] = useState(checkboxRef?.current?.checked || false);

    useEffect(() => {
        setCheckedRadio(checkboxRef?.current?.checked)
    }, [checkboxRef?.current?.checked])

    const handleClick = () => {
        checkboxRef.current.click();
    }

    return (
        <div className='flex items-center gap-2 cursor-pointer w-fit' onClick={handleClick}>
            <div className='relative'>
                <div className={`w-[16px] h-[16px] rounded-full border  ${color === "White" ? "bg-gray-300" : `bg-${color}`} flex items-center justify-center`} style={{ backgroundColor: color == "White" ? "#ddd" : color }}>
                    <input type="radio" name={name} hidden checked={checked} ref={checkboxRef} value={value} onChange={(e) => onChange(e)} />
                </div>
                <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-lg'>
                    <div className={`rounded-full w-[11px] h-[11px] border-white ${checkedRadio ? "border-2" : `border-none`}`}></div>
                </div>
            </div>
            {title &&
                <label htmlFor={title} className='text-gray-500 text-xs'>{title}</label>
            }
        </div>
    )
}

export default Radio