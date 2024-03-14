import { Button, Grid, TextField, Typography } from "@mui/material"
import { useFormik } from 'formik'
import { Link } from "react-router-dom"
import * as Yup from 'yup'
import { useAuthStore } from "../hooks/useAuthStore"

const Register = () => {

    const initialValues = {
        firstName: '',
        lastName: '',
        age: '',
        email: '',
        password: ''
    }

    const validationSchema = Yup.object({
        firstName: Yup.string().required('El campo Nombre, es obligatorio'),
        lastName: Yup.string().required('El campo Apellido, es obligatorio'),
        age: Yup.number().min(1, 'La edad debe ser 1 o mayor').max(99, 'La edad debe ser 99 o menor'),
        email: Yup.string().email('Email Invalido').required('El email es obligatorio'),
        password: Yup.string().required('El Passwor es obligatorio').min(8, 'Password debe tener 8 o mas caracteres')
    })

    const { values, handleChange, errors } = useFormik({ initialValues, validationSchema })
    const { startRegister } = useAuthStore()

    const { firstName, lastName, age, email, password } = values

    //button register disabled
    let disabled = (email != '' && password != '' && firstName != '' && lastName != '') ? false : true

    const submitForm = () => {
        const isEmpty = Object.keys(errors).length === 0
        if (!isEmpty) return
        //Hacer llamado a la API para el registro del user
        startRegister(email, password, firstName, lastName, age)

    }

    return (

        < Grid
            container
            spacing={0}
            direction='column'
            alignItems='center'
            justifyContent='center'
            sx={{ minHeight: '100vh', backgroundColor: '#E9E6EA' }}
        >
            <img className="imgLogoRegister" src="/favicon.svg" alt="logo" />

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
                    Register
                </Typography>

                <Grid container >

                    <Grid item xs={12}>
                        <TextField
                            name="firstName"
                            value={firstName}
                            label="First Name"
                            type='text'
                            variant="outlined"
                            size="small"
                            fullWidth
                            onChange={handleChange}
                            error={Boolean(errors.firstName)}
                            helperText={errors.firstName}
                        />
                    </Grid>

                    <Grid item mt={2} xs={12}>
                        <TextField
                            name="lastName"
                            value={lastName}
                            label="Last Name"
                            type='text'
                            variant="outlined"
                            size="small"
                            fullWidth
                            onChange={handleChange}
                            error={Boolean(errors.lastName)}
                            helperText={errors.lastName}
                        />
                    </Grid>

                    <Grid item mt={2} xs={12}>
                        <TextField
                            name="age"
                            value={age}
                            label="Age"
                            type='number'
                            variant="outlined"
                            size="small"
                            fullWidth
                            onChange={handleChange}
                            error={Boolean(errors.age)}
                            helperText={errors.age}
                        />
                    </Grid>

                    <Grid item mt={2} xs={12}>
                        <TextField
                            name="email"
                            value={email}
                            label="Email"
                            type='email'
                            variant="outlined"
                            size="small"
                            fullWidth
                            onChange={handleChange}
                            error={Boolean(errors.email)}
                            helperText={errors.email}
                        />
                    </Grid>

                    <Grid item mt={2} xs={12}>
                        <TextField
                            name="password"
                            value={password}
                            label="Password"
                            type="password"
                            variant="outlined"
                            size="small"
                            fullWidth
                            onChange={handleChange}
                            error={Boolean(errors.password)}
                            helperText={errors.password}
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
                            Register
                        </Button>
                    </Grid>

                    <Grid
                        item mt={4}
                        xs={12}
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Typography variant="subtitle2">
                            ¿Tienes Cuenta?
                            <Link
                                to='/login/login'
                                className="link"
                            >
                                <span> Login</span>
                            </Link>
                        </Typography>

                    </Grid>

                </Grid>

            </Grid>

        </ Grid>
    )
}

export default Register