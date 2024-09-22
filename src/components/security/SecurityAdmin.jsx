import Cookies from "js-cookie"
import { Navigate } from "react-router-dom"
import { useGetProfileQuery } from "../../redux/features/userApiSlice"

const SecurityAdmin = ({ children }) => {
    const token = Cookies.get("accessToken")
    const { data } = useGetProfileQuery()

    return (
        <>
            {token && data?.email && data?.role === "admin" ?
                <>{children}</>
                :
                <Navigate to={"/"} />
            }
        </>
    )
}

export default SecurityAdmin