import { NavLink } from "react-router-dom"
import { useAuthStore } from "../hooks/useAuthStore"
import Avatars from "./avatar"
import LogoutIcon from '@mui/icons-material/Logout'
import LoginIcon from '@mui/icons-material/Login'
import HowToRegIcon from '@mui/icons-material/HowToReg'
import { Chip, Badge } from "@mui/material"
import { useCartStore } from '../hooks/useCartStore'
import { LocalGroceryStoreOutlined } from "@mui/icons-material"

export const Navbar = () => {

    //logout
    const { status, isAdmin, startLogout } = useAuthStore()
    const { cart } = useCartStore();

    const onHandleLogout = () => {
        startLogout()
    }

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
                                <NavLink
                                    className="navLink"
                                    to={'/admin'}
                                >
                                    Administrador
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
                            to='/chat'
                            className='navLink'
                            style={{
                                marginRight: '15px'
                            }}
                        >
                            Chat
                        </NavLink>
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
                                <Badge badgeContent={cart?.products.length} color="primary">
                                    <LocalGroceryStoreOutlined />
                                </Badge>
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
                                <Chip icon={<LogoutIcon color="error" />} label="Logout" />
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
                                <Chip icon={<LoginIcon color="success" />} label="Login" />
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