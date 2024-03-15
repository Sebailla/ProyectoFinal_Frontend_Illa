import ecommerceApi from "./config";

export const loginUser = async (email, password) => {
    try {
        const { data } = await ecommerceApi.post('/login/login', { email, password })
        console.log(data)
        const { token, user } = data
        const { _id, firstName, lastName, role, cart_id } = user

        localStorage.setItem('token', token)

        return { ok: true, _id, firstName, lastName, role, cart_id }
    } catch (error) {
        console.log(error);
        return { ok: false, msg: error.response.data.msg }
    }
}

export const registerUser = async (email, password, firstName, lastName, age) => {
    try {
        const { data } = await ecommerceApi.post('/login/register', { email, password, firstName, lastName, age })
        console.log(data)
        const { token, user } = data
        const { _id, role, cart_id } = user

        localStorage.setItem('token', token)

        return { ok: true, _id, firstName, lastName, role, cart_id }
    } catch (error) {
        console.log(error)
        return { ok: false, msg: error.response.data.errors[0].msg }
    }
}

export const tokenValidity = async () => {
    try {
        const { data } = await ecommerceApi.get('/login/renew')
        const { token, user } = data
        const { _id, firstName, lastName, role, cart_id } = user

        localStorage.setItem('token', token)

        return { ok: true, _id, firstName, lastName, role, cart_id }
    } catch (error) {
        console.log(error)
        return { ok: false }
    }
}

export const getProducts = async () => {
    try {

        const { data } = await ecommerceApi.get('/products')
        const { result } = data
        const { payload: products, hasNextPage, hasPrevPage, limit, nextPage, page, pagingCounter, prevPage, totalDocs, totalPages } = result
        console.log(result)

        return { ok: true, products, pagination: { hasNextPage, hasPrevPage, limit, nextPage, page, pagingCounter, prevPage, totalDocs, totalPages } }

    } catch (error) {

        console.log(error)
        return { ok: false }
    }
}


