import { useEffect } from "react"
import { Navbar } from "../components/navbar"
import { ProductCard } from "../components/productCars"
import { UseProductStore } from "../hooks/useProductStore"



const Inicio = () => {

    const {startGetProducts} = UseProductStore()
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