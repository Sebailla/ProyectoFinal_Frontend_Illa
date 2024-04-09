import ecommerceApi from "./config";

//? Login
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

export const sendEmailResetPass = async (email) => {
    try {
        const { data } = await ecommerceApi.post('/login/passwordRecovery', { email });
        return { ok: true }
    } catch (error) {
        console.log(error);
        return { ok: false, msg: error.response.data.msg };
    }
}

export const resetPass = async (password, token) => {
    
    try {
        const { data } = await ecommerceApi.post('/login/newPassword', { password, token });
        return { ok: true }
    } catch (error) {
        console.log(error);
        return { ok: false, msg: error.response.data.msg };
    }
}

//? Products
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

export const getProductbyId = async (id) => {
    try {

        const { data } = await ecommerceApi.get(`/products/${id}`)

        const { producto } = data
        console.log(data)
        return { ok: true, product: producto };
    } catch (error) {
        console.log(error);
        return { ok: false };
    }
}

export const addProduct = async (product) => {
    try {
        
        const form = new FormData()
        form.append('title', product.title)
        form.append('description', product.description)
        form.append('price', product.price)
        form.append('code', product.code)
        form.append('category', product.category)
        form.append('stock', product.stock)
        form.append('thumbnail', product.thumbnail)

        const {result} = await ecommerceApi.post('/products', {...form})

        return { ok: true, product: result}

    } catch (error) {

        console.log(error)
        return { ok: false, error }
    }
}

export const deleteProduct = async (pid) => {
    try {
        const { data } = await ecommerceApi.delete(`/products/${pid}`);
        return { ok: true, msg: data.msg };
    } catch (error) {
        console.log({ error });
        return { ok: false, msg: error.response.data.msg };
    }
}

export const updateProduct = async (pid, values) => {
    try {
        const { data } = await ecommerceApi.put(`/products/${pid}`, values);
        return { ok: true, producto: data.producto };
    } catch (error) {
        console.log({ error });
        return { ok: false, msg: error.response.data.msg };
    }
}

//? Cart
export const getCartById = async (cid) => {
    try {
        const { data } = await ecommerceApi.get(`/carts/${cid}`);
        console.log(data)
        const { result } = data;
        return { ok: true, cart: result };
    } catch (error) {
        console.log(error);
        return { ok: false };
    }
}

export const addProductInCart = async (cid, pid) => {
    console.log(cid, pid)
    try {
        const { data } = await ecommerceApi.post(`/carts/${cid}/products/${pid}`);
        return { ok: true, cart: data.result};
    } catch (error) {
        console.log({ error });
        return { ok: false, msg: error.msg };
    }
}

export const updateProductInCart = async (cid, pid, quantity) => {
    try {
        const { data } = await ecommerceApi.put(`/carts/${cid}/products/${pid}`, { quantity });
        return { ok: true, cart: data.carrito };
    } catch (error) {
        console.log({ error });
        return { ok: false, msg: error.response.data.msg };
    }
}

export const deleteProductInCart = async (cid, pid) => {
    try {
        const { data } = await ecommerceApi.delete(`/carts/${cid}/products/${pid}`);
        return { ok: true, cart: data.carrito };
    } catch (error) {
        console.log({ error });
        return { ok: false, msg: error.response.data.msg };
    }
}

export const confirmPurchase = async (cid) => {
    try {
        const { data } = await ecommerceApi.post(`/carts/${cid}/purchase`);
        return { ok: true };
    } catch (error) {
        console.log({ error });
        return { ok: false, msg: error.response.data.msg };
    }
}

//? Ticket
export const getTickets = async () => {
    try {
        const { data } = await ecommerceApi.get('/tickets');
        return { ok: true, tickets: data.tickets };
    } catch (error) {
        console.log(error);
        return { ok: false };
    }
}

// Mercado Pago
export const referenceId = async (idCart) => {
    try {
        const { data } = await ecommerceApi.post(`/carts/createPreference/${idCart}`);
        console.log({ data });
        return { ok: true, idPreference: data.idPreference };
    } catch (error) {
        console.log({ error });
        return { ok: false, msg: error.response.data.msg };
    }
}