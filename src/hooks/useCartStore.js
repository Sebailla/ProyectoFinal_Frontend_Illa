import { useDispatch, useSelector } from "react-redux"
import { addProductInCart, confirmPurchase, deleteProductInCart, getCartById, updateProductInCart } from "../api/request"
import Swal from "sweetalert2"
import { onCart } from "../store/cartSlice"


export const useCartStore = () => {

    const dispatch = useDispatch()
    const { cart } = useSelector(state => state.cart)

    const startGetCartById = async (cid) => {
        const resp = await getCartById(cid)
        console.log(resp)
        if (resp.ok) {
            dispatch(onCart(resp.cart))
            return
        }

        return Swal.fire({
            title: 'Error al obtener los productos',
            html: 'Por favor intenta mas tarte',
            icon: 'error',
        })
    }

    const startAddProductInCart = async (idProduct) => {
        const resp = await addProductInCart(cart._id, idProduct)
        if (resp.ok) {
            dispatch(onCart(resp.cart))
            return;
        }

        return Swal.fire({
            title: 'Error al obtener los productos',
            html: 'Por favor intenta mas tarte',
            icon: 'error',
        })
    }

    const startRemoveProductInCart = async (idProduct) => {
        const p = cart.products.find(p => p.id._id == idProduct)
        const quantity = p.quantity - 1
        const resp = await updateProductInCart(cart._id, idProduct, quantity)
        console.log({ resp })
        if (resp.ok) {
            dispatch(onCart(resp.cart))
            return
        }
        return Swal.fire({
            title: 'Error al obtener los productos',
            html: 'Por favor intenta mas tarte',
            icon: 'error',
        })
    }

    const startDeleteProductInCart = async (idProduct) => {
        const resp = await deleteProductInCart(cart._id, idProduct)
        if (resp.ok) {
            dispatch(onCart(resp.cart))
            return
        }
        return Swal.fire({
            title: 'Error al obtener los productos',
            html: 'Por favor intenta mas tarte',
            icon: 'error',
        })
    }

    const startConfirmCompra = async () => {
        const resp = await confirmPurchase(cart._id)
        if (resp.ok) {
            startGetCartById(cart._id)
            return
        }
        return Swal.fire({
            title: 'Error al obtener los productos',
            html: 'Por favor intenta mas tarte',
            icon: 'error',
        })
    }


    return {
        cart,
        startGetCartById,
        startAddProductInCart,
        startRemoveProductInCart,
        startDeleteProductInCart,
        startConfirmCompra,
    }
}
