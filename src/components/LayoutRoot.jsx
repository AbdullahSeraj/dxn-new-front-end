import Header from './Headers/Header'
import { Outlet } from 'react-router-dom'
import Snackbar from './Snackbar/Snackbar'
import Footer from './Footer/Footer'
import ViewDetails from './products/ViewDetails'

const LayoutRoot = () => {
    return (
        <div>
            <Header />
            <main className='bg-white mt-[60px] min-h-[calc(100vh-60px)]'>
                <Outlet />
            </main>
            <Snackbar />
            <ViewDetails />
            <Footer />
        </div>
    )
}

export default LayoutRoot