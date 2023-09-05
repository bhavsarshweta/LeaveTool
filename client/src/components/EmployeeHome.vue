<template>

<div class="container-fluid" data-theme="light">
  <div class="row content">
<div class="col-sm-3 sidenav" style="text-align:left;">
    <div class="w3-col s4" style="text-align:center" >
      <img src="../assets/avatar2.png"  style="width:46px;border-radius:50%">
    </div>
    <div class="w3-col s8 w3-bar" style="text-align:center">
      <span>Welcome</span><br>
      
    </div>
    <ul>
    <li><button @click="activeTab ='TabA'" class="btn btn-ghost">My Profile</button></li>
    <li><button @click="activeTab ='AddLeave'" class="btn btn-ghost">Apply For Leave</button></li>
    <li><button @click="activeTab ='TabC'" class="btn btn-ghost">Leave History</button></li>
    <li><button @click="activeTab ='TabD'" class="btn btn-ghost"><router-link to="/" style="text-decoration: none;color:black">Logout</router-link> <i v-if="loading" class="fa fa-refresh fa-spin fa-fw"></i></button></li>
    </ul>
</div>
     <div class="col-sm-7">
    <TabA v-if="activeTab === 'TabA'"/>
    <!-- <TabB v-if="activeTab === 'TabB'"/> -->
    <AddLeave v-if="activeTab === 'AddLeave'"/>
    <TabC v-if="activeTab === 'TabC'"/>   
</div>
  </div>
</div>
</template>
<script>
import AddLeave from './AddLeave.vue'
import TabA from './TabA.vue'
// import TabB from './TabB.vue'
import TabC from './TabC.vue'
//import store from "../store";


export default {

    data(){
        return{
            activeTab:TabA,     
        }
    },
    components:{
        TabA,TabC,AddLeave
    },
   created() {
    const empId = this.$route.params.userId;
    console.log(empId)
    // Make a request to fetch the user's details using the user ID
    // Update the user data property with the response data
  }
    // async mounted() {
    //   try{
    //     const employeeId = response.data._id;
    //       console.warn(employeeId)
    //       store.commit('setLoggedInEmployee', employeeId);
    //   }catch(error){
    //     console.log("error")
    //   }
       
    //},
         
}
</script>
<style>
    ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  width: auto;
} 

li button {
  display: block;
  background-color:#f1f1f1;
  margin-top: 40px;
  color: black;

}
 .sidenav {
      background-color: #512033;
      height:700px;
    }

    .gradient-custom-2 {

background: -webkit-linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593);

/* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
background: linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593);
}
</style>