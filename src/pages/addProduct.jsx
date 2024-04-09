import { Button, Checkbox, FormControlLabel, Grid, TextField, Typography } from "@mui/material"
import { Navbar } from "../components/navbar"
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { useProductStore } from "../hooks/useProductStore"
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { LoadingComponent } from '../components/loading'


export const AddProduct = () => {

    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [showMessage, setShowMessage] = useState(false)

    const initialValues = {
        title: '',
        description: '',
        price: '',
        code: '',
        category: '',
        stock: '',
        thumbnail: '',
    }

    const validationSchema = Yup.object({
        title: Yup.string().required('El campo Nombre, es obligatorio'),
        description: Yup.string().required('El campo Descripción, es obligatorio'),
        price: Yup.number().min(0, 'Debe ser superior o igual a 0'),
        code: Yup.string().required('El campo Código es obligatorio'),
        category: Yup.string().required('La Categoría es obligatorio'),
        stock: Yup.number().required('El campo Stock, es obligatorio'),
    })

    const { values, handleChange, errors, setValues } = useFormik({ initialValues, validationSchema })

    const { startAddProduct } = useProductStore()

    const { title, description, price, code, category, stock, thumbnail} = values

    //button register disabled
    let disabled = (title != '' && description != '' && price != '' && code != '' && category != '' && stock != '' && thumbnail != '') ? false : true

    // Send sate to backend
    const submitForm = async () => {
        try {
            setLoading(true)
            const isEmpty = Object.keys(errors).length === 0
            if (!isEmpty) return

            const formData = new FormData();
            formData.append('title', title);
            formData.append('description', description);
            formData.append('code', code);
            formData.append('price', price);
            formData.append('stock', stock);
            formData.append('category', category);
            formData.append('thumbnail', thumbnail);

            const success = await startAddProduct(formData);

            console.log({ success });

            if (success) {
                setLoading(false);
                setShowMessage(true);
                Swal.fire({
                    title: 'Product successfully added',
                    icon: 'success',
                });
                navigate('/admin');
            } else {
                setLoading(false);
                setShowMessage(false);
            }

        } catch (error) {
            console.log(error);
            setLoading(false);
            setShowMessage(false);
        }

        startAddProduct({ title, description, price, code, category, stock, thumbnail })
    }

    // upload image
    const onFileChange = ({ target }) => {
        if (target.files.length === 0) return
        setValues({
            ...values,
            thumbnail: target.files[0].name
        })
    }

    if (loading){
        return <LoadingComponent/>
    }



    return (
        <>
            <Navbar />

            < Grid
                container
                spacing={0}
                direction='column'
                alignItems='center'
                justifyContent='center'
                sx={{ minHeight: '100vh', backgroundColor: '#E9E6EA' }}
            >

                <Grid
                    className="loginShadow"
                    item
                    sx={{
                        width: 400,
                        backgroundColor: 'white',
                        borderRadius: 3,
                        padding: 5,
                    }}
                >

                    <Typography
                        variant="h4"
                        sx={{ marginBottom: 3 }}
                    >
                        Nuevo Producto
                    </Typography>

                    <Grid container >

                        <Grid item xs={12}>
                            <TextField
                                name="title"
                                value={title}
                                label="Nombre"
                                type='text'
                                variant="outlined"
                                size="small"
                                fullWidth
                                onChange={handleChange}
                                error={Boolean(errors.title)}
                                helperText={errors.title}
                            />
                        </Grid>

                        <Grid item mt={2} xs={12}>
                            <TextField
                                id="outlined-multiline-static"
                                name="description"
                                value={description}
                                label="Descripción"
                                multiline
                                rows={6}
                                size="small"
                                fullWidth
                                onChange={handleChange}
                                error={Boolean(errors.description)}
                                helperText={errors.description}
                            />
                        </Grid>

                        <Grid item mt={2} xs={12}>
                            <TextField
                                name="price"
                                value={price}
                                label="Precio"
                                type='number'
                                variant="outlined"
                                size="small"
                                fullWidth
                                onChange={handleChange}
                                error={Boolean(errors.price)}
                                helperText={errors.price}
                            />
                        </Grid>

                        <Grid item mt={2} xs={12}>
                            <TextField
                                name="code"
                                value={code}
                                label="Código"
                                type="text"
                                variant="outlined"
                                size="small"
                                fullWidth
                                onChange={handleChange}
                                error={Boolean(errors.code)}
                                helperText={errors.code}
                            />
                        </Grid>

                        <Grid item mt={2} xs={12}>
                            <TextField
                                name="stock"
                                label="Stock"
                                value={stock}
                                type="number"
                                variant="outlined"
                                size="small"
                                fullWidth
                                onChange={handleChange}
                                error={Boolean(errors.stock)}
                                helperText={errors.stock}
                            />
                        </Grid>

                        <Grid item mt={2} xs={12}>
                            <TextField
                                name="category"
                                value={category}
                                label="Categoría"
                                type="text"
                                variant="outlined"
                                size="small"
                                fullWidth
                                onChange={handleChange}
                                error={Boolean(errors.category)}
                                helperText={errors.category}
                            />
                        </Grid>

                        <Grid item mt={2} xs={12}>
                            <TextField
                                name="thumbnail"
                                label=""
                                type="file"
                                variant="outlined"
                                size="small"
                                fullWidth
                                onChange={onFileChange}
                            />
                        </Grid>

                        <Grid item mt={2} xs={12}>
                            <FormControlLabel
                                control={<Checkbox />}
                                label="Activo"
                                name="status"
                            />
                        </Grid>

                        <Grid
                            item mt={4}
                            xs
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                        >
                            <Button
                                disabled={disabled}
                                variant="contained"
                                onClick={submitForm}
                            >
                                Guardar
                            </Button>
                        </Grid>

                        <Grid
                            item mt={4}
                            xs={12}
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                        >

                        </Grid>

                    </Grid>

                </Grid>

            </ Grid>
        </>

    )
}
