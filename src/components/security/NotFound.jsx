import Lottie from "lottie-react"
import notFoundAni from "../../assets/animations/Animation - not found.json"
import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="flex items-center justify-center" style={{ height: "calc(100vh - 60px)" }}>
            <div className="relative w-[70%]">
                <Lottie animationData={notFoundAni} />
                <Link to={"/"} className="text-center absolute bottom-[40%] left-24 bg-blue-600 hover:bg-blue-600/90 text-white py-2 w-[150px] rounded-lg shadow-lg hover:shadow-xl">Go Home</Link>
            </div>
        </div>
    )
}

export default NotFound