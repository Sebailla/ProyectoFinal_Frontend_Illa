import { useState } from "react"
import { CardItemCart } from "../components/cardItemCart"
import { Navbar } from "../components/navbar"
import { useCartStore } from "../hooks/useCartStore"
import { Button, Typography } from "@mui/material"
import { Link, useNavigate } from "react-router-dom"
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'
import { referenceId } from "../api/request"
import { getVariablesEnv } from "../helpers/getVariablesEnv"
import queryString from 'query-string';

const { VITE_MP_PUBLIC_KEY } = getVariablesEnv()
initMercadoPago(VITE_MP_PUBLIC_KEY, { locale: 'es-AR' })

const Cart = () => {

    const { cart, startConfirmCompra } = useCartStore();
    const [confirmCompra, setConfirmCompra] = useState(false)
    //estado mercadipago
    const [preferenceId, setPreferenceId] = useState(null)

    const { status } = queryString.parse(location.search)
    const navigate = useNavigate()

    const confirmarCompra = async () => {
        console.log('Purchase confirmed')
        setConfirmCompra(true)
        await startConfirmCompra()
        setConfirmCompra(false)
        navigate('/ownShops')
    }
    console.log({cart})
    //idReference de mercadipago
    const idReference = async () => {
        try {
            const resultado = await referenceId(cart._id)
            if (resultado.ok){
                setPreferenceId(resultado.idPreference)
                if (cart && status == 'approved'){
                    confirmarCompra()
                } 
            }
        } catch (error) {
            console.log({ error });
        }
    }

    

    if (!cart) {
        return (
            <>
                <Navbar />
                <Typography variant="h4">No se encontro Carrito de compras</Typography>
            </>
        )
    }

    const total = cart?.products?.reduce((accumulator, product) => {
        return accumulator + (product.quantity * product.id.price)
    }, 0)


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
                    {
                            !preferenceId && <button onClick={idReference} className="btn btn-primary">Confirmar compra</button>
                        }
                    </div>
                    <div className="d-flex justify-content-center mt-3">
                        {
                            preferenceId && <Wallet initialization={{ preferenceId }} customization={{ texts: { valueProp: 'smart_option' } }} />
                        }
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