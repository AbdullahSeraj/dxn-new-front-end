import Lottie from "lottie-react"
import errorAni from "../../assets/animations/Animation - not found page.json"

const ErrorComponent = ({ message }) => {
    return (
        <div className="w-full min-h-full flex items-center justify-center">
            <div className="w-[300px] mx-auto">
                <Lottie animationData={errorAni} />
                <h3 className="text-blue-500 text-center text-xl -translate-y-10">{message ? message : "Error Server"}</h3>
            </div>
        </div>
    )
}

export default ErrorComponent