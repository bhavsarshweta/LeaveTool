<template>
    <div>
        <center>
         
           <form  class="login-page">  

     <div class="form-row">
    <div class="form-group col-md-6">
      <label for="inputEmail4">Employee Name<span class="text-danger">*</span></label>
      <input type="text" class="form-control" id="inputEmail4" placeholder="Name" v-model="emp.ename" readonly>
    </div>
    <div class="form-group col-md-6">
      <label for="inputPassword4">Emp designation<span class="text-danger">*</span></label>
      <input type="text" class="form-control" id="inputPassword4" placeholder="Emp designation" v-model="emp.designation" readonly>
    </div> 

  

  </div>       
  <div class="form-row">
    <div class="form-group col-md-6">
      <label for="inputEmail4">Email<span class="text-danger">*</span></label>
      <input type="email" class="form-control" id="inputEmail4" placeholder="Email" v-model="emp.email">
    </div>
    <div class="form-group col-md-6">
      <label for="inputPassword4">Contact No<span class="text-danger">*</span></label>
      <input type="tel" class="form-control" id="inputPassword4" placeholder="Contact" v-model="emp.contact">
    </div>
  </div>
  <div class="form-row">
  
  <div class="form-group col-md-12">
    <label for="inputAddress2">Address 2<span class="text-danger">*</span></label>
    <input type="text" class="form-control" id="inputAddress2" placeholder="Apartment, studio, or floor" v-model="emp.address">
  </div>
  </div>
  <div class="form-row">
    <div class="form-group col-md-6">
      <label for="inputCity">City<span class="text-danger">*</span></label>
      <input type="text" class="form-control" id="inputCity" v-model="emp.city">
    </div>
    <div class="form-group col-md-4">
      <label for="inputState">State</label>
       <input type="text" class="form-control" id="inputCity" v-model="emp.state"> 
      <!-- <select id="inputState" class="form-control">
        <option selected>Choose...</option>
        <option>...</option>
      </select>!-->
     </div> 
    <div class="form-group col-md-2">
      <label for="inputZip">Zip<span class="text-danger">*</span></label>
      <input type="text" class="form-control" id="inputZip" v-model="emp.zip">
    </div>
  </div>
  
  <center><button type="submit" @click="updateTodo" class="btn btn-primary gradient-custom-2">Update Employee</button></center>
</form>
        
        </center>

        </div>

    


</template>








<script>

import axios from 'axios'
export default {
  data() {
    return {
        
      empId:"",
      emp: {
        
        ename: "",
        contact: "",
        email:"",
        city:"",
        address:"",
        designation:"",
        zip:"",
        state:"",
        password:"",
        username:""
      },
      submitted: false
    };
  },
   created() {
    this.empId = this.$route.params.userId;
    console.log(this.empId)
    // Make a request to fetch the user's details using the user ID
    // Update the user data property with the response data
  },

  //get details of specific user
  

async mounted() {
  const empId = this.$route.params.userId;
    console.log(this.empId)
  try {
    const response = await axios.get(`http://localhost:8080/userData/api/test/SpecificUser/${empId}`);
    this.emp = response.data;
  } catch(error) {
    
      this.errorMessage = "An error occurred. Please try again later.";
    }
  },

  methods: {

   show(){
    alert("Profile Updated successfully");
   } ,



  async updateTodo(e) {
  e.preventDefault();
  const id = this.empId; // replace with the ID of the employee you want to update
  const updatedData = {
    ename:this.emp.ename,
    designation: this.emp.designation,
    contact: this.emp.contact,
    email: this.emp.email,
    city: this.emp.city,
    address: this.emp.address,
    zip: this.emp.zip,
    state: this.emp.state
  };
  try {
    const response = await axios.patch(`http://localhost:8080/userData/update/${id}`, updatedData);
    // Update the employee data on the client
    this.emp = response.data;

     window.alert('Employee data updated successfully!');
    // Alternatively, you can update your list of employees to reflect the changes
    // const index = this.todos.findIndex(todo => todo.id === id);
    // this.todos[index] = response.data;
  } catch (error) {
    console.error(error);
  }
}
  }
} 

  

 </script>

<style scoped>
/* form{
    width: 700px;
    background: #f1f1f1;
    height:400px;
    margin:30px
} */
.login-page
{
  width:100%;
  /* max-width:460px; */
  margin:8% 
 
}
.login-page
{
  background-color:#fff;
  padding:50px;
  -webkit-box-shadow:0 3px 50px 0 rgba(0,0,0,.1);
  box-shadow:0 3px 50px 0 rgba(0,0,0,.1);
  text-align:center;
  border-radius:5px;
  
}
.gradient-custom-2 {

background: -webkit-linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593);

/* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
/* background: linear-gradient(#8CA6DB, #B993D6); */
}


</style>