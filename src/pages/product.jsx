import { Navbar } from "../components/navbar"
import { useProductStore } from "../hooks/useProductStore"
import { Button, IconButton, Typography } from "@mui/material"
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useCartStore } from '../hooks/useCartStore'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';

export const Product = () => {

    const { '*': productId } = useParams();
    const { product, startGetProductById } = useProductStore();
    const { cart, startAddProductInCart, startRemoveProductInCart } = useCartStore();
    const [quantity, setQuantity] = useState(0);

    useEffect(() => {
        startGetProductById(productId);
    }, [productId]);

    if (!product) {
        return (
            <>
                <Navbar />
                <Typography variant="h4">Cargando producto...</Typography>
            </>
        );
    }

    const handleAumentarQuantity = () => {
        if (quantity < product.stock) {
            setQuantity(prevQuantity => prevQuantity + 1)
            startAddProductInCart(product._id)
        }
    };

    const handleDisminuirQuantity = () => {
        if (quantity > 0) {
            setQuantity(prevQuantity => prevQuantity - 1)
            startRemoveProductInCart(product._id)
        }
    };

    const handleReset = () => setQuantity(0)

    /* const handleAddToCart = () => {
        startAddProductInCart(product._id)
        setQuantity(0)
    } */

    return (
        <>
            <Navbar />
            <div style={{ margin: 20, alignItems:'center' }}>

                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <div style={{ marginLeft: 20, marginRight: 20 }}>
                        <img src={product?.thumbnail} alt={product?.title} style={{ minHeight: 400 }} />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', marginLeft: 40 }}>
                        <div style={{ marginBottom: 25 }}>
                            <Typography variant="h4">{product?.title}</Typography>
                        </div>
                        <div>
                            <Typography variant="body1">{product?.description}</Typography>
                            <Typography variant="h5">$ {product?.price}</Typography>
                            <Typography variant="subtitle2">Code: {product?.code}</Typography>
                            <Typography>{product?.category}</Typography>
                            <Typography variant="subtitle2">Stock: {product?.stock}</Typography>
                        </div>
                        <div style={{ marginTop: 20 }}>
                            <Typography>Cantidad: {quantity} </Typography>
                            <IconButton onClick={handleAumentarQuantity}>
                                <AddRoundedIcon />
                            </IconButton>
                            <IconButton onClick={handleDisminuirQuantity}>
                                <RemoveRoundedIcon />
                            </IconButton>
                            {/* <IconButton color="primary" onClick={handleAddToCart}>
                                <ShoppingCartRoundedIcon />
                            </IconButton> */}
                            <IconButton color="secundary" onClick={handleReset}>
                                <DeleteRoundedIcon />
                            </IconButton>
                        </div>
                        <div style={{ marginTop: 40 }}>
                            <Link to={'/'}>
                                <Button variant="contained">Volver</Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
