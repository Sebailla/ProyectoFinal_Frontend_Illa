import { useDispatch, useSelector } from "react-redux"
import { getProducts } from "../api/request"
import Swal from "sweetalert2"
import { onPagination, onProducts } from "../store/productSlice"


export const useProductStore = () => {

    const dispatch = useDispatch() 
    
    const { 
        product,
        products,
        pagination
    } = useSelector(state => state.products)
    
    const startGetProducts = async () => {
        const result = await getProducts()
        if (result.ok){
            const {pagination, products} = result
            dispatch(onProducts(products))
            dispatch(onPagination(pagination))
            return
        }
        return Swal.fire({
            position: "top-end",
            html: result.msg,
            icon: 'error',
            confirmButtonText: 'Ok'
        })

    }
    return {
        product,
        products,
        pagination,
        startGetProducts,
    }
}
