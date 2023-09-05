<template>
    <div>
<!-- table for history -->

                <div class="container">
                 <div class="row">
                    <div class="col-md-12">
                         <div class="table-responsive">
                            <table class="table table-bordered" style="margin:20px">
                                <thead>
                                <tr>
                                    <th scope="col">No</th>
                                    <th scope="col">Employee</th>
                                    <th scope="col">Leave Type</th>
                                    <th scope="col">From</th>
                                    <th scope="col">To</th>
                                    <th scope="col">No of Days</th>
                                    <th>Reason</th>
                                    <th class="text-center">Status</th>
                                    <th>Comment</th>
                                    <th class="text-right">Actions</th>
                                </tr>
                                </thead>
                                <tbody> 
                                  <tr v-for="(item, index) in leaveRequests" :key="item.id">
                                
                                    <td>{{ index + 1 }}</td>
                                    <td> 
                                        
                                        <h5>{{item.ename}}</h5>
                                    </td>
                                    <td>
                                
                                            {{ item.LeaveType }}
                                      
                                    </td>
                                    <td>{{ item.from }}</td>
                                    <td>{{ item.to}}</td>
                                    <td>{{ item.NDays }}</td>
                                    <td>{{ item.leave_reason }}</td>
                                    <td class="text-center">
                                        <div class="dropdown action-label">
                                            <div class="btn btn-white btn-sm rounded dropdown-toggle">
                                                <div v-if="item.status === 'pending'">
                                                    <i class="fa fa-dot-circle-o text-info"></i>
                                                    Pending
                                                </div>
                                                <div v-else-if="item.status === 'approved'">
                                                    <i class="fa fa-dot-circle-o text-success"></i>
                                                    Approved
                                                </div>
                                                <div  v-else-if="item.status === 'declined'">
                                                    <i class="fa fa-dot-circle-o text-danger"></i> Declined
                                                </div>

                                            </div>
                                            <!-- <ul class="dropdown-menu pull-right">
                                                <li><a href="#"><i class="fa fa-dot-circle-o text-info"></i> Pending</a></li>
                                                <li><a href="#"><i class="fa fa-dot-circle-o text-success"></i> Approved</a></li>
                                                <li><a href="#"><i class="fa fa-dot-circle-o text-danger"></i> Declined</a></li>
                                            </ul> -->
                                        </div>
                                    </td>
                                    <td>
                                            {{ item.comment}}
                                    </td>
                                    <td scope="row" v-if="item.status=='pending'">
                                        <!-- <div class="dropdown"> -->
                                            <!-- <a href="#" class="action-icon dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i class="fa fa-ellipsis-v"></i></a> -->
                                            <!-- <ul class="dropdown-menu pull-right"> -->
                                                <button title="Edit" data-toggle="modal" class="btn btn-success" data-target="#edit_leave" @click="edit(item)" style="margin-bottom:5px"><i class="fa fa-pencil m-r-5"></i> Edit</button>
                                                <button title="Decline" data-toggle="modal" class="btn btn-success" data-target="#exampleModal1" @click="edit(item)"><i class="fa fa-trash-o m-r-5"></i> Delete</button>
                                            <!-- </ul> -->
                                        <!-- </div> -->
                                    </td>

                                </tr> 
                                </tbody>
                            </table>
                        </div> 
                    <!-- Edit leave details -->
        <div id="edit_leave" class="modal custom-modal fade" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <div class="modal-content modal-md">
                    <div class="modal-header">
                        <h4 class="modal-title">Edit Leave</h4>
                    </div>
                    <div class="modal-body">
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
                                <option value="Bereavement Leave">Bereavement Leave</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label>From <span class="text-danger">*</span></label>
                                <div class="cal-icon"><input class="form-control datetimepicker"  type="date" v-model="from_date"></div>
                            </div>
                            <div class="form-group">
                                <label>To <span class="text-danger">*</span></label>
                                <div class="cal-icon"><input class="form-control datetimepicker"  type="date" v-model="to_date"></div>
                            </div>
                            <div class="form-group">
                                <label>Number of days <span class="text-danger">*</span></label>
                                <input class="form-control" type="number" v-model="NDays"/>
                               
                            </div>
                            <div class="form-group">
                                <label>Remaining Leaves <span class="text-danger">*</span></label>
                                <input class="form-control"  type="number" v-model="RDays">
                            </div>
                            <div class="form-group">
                                <label>Leave Reason <span class="text-danger">*</span></label>
                               <input type="text" class="form-control" v-model="leave_reason"/>
                            </div>
                            <div class="m-t-20 text-center">
                                <button class="btn btn-primary gradient-custom-2" @click="updateLeaverequest">Save Changes</button>
                            </div>
                        </form>
                    </div>
                            </div>
                        </div>
                    </div>


             <!--Modal for delete request  -->

        <!-- Modal -->
<div class="modal fade" id="exampleModal1" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        Are you sure you want to delete leave request?
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" @click="deleteLeaveRequest(this.itemId)">Confirm</button>
      </div>
    </div>
  </div>
</div>

               

                 </div> 
             </div>  
         </div>
    </div>
</template>
<script>
import axios from 'axios';

export default {

    data() {
    return {
        leaveRequests: [],
        empId:'',
        NDays: '',
        RDays: '',
        from_date: '',
        to_date: '',
        leave_reason: '',
        status:'',
        selectedLeaveType: '',
        itemId: null,
        comment:''
        }
    },
     created() {
    this.empId = this.$route.params.userId;
    //console.log(this.empId)
     },
    async mounted() {
         this.getLeaveRequests();
         
    },
           
    methods: {
    async getLeaveRequests() {
      try {
        const userId = this.empId;
         const response=await axios.get(`http://localhost:8080/userData/api/getHistory/${userId}`);
        //console.log(response);
        this.leaveRequests = response.data.leaveRequests.map(request => ({
        
          from: request.from,
          to: request.to,
          NDays :request.NDays,
          leave_reason: request.leave_reason,
          status :request.status,
          ename:request.user_id[0].ename,
          id:request._id,
          LeaveType:request.LeaveType

        }));
      } catch (error) {
        console.error(error);
      }
    },
    
    edit(item){
        this.itemId = item.id;
    } ,

    async updateLeaverequest(e) {
    e.preventDefault();
    const id = this.itemId; // replace with the ID of the employee you want to update
    const updatedData = {
          from: this.from_date,
          to: this.to_date,
          NDays: this.NDays,
          RDays: this.RDays,
          leave_reason: this.leave_reason,
  };
  try {
         await axios.patch(`http://localhost:8080/userData/updateLeave/${id}`, updatedData);
    // Update the employee data on the client
        //console.log(response);
        this.from_date = ''
        this.to_date = ''
        this.leave_reason = ''
        this.NDays = ''
        this.RDays = ''
        window.alert('Leave data updated successfully!');
    // Alternatively, you can update your list of employees to reflect the changes
    // const index = this.todos.findIndex(todo => todo.id === id);
    // this.todos[index] = response.data;
  } catch (error) {
    console.error(error);
  }
},

    async deleteLeaveRequest(id) {
      try {
       // this.itemId=item.id;
        //id=this.itemId;
        const response = await axios.delete(`http://localhost:8080/userData/api/test/DeleteLeave/${id}`);
        console.log(response.data); // should print "Leave Request Deleted" if successful
        window.alert('Leave data deleted successfully!');
      } catch (error) {
        console.error(error);
      }
    }



  }
};

</script>

<style scoped>
caption {
  font-family: "Rock Salt", cursive;
  padding: 20px;
  font-style: italic;
  caption-side: bottom;
  color: #666;
  text-align: right;
  letter-spacing: 1px;
}

form{
    padding: 30px;
}

.gradient-custom-2 {

background: -webkit-linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593);

/* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
background: linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593);
}
</style>