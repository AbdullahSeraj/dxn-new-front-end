import { useProductQuery } from '../../redux/features/productApiSlice'
import { useEffect, useState } from 'react'
import ColumnTable from './ColumnTable'

const TableCart = ({ cart }) => {
    return (
        <table className="w-full">
            <thead>
                <tr>
                    <th className="text-start font-bold text-text text-2xl pb-8">Product</th>
                    <th className="text-start font-bold text-text text-2xl pb-8">Price</th>
                    <th className="text-start font-bold text-text text-2xl pb-8">Quantity</th>
                    <th className="text-start font-bold text-text text-2xl pb-8">Total</th>
                </tr>
            </thead>
            <tbody>
                {cart && cart?.length != 0 && cart.map((item, i) => (
                    <ColumnTable item={item} key={i} />
                ))}
            </tbody>

        </table >
    )
}

export default TableCart