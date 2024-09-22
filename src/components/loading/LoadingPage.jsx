import Lottie from "lottie-react"
import loadingAni from "../../assets/animations/Animation - small Loading.json"

const LoadingPage = () => {
    return (
        <div className="fixed top-0 left-0 right-0 bottom-0" style={{ zIndex: "10000000" }}>
            <div className="absolute top-0 left-0 right-0 bottom-0 bg-white"></div>

            <div className="flex items-center justify-center w-full h-full">
                <div className="w-[200px]">
                    <Lottie animationData={loadingAni} />
                </div>
            </div>
        </div>
    )
}

export default LoadingPage