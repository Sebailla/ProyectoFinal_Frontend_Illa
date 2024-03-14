import { Navigate, Route, Routes } from 'react-router-dom'
import Register from '../pages/register'
import Login from '../pages/login'
import Inicio from '../pages/inicio'
import { useAuthStore } from '../hooks/useAuthStore'
import { useEffect } from 'react'
import LoadingComponent from '../components/loading'
import Cart from '../pages/cart'
import { OwnShops } from '../pages/ownShops'


const AppRouter = () => {

    const { status, startChekingLogin } = useAuthStore()
    
    useEffect(() => {
        startChekingLogin()
    },[])

    if (status === 'checking') return <LoadingComponent />

    return (
        <Routes>
            {
                status === 'unauthenticated'
                    ?
                    (
                        <>
                            <Route path='/' element={<Inicio />} />
                            <Route path='/login/login' element={<Login />} />
                            <Route path='/login/register' element={<Register />} />
                        </>
                    )
                    :
                    (
                        <>
                            <Route path='/' element={<Inicio />} />
                            <Route path='/carts' element={<Cart />} />
                            <Route path='/ownShops' element={<OwnShops />} />
                        </>
                    )
            }

            <Route path='/*' element={<Navigate to='/' />} />
        </Routes>
    )
}

export default AppRouter