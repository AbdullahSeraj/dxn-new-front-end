import Lottie from "lottie-react"
import loadingAni from "../../assets/animations/Animation - not found page.json"

const ErrorPage = ({ error }) => {
    return (
        <div className="fixed top-0 left-0 right-0 bottom-0" style={{ zIndex: "10000000" }}>
            <div className="absolute top-0 left-0 right-0 bottom-0 bg-white"></div>

            <div className="flex flex-col items-center justify-center w-full h-full">
                <div className="w-[450px] max-md:w-full max-md:px-10">
                    <Lottie animationData={loadingAni} />
                </div>
                <p className="-translate-y-10 text-text z-50 font-bold text-3xl text-center max-md:text-2xl">{error?.data?.message ? error?.data?.message : "Something Error ..."}</p>
            </div>
        </div>
    )
}

export default ErrorPage