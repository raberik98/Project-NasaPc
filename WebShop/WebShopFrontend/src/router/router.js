import {createRouter,createWebHistory} from 'vue-router'

import Home from '../views/Shop/Home.vue'
import Products from '../views/Shop/Products.vue'
import Cart from '../views/Account/Cart.vue'
import About from '../views/Shop/Contact.vue'


import Admin_Product from '../views/Admin/Admin-products.vue'

import Login from '../views/Account/Login.vue'
import Signup from '../views/Account/Signup.vue'
import ChangePassword from '../views/Account/ChangePassword.vue'
import ActivateAccount from '../views/Account/ActivateAccount.vue'
// import AccountSettings from '../views/Account/Account-settings.vue'
import WishList from '../views/Account/WishList.vue'
// import Order from '../views/Account/Order.vue'
import ProductDetails from '../views/Shop/ProductDetails.vue'

const routes = [
    {path: '/', component: Home},
    {path: '/products', component: Products},
    {path: '/product-details/:Id', component: ProductDetails},
    {path: '/about', component: About},
    {path: '/cart', component: Cart},

    
    {path: '/admin/products', component: Admin_Product},

    {path: '/login', component: Login},
    {path: '/signup', component: Signup},
    {path: '/change-password/:Token', component: ChangePassword},
    {path: '/activate/:activatorToken', component: ActivateAccount},
    // {path: '/account/settings', component: AccountSettings},
    {path: '/account/wishlist', component: WishList},
    // {path: '/account/order/:userId', component: Order},
    
    
]


const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router