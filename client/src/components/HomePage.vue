<template>
    <div>
        <nav>
            <ul>
                <li><button @click="activeTab =''" class="btn btn-secondary">Home</button></li>
                <li><button @click="activeTab ='EmpLoginPage'" class="btn btn-secondary">Employee Login</button></li>
                <li><button @click="activeTab ='AdminLoginPage'" class="btn btn-secondary">Admin Login</button></li>      
            </ul>
        </nav>
        <div class="row">
             <EmpLoginPage v-if="activeTab === 'EmpLoginPage'"/>
             <AdminLoginPage v-if="activeTab === 'AdminLoginPage'"/>
        </div>
    </div>
</template>

<script>
import EmpLoginPage from './EmpLoginPage.vue'
import AdminLoginPage from './AdminLoginPage.vue'
export default {
    data(){
        return{
            activeTab:EmpLoginPage
        }
    },
    components:{
        EmpLoginPage,
        AdminLoginPage
    }
}
</script>
<style scoped>
/* nav{
    display: flex;
    background: grey;
} */
nav ul{
    display:flex;
    justify-content: space-around;
    align-items:flex-start;
    background: grey;
    height: 80px;
}
</style>