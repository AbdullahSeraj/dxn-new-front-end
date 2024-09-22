import { useState } from "react";
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";

const PasswordInput = ({ name, id, placeholder, className, value, onChange }) => {
    const [isShow, setIsShow] = useState(false)
    const handleShow = () => {
        setIsShow(!isShow)
    }

    return (
        <div className={`${className} flex items-center gap-2`}>
            <input type={isShow ? "text" : "password"} name={name} id={id} placeholder={placeholder} className="outline-none flex-1 bg-transparent" value={value} onChange={onChange} />
            <button type="button">
                {isShow ? <IoEye onClick={handleShow} className="text-lg" /> : <IoEyeOff onClick={handleShow} className="text-lg" />}
            </button>
        </div>
    )
}

export default PasswordInput