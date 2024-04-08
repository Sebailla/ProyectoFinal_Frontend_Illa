import { Navigate, Route, Routes } from 'react-router-dom'
import Register from '../pages/register'
import Login from '../pages/login'
import Inicio from '../pages/inicio'
import { useAuthStore } from '../hooks/useAuthStore'
import { useEffect } from 'react'
import LoadingComponent from '../components/loading'
import Cart from '../pages/cart'
import { OwnShops } from '../pages/ownShops'
import { Product } from '../pages/product'
import { AdminProduct } from '../pages/adminProduct'
import { AddProduct } from '../pages/addProduct'
import { EditProduct } from '../pages/editProduct'
import { ChatComponent } from '../components/chat'
import { ResetPasswordEmail } from '../pages/resetPasswordEmail'
import { ResetPassword } from '../pages/resetPassword'


const AppRouter = () => {

    const { status, startChekingLogin, isAdmin } = useAuthStore()

    useEffect(() => {
        startChekingLogin()
    }, [])

    if (status === 'checking') return <LoadingComponent />

    return (
        <Routes>
            {
                status === 'unauthenticated'
                    ?
                    (
                        <>
                            <Route path='/login/login' element={<Login />} />
                            <Route path='/login/register' element={<Register />} />
                            <Route path='/login/email' element= {<ResetPasswordEmail/>} />
                            <Route path='/login/newPassword' element={<ResetPassword/>} />
                        </>
                    )
                    :
                    (
                        <>
                            <Route path='/carts' element={<Cart />} />
                            <Route path='/ownShops' element={<OwnShops />} />
                            <Route path='/chat' element={<ChatComponent />} />
                            {
                                isAdmin &&
                                <>
                                    <Route path='/admin' element={<AdminProduct />} />
                                    <Route path='/admin/addProduct' element={<AddProduct />} />
                                    <Route path="/admin/edit/:id" element={<EditProduct/>} />
                                </>
                            }
                        </>
                    )
            }
            <Route path='/' element={<Inicio />} />
            <Route path='/product/:id' element={<Product />} />
            <Route path='/*' element={<Navigate to='/' />} />
        </Routes>
    )
}

export default AppRouter