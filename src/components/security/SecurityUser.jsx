import Cookies from "js-cookie"
import { Navigate } from "react-router-dom"
import { useGetProfileQuery } from "../../redux/features/userApiSlice"

const SecurityUser = ({ children }) => {
    const token = Cookies.get("accessToken")
    const { data } = useGetProfileQuery()

    return (
        <>  
            {token && data?.email ?
                <>{children}</>
                :
                <Navigate to={"/signin"} />
            }
        </>
    )
}

export default SecurityUser