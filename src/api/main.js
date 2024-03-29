import { $axios } from "../common/request";

// get all categories
export function categoryListApi() {
    return $axios({
        'url': '/category/list',
        'method': 'get',
    })
}

// get menu items according to category
export function dishListApi(data) {
    return $axios({
        'url': '/dish/list',
        'method': 'get',
        params: { ...data }
    })
}

// get set meals according to category
export function setmealListApi(data) {
    return $axios({
        'url': '/setmeal/list',
        'method': 'get',
        params: { ...data }
    })
}

// get all items in cart
export function cartListApi(data) {
    return $axios({
        'url': '/shoppingCart/list',
        //'url': '/front/cartData.json',
        'method': 'get',
        params: { ...data }
    })
}

// Add items to shopping cart
export function addCartApi(data) {
    return $axios({
        'url': '/shoppingCart/add',
        'method': 'post',
        data
    })
}

// Modify items in shopping cart
export function updateCartApi(data) {
    return $axios({
        'url': '/shoppingCart/sub',
        'method': 'post',
        data
    })
}

export function subCartByIdApi(id) {
    return $axios({
        'url': '/shoppingCart/sub',
        'method': 'delete',
        params: new URLSearchParams({ id: id })
    })
}

export function removeCartByIdApi(id) {
    return $axios({
        'url': '/shoppingCart/delete',
        'method': 'delete',
        params: new URLSearchParams({ id: id })
    })
}

//删除购物车的商品
export function clearCartApi() {
    return $axios({
        'url': '/shoppingCart/clean',
        'method': 'delete',
    })
}

// get setmeal details
export function setMealDishDetailsApi(id) {
    return $axios({
        'url': `/setmeal/listById?id=${id}`,
        'method': 'get',
    })
}


