<template>
    <div>
        <div class="page-wrapper">
            <div class="content container-fluid">
                <div class="row">
                    <div class="col-xs-8">
                        <h4 class="page-title">Leave Requests</h4>
                    </div>
                    <!-- <div class="col-xs-4 text-right m-b-30">
                        <a href="#" class="btn btn-primary rounded pull-right" data-toggle="modal" data-target="#add_leave"><i class="fa fa-plus"></i> Add Leave</a>
                    </div> -->
                </div>

                <div class="row">
                    <div class="container">
                    <div class="col-md-12">
                        <div class="table-responsive">
                            <table class="table table-bordered custom-table m-b-0">
                                <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Employee</th>
                                    <th>Leave Type</th>
                                    <th>From</th>
                                    <th>To</th>
                                    <th>No of Days</th>
                                    <th>Reason</th>
                                    <!-- <th class="text-center">Status</th> -->
                                    <!-- <th class="text-right">Actions</th> -->
                                   <th> <div class="dropdown action-label">
                                        <div class="btn btn-white btn-sm rounded dropdown-toggle" data-toggle="dropdown">
                                           <b>Status </b> {{ selectedStatus === 'all' ? 'All' : selectedStatus }}
                                            <span class="caret"></span>
                                        </div>
                                        <ul class="dropdown-menu">
                                            <li @click="selectedStatus = 'all'"><a>All</a></li>
                                            <li @click="selectedStatus = 'pending'"><a>Pending</a></li>
                                            <li @click="selectedStatus = 'approved'"><a>Approved</a></li>
                                            <li @click="selectedStatus = 'declined'"><a>Declined</a></li>
                                        </ul>
                                        </div></th>

                                </tr>
                                </thead>
                                <tbody>
                                <tr v-for="(item, index) in filteredLeaveRequests" :key="item.id">
                                    <!--<td>-->
                                        <!--<a class="avatar">R</a>-->
                                        <!--<h2><a href="#">Richard Miles <span>Web Developer</span></a></h2>-->
                                    <!--</td>-->
                                    <td>{{ index + 1 }}</td>
                                    <td>{{ item.ename}}</td>
                                    <td>
                                        
                                            {{ item.LeaveType }}
                            

                                    </td>
                                    <td>{{ item.from }}</td>
                                    <td>{{ item.to}}</td>
                                    <td>{{ item.NDays}}</td>
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
                                    <!-- <td class="text-right">
                                        <div class="dropdown">
                                            <a href="#" class="action-icon dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i class="fa fa-ellipsis-v"></i></a>
                                            <ul class="dropdown-menu pull-right">
                                                <li><a href="#" title="Edit" data-toggle="modal" data-target="#edit_leave"><i class="fa fa-pencil m-r-5"></i> Edit</a></li>
                                                <li><a href="#" title="Decline" data-toggle="modal" data-target="#delete_approve"><i class="fa fa-trash-o m-r-5"></i> Delete</a></li>
                                            </ul>
                                        </div>
                                    </td> -->
                                </tr>
                                </tbody>
                            </table>
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
    //import moment from 'moment'
    export default{
        data () {
            return {
                leaveRequests : [],
                leaveTypes : [],
                leaveRequestDetails : {
                    leave_type: '',
                    from_date : '',
                    to_date : '',
                    leave_reason : '',
                },
                dayDiffrence : '',
                selectedStatus: 'all',
            }
        },
        async mounted() {
         this.getLeaveRequests();
         
    },
    computed: {
            filteredLeaveRequests() {
                if (this.selectedStatus === 'all') {
                return this.leaveRequests;
                } else {
                return this.leaveRequests.filter((request) => request.status === this.selectedStatus);
                }
            },
            },
           
    methods: {
    async getLeaveRequests() {
      try {
        //const userId = this.empId;
         const response=await axios.get(`http://localhost:8080/userData/api/getHistory`);
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
    }
    }
        
</script>

<style>

</style>