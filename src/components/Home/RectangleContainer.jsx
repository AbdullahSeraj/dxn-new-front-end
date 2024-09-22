import { Link } from "react-router-dom"
import RectangleImg from "../../assets/Rectangle 102.png"


const RectangleContainer = () => {
    return (
        <div className="py-10" style={{ backgroundImage: `url(${RectangleImg})` }}>
            <h2 className="text-center font-bold text-3xl text-text max-lg:text-2xl mb-3">Get Leatest Update By Subscribe<br />
                0ur Newslater
            </h2>
            <div className="flex justify-center">
                <Link to={'/products'} className="pink-button">Show Now</Link>
            </div>
        </div>
    )
}

export default RectangleContainer