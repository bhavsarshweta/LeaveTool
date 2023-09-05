<template>
  <div class="container login-page">
    <form>

      <div class="form-group">
          <label>Leave Type <span class="text-danger">*</span></label>
          <select class="form-control" v-model="selectedLeaveType">
          <option value="">Select Leave Type</option>
          <option value="Casual Leave">Casual Leave</option>
          <option value="Sick Leave (SL)">Sick Leave (SL)</option>
          <option value="Marriage Leave">Marriage Leave (SL)</option>
          <option value="Bereavement Leave">Sick Leave (SL)</option>
          <option value="Paternity Leave">Paternity Leave</option>
          <option value="Bereavement Leave">  Bereavement Leave</option>
          </select>
      </div>

      <div class="form-group">
        <label>From <span class="text-danger">*</span></label>
        <div class="cal-icon">
          <input class="form-control datetimepicker" id="from_date" type="date" v-model="from_date" />
        </div>
      </div>

      <div class="form-group">
        <label>To <span class="text-danger">*</span></label>
        <div class="cal-icon">
          <input class="form-control datetimepicker" id="to_date" type="date" v-model="to_date" />
        </div>
      </div>

      <div class="form-group">
        <label>Number of days <span class="text-danger">*</span></label>
        <input class="form-control" type="number" v-model="NDays" />
      </div>
      <div class="form-group">
        <label>Remaining Leaves <span class="text-danger">*</span></label>
        <input class="form-control" type="number" v-model="RDays" />
      </div>
      <div class="form-group">
        <label>Leave Reason <span class="text-danger">*</span></label>
        <!-- <textarea rows="4" cols="5" class="form-control" v-model="leave_reason"></textarea> -->
        <input type="text" class="form-control" v-model="leave_reason"/>
      </div>
      <div class="m-t-20 text-center">
        <button class="btn btn-primary gradient-custom-2" type="submit" @click.prevent="addTodo">Send Leave Request</button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
//import moment from 'moment'


export default {
  data() {
    return {
      todos1: [],
      leaveRequests: [],
      leaveTypes: [],
      NDays: '',
      RDays: '',
      from_date: '',
      to_date: '',
      leave_reason: '',
      empId:'',
      status:'',
      selectedLeaveType:''
    }
  },

  
  created() {
    this.empId = this.$route.params.userId;
    console.log(this.empId)
    // Make a request to fetch the user's details using the user ID
    // Update the user data property with the response data
  },

  methods: {

  async addTodo() {
      try {
        //const diffInDays = moment(this.to_date).diff(this.from_date, 'days') + 1;
        const userId = this.empId; // replace with actual user ID or get it from the logged in user
        const response = await axios.post(`http://localhost:8080/userData/api/addleave/${userId}`, {
          from: this.from_date,
          to: this.to_date,
          NDays: this.NDays,
          RDays: this.RDays,
          leave_reason: this.leave_reason,
          LeaveType:this.selectedLeaveType,
          user_id: userId,
         // status:this.status
        })

        this.todos1.push(response.data)
        this.from_date = ''
        this.to_date = ''
        this.leave_reason = ''
        this.NDays = ''
        this.RDays = ''
         window.alert('Leave request sent successfully!');
      } catch (error) {
        console.error(error)
      }
    },




numberOfDays(){
const fromDate = new Date(this.from_date);
const toDate = new Date(this.to_date);

const dayDiff = Math.round((toDate.getTime() - fromDate.getTime()) / 86400000);

console.log(dayDiff);
}
}
}
</script>
<style scoped>


.login-page
{
  width:100%;
  max-width:500px;
  margin:8% auto 5%
}
.login-page
{
  background-color:#fff;
  padding:60px;
  -webkit-box-shadow:0 3px 50px 0 rgba(0,0,0,.1);
  box-shadow:0 3px 50px 0 rgba(0,0,0,.1);
  text-align:center;
  border-radius:5px;
  
}
.gradient-custom-2 {

background: -webkit-linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593);

/* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
background: linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593);
}
</style>