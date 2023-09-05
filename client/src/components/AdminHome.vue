
<template>

<div class="container-fluid">
  <div class="row content">
<div class="col-sm-3 sidenav" style="text-align:left">
    <div class="w3-col s4" style="text-align:center">
      <img src="../assets/avatar2.png"  style="width:46px;border-radius:50%">
    </div>
    <div class="w3-col s8 w3-bar" style="text-align:center">
      <span>Welcome, <strong>Admin</strong></span><br>
    </div>
  <ul>
  <li><button @click="activeTab ='EmployeeDetails'" class="btn btn-secondary">Employees</button></li>
  </ul>
    <div class="dropdown" >
  <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    Leaves Management<span style="width:15px height:10px" class="caret"></span>
  </button>
  <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
    <li><button  @click="activeTab ='AllLeaves'" class=" btn btn-secondary dropdown-item cfg">All Leaves</button></li>
    <li><button @click="activeTab ='ApprovedLeaves'" class="btn btn-secondary dropdown-item cfg">Approved Leaves</button></li>
 
    <li><button  @click="activeTab ='PendingLeaves'" class="btn btn-outline-light dropdown-item cfg">Pending Leaves</button></li>
    <li><button @click="activeTab ='NotApproved'" class="btn btn-secondary dropdown-item cfg">Declined Leaves</button></li>
  </div>
  <li><button @click="activeTab ='HomePage'" class="btn btn-secondary"><router-link to="/" style="text-decoration: none;color:black;margin-top:10px">Logout</router-link> <i v-if="loading" class="fa fa-refresh fa-spin fa-fw"></i></button></li>
</div>


    <!-- <ul>
    <li><button @click="activeTab ='EmployeeDetails'" class="btn btn-secondary">Employees</button></li>
    <li><button @click="activeTab ='AllLeaves'" class="btn btn-secondary">All Leaves</button></li>
    <li><button @click="activeTab ='ApprovedLeaves'" class="btn btn-secondary">Approved Leaves</button></li>
 
    <li><button @click="activeTab ='PendingLeaves'" class="btn btn-secondary">Pending Leaves</button></li>
    <li><button @click="activeTab ='NotApproved'" class="btn btn-secondary">Not Approved Leaves</button></li>
    <li><button @click="activeTab ='HomePage'" class="btn btn-secondary"><router-link to="/" style="text-decoration: none;color:black">Logout</router-link> <i v-if="loading" class="fa fa-refresh fa-spin fa-fw"></i></button></li>
    </ul> -->
</div>
     <div class="col-sm-7">
    <EmployeeDetails v-if="activeTab === 'EmployeeDetails'"/>
    <AllLeaves v-if="activeTab === 'AllLeaves'" />
    <PendingLeaves v-if="activeTab === 'PendingLeaves'" />
    <NotApproved v-if="activeTab === 'NotApproved'"/>   
    <ApprovedLeaves v-if="activeTab === 'ApprovedLeaves'"/>   
</div>
  </div>
</div>
</template>
<script>
    import AllLeaves from './AllLeaves.vue'
    import PendingLeaves from './PendingLeaves.vue'
    import ApprovedLeaves from './ApprovedLeaves.vue'
    import NotApproved from './NotApproved.vue'
    import EmployeeDetails from './EmployeeDetails.vue'

    export default{
        components:{
            AllLeaves,
            NotApproved,
            PendingLeaves,
            ApprovedLeaves,
            EmployeeDetails
        },
        data(){
        return{
            activeTab:EmployeeDetails
        }
    },
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

/* Set gray background color and 100% height */
    .sidenav {
      background-color: #f1f1f1;
      height: 700px;
    }

    .cfg{
      background-color:white;
     border: 2px solid white;
    }
    .cfg:hover{
        background-color:lightgrey;
    }

    li {
  list-style-type: none;
  margin: 0;
  padding: 0;
  width: auto;
} 

.dropdown{
  margin-top:25px;
}
</style>
