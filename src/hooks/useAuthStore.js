import { useDispatch, useSelector } from "react-redux"
import { loginUser, registerUser, tokenValidity, resetPass, sendEmailResetPass } from "../api/request"
import { onLogin, onLogout } from "../store/authSlice"
import Swal from "sweetalert2"
import { useCartStore } from "./useCartStore"
import { useTicketStore } from "./useTicketStore"

export const useAuthStore = () => {

    const dispatch = useDispatch()
    const { _id,
        firstName,
        lastName,
        email,
        age,
        role,
        cart_id,
        status,
        isAdmin,
    } = useSelector(state => state.auth)

    const { startGetCartById } = useCartStore()
    const { startGetTickets } = useTicketStore()

    const startLogin = async (email, password) => {
        const result = await loginUser(email, password)
        if (result.ok) {
            const { _id, cart_id, firstName, lastName, role } = result
            startGetCartById(cart_id)
            return dispatch(onLogin({ _id, cart_id, firstName, lastName, role }))
        }
        return Swal.fire({
            position: "top-end",
            html: result.msg,
            icon: 'error',
            confirmButtonText: 'Ok'
        })
    }

    const startRegister = async (email, password, firstName, lastName, age) => {
        const result = await registerUser(email, password, firstName, lastName, age)
        if (result.ok) {
            const { _id, cart_id, firstName, lastName, role } = result
            return dispatch(onLogin({ _id, cart_id, firstName, lastName, role }))
        }
        return Swal.fire({
            position: "top-end",
            html: result.msg,
            icon: 'error',
            confirmButtonText: 'Ok'
        })
    }

    const startLogout = () => {
        dispatch(onLogout())
        localStorage.clear()
    }

    const startChekingLogin = async () => {
        const result = await tokenValidity()
        
        if (result.ok) {
            const { _id, cart_id, firstName, lastName, role } = result
            return dispatch(onLogin({ _id, cart_id, firstName, lastName, role }))
        }else{
            startLogout()
        }
    }

    const startSendEmailResetPass = async (email) => {
        const resp = await sendEmailResetPass(email);
        if (resp.ok) {
            return Swal.fire({
                title:'Sending email',
                html: 'Revisa tu email para continuar el proceso',
                icon: 'success',
            })
        }

        return Swal.fire({
            title: 'Error',
            html: resp.msg,
            icon: 'error',
        })
    }

    const startResetPass = async (password, token) => {
        const resp = await resetPass(password, token);
        if (resp.ok) {
            Swal.fire({
                title: 'Reset Password',
                html: 'Tu contraseña fue cambiada correctamente',
                icon: 'success',
            })
            return true
        }

        Swal.fire({
            title: 'Error',
            html: resp.msg,
            icon: 'error',
        })

        return false
    }

    return {
        _id,
        firstName,
        lastName,
        email,
        age,
        role,
        cart_id,
        status,
        isAdmin,

        startLogin,
        startRegister,
        startChekingLogin,
        startLogout,
        startSendEmailResetPass,
        startResetPass,
    }
}