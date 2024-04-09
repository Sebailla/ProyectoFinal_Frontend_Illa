import { useDispatch, useSelector } from "react-redux"
import { addProduct, getProducts, getProductbyId, deleteProduct, updateProduct } from "../api/request"
import Swal from "sweetalert2"
import { onPagination, onProduct, onProducts, onDeleteProduct, onUpdateProduct } from "../store/productSlice"


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

    const startGetProductById = async (pid) => {
        const resp = await getProductbyId(pid)
        if (resp.ok) {
            const { product } = resp
            startViewProduct(product)
            return;
        }

        /* return Swal.fire({
            title: 'Error al obtener los productos',
            html: 'Por favor intenta mas tarte',
            icon: 'error',
        }) */
    }

    const startViewProduct = async (product)=>{
        dispatch(onProduct(product))
        return true
    }

    const startAddProduct = async (product)=>{
        const result = await addProduct(product)
        if (result.ok){
            return startViewProduct(result.product)
        }
        Swal.fire({
            title: 'Error al crear el producto',
            position: "top-end",
            html: result.msg,
            icon: 'error',
            confirmButtonText: 'Ok'
        })
        return false
    }

    const startDeleteProduct = async (idProduct) => {
        const resp = await deleteProduct(idProduct)

        if (resp.ok) return dispatch(onDeleteProduct(idProduct))

        Swal.fire({
            title: 'Error al eliminar el producto',
            html: resp.msg,
            icon: 'error',
        })

        return false
    }

    const startUpdateProduct = async (id, values) => {
        const resp = await updateProduct(id, values)

        if (resp.ok) {
            Swal.fire({
                title: 'Prodcuto actualizado!',
                icon: 'success',
            })
            return onUpdateProduct(resp.producto)
        }

        Swal.fire({
            title: 'Error al actualizar el producto',
            html: resp.msg,
            icon: 'error',
        })
    }

    return {
        product,
        products,
        pagination,
        startGetProducts,
        startGetProductById,
        startViewProduct,
        startAddProduct,
        startUpdateProduct,
        startDeleteProduct
    }
}
