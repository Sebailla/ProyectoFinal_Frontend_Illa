import { useEffect } from "react"
import { Navbar } from "../components/navbar"
import { ProductCard } from "../components/productCars"
import { useProductStore } from "../hooks/useProductStore"



const Inicio = () => {

    const {startGetProducts} = useProductStore()
    useEffect(()=>{
        startGetProducts()
    }, [])

    return (
        <div>
            <Navbar/>
            <ProductCard/>
        </div>
    )
}

export default Inicio