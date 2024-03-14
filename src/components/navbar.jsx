import { NavLink } from "react-router-dom"
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'
import { useAuthStore } from "../hooks/useAuthStore"
import Avatars from "./avatar"
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import { Chip } from "@mui/material";

export const Navbar = () => {

    //logout
    const { startLogout } = useAuthStore()

    const onHandleLogout = () => {
        startLogout()
    }

    //Auth

    const { status, isAdmin } = useAuthStore()

    return (
        <div className="navbar">
            <div>
                <NavLink to={'/'}>
                    <img className="logo" src="/favicon.svg" alt="logo" />
                </NavLink>

            </div>
            <div>
                {
                    status === 'authenticated' &&
                        <>
                            {
                                isAdmin &&
                                <>
                                    <NavLink className="navLink" >
                                        Agregar Producto
                                    </NavLink>
                                </>
                            }
                        </>
                }
            </div>
            <div className="navbar">
                {
                    status === 'authenticated' &&
                        <>
                            <NavLink
                                className="navLink"
                                to={'/ownShops'}
                                style={{
                                    marginLeft: 40,
                                    padding: 15
                                }}
                            >
                                Mis compras
                            </NavLink>
                        </>
                }
            </div>
            <div className="navbar">
                {
                    status === 'authenticated'
                        ?
                        <>
                            <NavLink
                                className="navCart"
                                to={'/carts'}
                            >
                                <ShoppingCartOutlinedIcon />
                            </NavLink>
                            <NavLink
                                className="avatar"
                            >
                                <Avatars />
                            </NavLink>
                            <NavLink
                                className="navLinkChip"
                                onClick={onHandleLogout}
                            >
                                <Chip icon={<LogoutIcon color="error"/>} label="Logout" />
                            </NavLink>
                        </>
                        :
                        <>
                            <NavLink
                                className="navLinkChip"
                                to={'/login/register'}
                            >
                                <Chip icon={<HowToRegIcon />} label="Register" />
                            </NavLink>
                            <NavLink
                                className="navLinkChip"
                                to={'/login/login'}
                            >
                                <Chip icon={<LoginIcon color="success"/>} label="Login" />
                            </NavLink>
                            <NavLink
                                className="avatar"
                            >
                                <Avatars />
                            </NavLink>
                        </>
                }
            </div>
        </div>
    )
}