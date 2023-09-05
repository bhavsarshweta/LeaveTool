import { createRouter, createWebHistory } from 'vue-router'
import EmpLoginPage from './components/EmpLoginPage.vue'
import EmployeeHome from './components/EmployeeHome.vue'
//import HomePage from './components/HomePage'
import AdminHome from './components/AdminHome'

const routes = [

    {
        name: '/EmpLoginPage',
        component: EmpLoginPage,
        path: '/'
    },
    {
        path: '/EmployeeHome/:userId',
        name: "EmployeeHome",
        component: EmployeeHome,
    },
    {
        path: '/AdminHome',
        name: "AdminHome",
        component: AdminHome,
    },
    // {
    //     path: '/',
    //     name: 'HomePage',
    //     component: HomePage,
    // },

]



const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router