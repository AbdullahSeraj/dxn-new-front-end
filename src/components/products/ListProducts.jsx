import Slider from 'react-slick';
import ProductCardList from '../cards/ProductCardList'
import { useEffect, useState } from 'react';

const ListProducts = ({ products }) => {
  const [number, setNumber] = useState(1)
  const [newProducts, setNewProducts] = useState(products);

  const handleClick = () => {
    window.scrollTo(0, 0)
  }

  return (
    <div className='list-products flex content-start flex-wrap gap-3 w-full'>
      {products?.map((product, i) => (
        <ProductCardList product={product} key={i} />
      ))}

      {/* <div className='flex gap-10'>
        <button>1</button>
        <button>2</button>
      </div> */}
    </div>
  )
}

export default ListProducts