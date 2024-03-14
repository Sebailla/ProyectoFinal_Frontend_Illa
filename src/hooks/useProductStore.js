import { getProducts } from "../api/request"


export const UseProductStore = () => {
    
    const startGetProducts = async () => {
        await getProducts()

    }
    return {
        startGetProducts,
    }
}
