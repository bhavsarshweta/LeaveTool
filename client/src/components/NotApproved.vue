<template>
    <div>
        <div class="page-wrapper">
            <div class="content container-fluid">
                <div class="row">
                    <div class="col-xs-8">
                        <h4 class="page-title">Declined Leaves</h4>
                    </div>
                    <!-- <div class="col-xs-4 text-right m-b-30">
                        <a href="#" class="btn btn-primary rounded pull-right" data-toggle="modal" data-target="#add_leave"><i class="fa fa-plus"></i> Add Leave</a>
                    </div> -->
                </div>

                <div class="row">
                    <div class="col-md-12">
                        <div class="table-responsive">
                            <table class="table table-bordered">
                                <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Employee</th>
                                    <th>Leave Type</th>
                                    <th>From</th>
                                    <th>To</th>
                                    <th>No of Days</th>
                                    <th>Reason</th>
                                    <th class="text-center">Status</th>
                                    <!-- <th class="text-right">Actions</th> -->
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
                                    
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

    //import moment from 'moment'
    export default{
        data () {
            return {
                leaveRequests : [],
                leaveTypes : [],
                leaveRequestDetails : {
                    leave_type_id : '',
                    from_date : '',
                    to_date : '',
                    leave_reason : '',
                },
                dayDiffrence : ''
            }
        },


        async mounted() {
         this.getLeaveRequests();
         
    },
           
    methods: {
    async getLeaveRequests() {
      try {
        //const userId = this.empId;
         const response=await axios.get(`http://localhost:8080/userData/api/getDeclinedLeaves`);
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
    }
    }
        
        
</script>

<style>

</style>
    
    