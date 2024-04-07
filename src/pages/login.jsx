import { Button, Grid, TextField, Typography } from "@mui/material"
import { useFormik } from 'formik'
import { Link } from "react-router-dom"
import * as Yup from 'yup'
import { useAuthStore } from "../hooks/useAuthStore"

const Login = () => {

    const initialValues = {
        email: '',
        password: ''
    }

    const validationSchema = Yup.object({
        email: Yup.string().email('Email Invalido').required('El email es obligatorio'),
        password: Yup.string().required('El Passwor es obligatorio').min(8, 'Password debe tener 8 o mas caracteres')
    })

    const { values, handleChange, errors } = useFormik({ initialValues, validationSchema })
    const { startLogin } = useAuthStore()

    const { email, password } = values

    //button register disabled
    let disabled = (email != '' && password != '') ? false : true

    const submitForm = () => {
        const isEmpty = Object.keys(errors).length === 0
        if (!isEmpty) return
        //Hacer llamado a la API para el login del user
        startLogin(email, password)

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
            <img className="imgLogoLogin" src="/favicon.svg" alt="logo" />

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
                    Login
                </Typography>

                <Grid container >

                    <Grid item xs={12}>
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
                            Login
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
                            ¿No tienes Cuenta?
                            <Link
                                to='/login/register'
                                className="link"
                            >
                                ...   Registrate</Link>
                        </Typography>

                    </Grid>

                    <Grid
                        item mt={2}
                        xs={12}
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Typography variant="subtitle2">
                            ¿Olvidaste tu passwor?
                            <Link
                                to='/login/email'
                                className="link"
                            >
                                ..  Reset Password
                            </Link>

                        </Typography>

                    </Grid>

                </Grid>

            </Grid>

        </ Grid>
    )
}

export default Login