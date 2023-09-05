<template>
    <div class="container">
  <div class="row">
    <div class="col-md-12" style="margin-top:50px;place-items:center;">
      <table class="table table-bordered">
        <thead>
          <tr>
            <th scope="col">No</th>
            <th scope="col">Emp Name</th>
            <th scope="col">Leave Type</th>
            <th scope="col">From</th>
            <th scope="col">To</th>
            <th scope="col">No of Days</th>
            <th scope="col">Reason</th>
            <th scope="col">status</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
                    <tr v-for="(item, index) in leaveRequests" :key="item.id">
                                    <!--<td>-->
                                        <!--<a class="avatar">R</a>-->
                                        <!--<h2><a href="#">Richard Miles <span>Web Developer</span></a></h2>-->
                                    <!--</td>-->
                                    <td>{{ index + 1 }}</td>
                                    <td>{{item.ename}}</td>
                                    <td> {{ item.LeaveType }} </td>
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
                                                    <i class="fa fa-dot-circle-o text-success"></i> Declined
                                                </div>

                                            </div>
                                            <!--<ul class="dropdown-menu pull-right">-->
                                                <!--<li><a href="#"><i class="fa fa-dot-circle-o text-info"></i> Pending</a></li>-->
                                                <!--<li><a href="#"><i class="fa fa-dot-circle-o text-success"></i> Approved</a></li>-->
                                                <!--<li><a href="#"><i class="fa fa-dot-circle-o text-danger"></i> Declined</a></li>-->
                                            <!--</ul>-->
                                        </div>
                                    </td>
                                    <td scope="row">
                                      <button type="button" class="btn btn-success" data-toggle="modal" data-target="#exampleModal" @click="edit(item.id,'approved')">Approve</button>
                                      <button type="button" class="btn btn-danger" data-toggle="modal" data-target="#exampleModal1" @click="edit(item.id,'declined')">Decline</button>
                                      <!-- <button type="button" class="btn btn-success" @click="updateStatus(item.id, 'approved')">Approve</button> -->
                                      <!-- <button type="button" class="btn btn-danger" @click="updateStatus(item.id, 'declined')">Decline</button> -->
                                       <!-- <button type="button" class="btn btn-warning">Edit</button> -->
                                      </td>
                                      
                                    
                                </tr>
        </tbody>
      </table>
    </div>
  </div>

           <!-- Modal for approve -->


<!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        Are you sure you want to approve?
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" @click="updateStatus(this.itemId,this.status)">Confirm</button>
      </div>
    </div>
  </div>
</div>

          <!--Modal for decline request  -->

        <!-- Modal -->
<div class="modal fade" id="exampleModal1" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Are you sure you want to decline leave request?</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <input type="text" placeholder="Please add reason for rejection" class="form-control" v-model="comment"/>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-danger" @click="updateStatus(this.itemId,this.status)">Decline</button>
      </div>
    </div>
  </div>
</div>

</div>
</template>

<script>
import axios from 'axios';

export default {
    data () {
            return {
                leaveRequests : [],
                data:'',
                itemId:'',
                status:'',
                comment:''
            }
    },

     async mounted() {
         this.getLeaveRequests();
         
    },
           
    methods: {
    async getLeaveRequests() {
      try {
        //const userId = this.empId;
         const response=await axios.get(`http://localhost:8080/userData/api/getPendingLeaves`);
        console.log(response);
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

    async edit(id,status){
        this.status=status,
        this.itemId=id
    },

  // async updateStatus(id, status) {
  //     try {
  //       console.log(status);
  //       const response = await axios.put(`http://localhost:8080/userData/api/leave-requests/${id}`, { status: status });
  //       if (response.data.success) {
  //         const index = this.leaveRequests.findIndex(item => item.id === id);
  //         if (index !== -1) {
  //           this.leaveRequests[index].status = status;
  //         }
  //       }
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   },

  async updateStatus(id,status) {
   
  const updatedData = {
   status:status,
   comment:this.comment
  };
  try {
    const response = await axios.patch(`http://localhost:8080/userData/api/leave-requests/${id}`, updatedData);
    // Update the employee data on the client
    this.data = response.data;

    if(status=='approved') {
     window.alert('Leave request approved successfully!');
    }
    else {
     window.alert('Leave request declined successfully!');
    }
    // Alternatively, you can update your list of employees to reflect the changes
    // const index = this.todos.findIndex(todo => todo.id === id);
    // this.todos[index] = response.data;
  } catch (error) {
    console.error(error);
  }
}
  },
};
</script>


<style>
button{
    margin-right:10px
}
</style>