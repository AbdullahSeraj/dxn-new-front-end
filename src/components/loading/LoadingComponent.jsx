import Lottie from "lottie-react"
import loadingAni from "../../assets/animations/Animation - small Loading.json"

const LoadingComponent = ({ width }) => {
    return (
        <div className="w-full min-h-full flex items-center justify-center">
            <div className={`w-[${width}] mx-auto`}>
                <Lottie animationData={loadingAni} />
            </div>
        </div>
    )
}

export default LoadingComponent