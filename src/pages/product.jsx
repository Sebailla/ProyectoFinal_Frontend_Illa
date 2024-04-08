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
    const { startAddProductInCart, startRemoveProductInCart } = useCartStore();
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
        startAddProductInCart(c product._id, quantity)
        setQuantity(0)
    } */

    return (
        <>
            <Navbar />
            <div>
                <div>
                    <Link to={'/'}>
                        <Button>Volver</Button>
                    </Link>
                </div>
                <div>
                    <img src={product?.thumbnail} alt={product?.title} />
                </div>
                <div>
                    <Typography variant="h4">{product?.title}</Typography>
                    <Typography variant="body1">{product?.description}</Typography>
                    <Typography variant="h5">$ {product?.price}</Typography>
                    <Typography variant="subtitle2">Code: {product?.code}</Typography>
                    <Typography>{product?.category}</Typography>
                    <Typography variant="subtitle2">Stock: {product?.stock}</Typography>
                </div>
                <div>
                    <Typography>Cantidad: {quantity} </Typography>
                    <IconButton onClick={handleAumentarQuantity}>
                        <AddRoundedIcon />
                    </IconButton>
                    <IconButton onClick={handleDisminuirQuantity}>
                        <RemoveRoundedIcon />
                    </IconButton>
                    <IconButton color="primary">
                        <ShoppingCartRoundedIcon />
                    </IconButton>
                    <IconButton color="secundary" onClick={handleReset}>
                        <DeleteRoundedIcon />
                    </IconButton>
                </div>
            </div>

            {/* <Container maxWidth='md' style={{ marginTop: 30 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <img src={product?.thumbnail} alt={product?.title} style={{ maxWidth: '70%', borderRadius: 8, boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)' }} />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Grid container spacing={2} direction="column">
                            <Grid item>
                                <Typography variant="h4">{product?.title}</Typography>
                                <Typography variant="subtitle1" color="textSecondary">{product?.description}</Typography>
                                <Typography variant="h5">Precio: ${product?.price}</Typography>
                                <Typography variant="subtitle1" color="textSecondary">Stock disponible: {product?.stock}</Typography>
                            </Grid>

                            <Grid item>
                                <Grid container spacing={1} alignItems="center">
                                    <Grid item>
                                        <Typography variant="h6">{quantity}</Typography>
                                    </Grid>
                                    <Grid item>
                                        <Button onClick={handleDisminuirQuantity}>
                                            <RemoveCircleOutline />
                                        </Button>
                                    </Grid>
                                    <Grid item>
                                        <Button onClick={handleAumentarQuantity}>
                                            <AddCircleOutline />
                                        </Button>
                                    </Grid>
                                    <Grid item>
                                        <Button onClick={handleReset}>
                                            <DeleteOutline />
                                        </Button>
                                    </Grid>
                                    <Grid item>
                                        <Button onClick={handleAddToCart}>
                                            <ShoppingCart />
                                        </Button>
                                    </Grid>
                                    <Grid>
                                        <Link to={'/'}>
                                            <Button>Volver</Button>
                                        </Link>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Container> */}
        </>
    )
}
