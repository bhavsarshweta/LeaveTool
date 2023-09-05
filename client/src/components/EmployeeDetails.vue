<template>
    <div>
        <center>
           <form @submit.prevent="addTodo">

     <div class="form-row">
    <div class="form-group col-md-6">
      <label for="inputEmail4">Employee Name</label>
      <input type="text" class="form-control" id="inputEmail4" placeholder="Name" v-model="emp.ename">
    </div>
    <div class="form-group col-md-6">
      <label for="inputPassword4">Emp designation</label>
      <input type="text" class="form-control" id="inputPassword4" placeholder="Emp designation" v-model="emp.designation">
    </div>

    <div class="form-row">
    <div class="form-group col-md-6">
      <label for="inputEmail4">Employee Username</label>
      <input type="text" class="form-control" id="inputEmail4" placeholder="Username" v-model="emp.username">
    </div>
    <div class="form-group col-md-6">
      <label for="inputPassword4">Password</label>
      <input type="text" class="form-control" id="inputPassword4" placeholder="Emp Password" v-model="emp.password">
    </div>
    </div>

  </div>       
  <div class="form-row">
    <div class="form-group col-md-6">
      <label for="inputEmail4">Email</label>
      <input type="email" class="form-control" id="inputEmail4" placeholder="Email" v-model="emp.email">
    </div>
    <div class="form-group col-md-6">
      <label for="inputPassword4">Contact No</label>
      <input type="tel" class="form-control" id="inputPassword4" placeholder="Contact" v-model="emp.contact">
    </div>
  </div>
  <div class="form-row">
  
  <div class="form-group col-md-12">
    <label for="inputAddress2">Address 2</label>
    <input type="text" class="form-control" id="inputAddress2" placeholder="Apartment, studio, or floor" v-model="emp.address">
  </div>
  </div>
  <div class="form-row">
    <div class="form-group col-md-6">
      <label for="inputCity">City</label>
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
      <label for="inputZip">Zip</label>
      <input type="text" class="form-control" id="inputZip" v-model="emp.zip">
    </div>
  </div>
  
  <center><button type="submit" class="btn btn-primary">Add Employee</button></center>
</form>
        </center>

        </div>
</template>
<script>
import axios from "axios";
export default {
    data() {
    return {
        todos: [],
      emp: {
        id: null,
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
  async mounted() {
    const response = await axios.get("api/get");
    this.todos = response.data;
  },
  methods: {
    async addTodo() {
        await axios.post("http://localhost:8080/userAuth/signup", {
        ename:this.emp.ename,
        designation:this.emp.designation,
        contact:this.emp.contact,
        email:this.emp.email,
        city:this.emp.city,
        address:this.emp.address,
        zip:this.emp.zip,
        state:this.emp.state,
        username:this.emp.username,
        password:this.emp.password
      })
      .then((response) => {console.log(response.data.message);
          // Redirect to login page or show success message
          window.alert('Employee data added successfully!');
        })
        .catch((error) => {
          console.log(error.response.data.message);
          window.alert(error.response.data.message);
          // Show error message
        });
      
      this.emp.ename= "";
      this.emp.designation = "";
      this.emp.contact="";
      this.emp.email="";
      this.emp.city="";
      this.emp.address="";
      this.emp.zip="";
      this.emp.state="";
      this.emp.username="";
      this.emp.password="";
    },
    
    },
  }

//      methods: {
//     saveTutorial() {
//       var data = {
//         ename: this.emp.ename,
//         contact: this.emp.contact,
//         email: this.emp.email,
//         password: this.emp.password,
//         city: this.emp.city,
//         Address: this.emp.Address,
//         zip: this.emp.zip,
//         status: this.emp.status,
//       };

//       PostService.create(data)
//         .then(response => {
//           this.emp.id = response.data.id;
//           console.log(response.data);
//           this.submitted = true;
//         })
//         .catch(e => {
//           console.log(e);
//         });
//     },
//   }
// }
</script>

<style scoped>
form{
    width: 700px;
    background: #f1f1f1;
    height:400px;
}
</style>