import { Box, Fab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Button, Typography } from '@mui/material'
import { Navbar } from "../components/navbar"
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { useNavigate } from "react-router-dom"
import { useProductStore } from '../hooks/useProductStore'
import { useEffect, useState } from 'react'

export const AdminProduct = () => {
    const navigate = useNavigate()

    const { products, pagination, startGetProducts, startDeleteProduct, startViewProduct } = useProductStore()
    const [loading, setLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)

    useEffect(() => {
        startGetProducts().then(() => setLoading(false))
    }, [])

    useEffect(() => {
        startGetProducts(currentPage).then(() => setLoading(false))
    }, [currentPage])

    const addProduct = () => navigate('/admin/addProduct')

    const deleteProduct = (productId) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar este producto?')) {
            startDeleteProduct(productId);
        }
    };

    const goToPage = (page) => {
        setCurrentPage(page);
    };

    const editProduct = (product) => {
        console.log({ product });
        startViewProduct({ ...product });
        navigate(`/admin/edit/${product._id}`);
    };


    return (
        <>
            <Navbar />
            <Typography variant="h4" style={{ margin: 15, padding: 10 }}>
                Vista Administrador
            </Typography>

            {loading ? (
                <div>Loading...</div>
            ) : (
                <Box sx={{ margin: '30px' }}>
                    <Box sx={{ '& > :not(style)': { m: 1 }, position: 'fixed', bottom: 50, right: 50 }}>
                        <Fab color="primary" aria-label="add" onClick={addProduct}>
                            <AddIcon />
                        </Fab>
                    </Box>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Título</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Descripción</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Código</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Precio</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Stock</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Categoría</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Acciones</TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {products.map((product) => (
                                    <TableRow key={product._id}>
                                        <TableCell>{product.title}</TableCell>
                                        <TableCell>{product.description}</TableCell>
                                        <TableCell>{product.code}</TableCell>
                                        <TableCell>{product.price}</TableCell>
                                        <TableCell>{product.stock}</TableCell>
                                        <TableCell>{product.category}</TableCell>
                                        <TableCell>
                                            <IconButton onClick={() => deleteProduct(product._id)}>
                                                <DeleteIcon />
                                            </IconButton>
                                            <IconButton onClick={() => editProduct(product)}>
                                                <EditIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    {/* <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                        {pagination && (
                            <Box>
                                {Array.from({ length: pagination.totalPages }).map((_, index) => (
                                    <Button key={index + 1} onClick={() => goToPage(index + 1)}>
                                        {index + 1}
                                    </Button>
                                ))}
                            </Box>
                        )}
                    </Box> */}

                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                        {pagination && (
                            <Box>
                                {Array.from({ length: pagination.totalPages }).map((_, index) => (
                                    <Button
                                        key={index + 1}
                                        onClick={() => goToPage(index + 1)}
                                        sx={{
                                            fontWeight: 'bold',
                                            margin: '0 5px', // Añade un espacio entre los botones de la paginación
                                            backgroundColor: 'rgba(0, 0, 0, 0.1)', // Cambia el color de fondo de los botones
                                            color: 'black', // Cambia el color del texto de los botones
                                            '&:hover': {
                                                backgroundColor: 'rgba(0, 0, 0, 0.2)', // Cambia el color de fondo al pasar el ratón sobre los botones
                                            },
                                        }}
                                    >
                                        {index + 1}
                                    </Button>
                                ))}
                            </Box>
                        )}
                    </Box>

                </Box>
            )}

            {/* <Box
                sx={{
                    position: 'fixed',
                    bottom: 50,
                    right: 50
                }}
                onClick={addProduct}
            >
                <Fab color="primary">
                    <AddIcon />
                </Fab>
            </Box> */}

        </>
    )
}
