
import { Link } from 'react-router-dom'
import { useProductsQuery } from '../redux/features/productApiSlice'
import SavedCard from '../components/cards/SavedCard';
import { useSavedQuery } from '../redux/features/savedApiSlice';

const Saved = () => {
    const { data: favorites, isLoading: isLoadingFavorites
    } = useSavedQuery();

    return (
        <div className="h-full">
            <div className='bg-bg_pink py-7'>
                <div className='w-[90%] mx-auto'>
                    <h2 className='text-text text-3xl font-bold'>Saved Products</h2>
                    <div><Link to={"/"}>Home</Link> . <span className='text-pink'>Saved Products</span></div>
                </div>
            </div>

            {favorites && favorites?.length != 0 && !isLoadingFavorites &&
                <div className='w-[90%] mx-auto py-10 flex justify-center flex-wrap gap-3'>
                    {favorites.map((fav, i) => (
                        <SavedCard fav={fav} key={i} />
                    ))}
                </div>
            }

            {favorites?.length == 0 && (
                <div className="text-center py-10">
                    <p className="font-bold text-4xl pb-5 text-text">Not found any products</p>
                    <Link to={"/products"} className="pink-button">Go To Shopping</Link>
                </div>
            )}
        </div>
    )
}

export default Saved