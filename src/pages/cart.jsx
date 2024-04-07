import { useState } from "react"
import { CardItemCart } from "../components/cardItemCart"
import { Navbar } from "../components/navbar"
import { useCartStore } from "../hooks/useCartStore"
import { Button, Typography } from "@mui/material"
import { Link } from "react-router-dom"

const Cart = () => {

    const { cart, startConfirmCompra } = useCartStore();
    const [confirmCompra, setConfirmCompra] = useState(false)


    if (!cart) {
        return (
            <>
                <Navbar />
                <Typography variant="h4">Cargando carrito...</Typography>
            </>
        )
    }

    const total = cart?.products?.reduce((accumulator, product) => {
        return accumulator + (product.quantity * product.id.price)
    }, 0)

    const confirmarCompra = async () => {
        console.log('confirmar compra')
        setConfirmCompra(true)
        await startConfirmCompra()
        setConfirmCompra(false)
    }

    if (confirmCompra) {
        return (
            <>
                <Navbar />
                <Typography variant="h4">Procesando compra...</Typography>
            </>
        )
    }

    return (
        <>
            <Navbar />
            {
                cart.products.length > 0 &&
                cart.products.map((product) => (
                    <div key={product.id._id}>
                        <CardItemCart  {...product} />
                    </div>
                ))
            }

            {
                cart.products.length > 0 &&
                <>
                    <div className="d-flex justify-content-center mt-3">
                        <strong>Total: </strong> ${total.toFixed(2)}
                    </div>
                    <div className="d-flex justify-content-center mt-3">
                        <button onClick={confirmarCompra} className="btn btn-primary">Confirmar compra</button>
                    </div>
                </>
            }

            {
                cart.products.length === 0 &&
                <>
                    <div style={{ textAlign: 'center', marginTop: '50px' }}>
                        <Typography variant="h4">Tu carrito está vacío</Typography>
                        <Typography variant="body1" style={{ marginTop: '20px', marginBottom: '20px' }}>¡Agrega algunos productos para comenzar!</Typography>
                        <Link to="/" style={{ textDecoration: 'none' }}>
                            <Button variant="contained" color="primary" style={{ marginTop: '20px' }}>
                                <Typography variant="button" sx={{ color: 'white' }}>
                                    Ir a comprar
                                </Typography>
                            </Button>
                        </Link>
                    </div>
                </>
            }
        </>
    )
}

export default Cart