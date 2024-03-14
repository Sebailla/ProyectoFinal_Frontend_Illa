import { useDispatch, useSelector } from "react-redux"
import { loginUser, registerUser, tokenValidity } from "../api/request"
import { onLogin, onLogout } from "../store/authSlice"
import Swal from "sweetalert2"

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

    const startLogin = async (email, password) => {
        const result = await loginUser(email, password)
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
        /* return Swal.fire({
            position: "top-end",
            html: "User Logout sussess",
            icon: 'error',
            confirmButtonText: 'Ok'
        }) */
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
        startLogout,
        startChekingLogin
    }
}