
const transaction = require('../models/User_Transaction')
const User = require('../models/user.model')
//const Transaction = require('../models/User_Transaction')
const LeaveRequest = require('../models/Leave.model');

exports.allAccess = (req, res) => {
  res.status(200).send("My name is rahul....");
};




// All user action starts here


//  Store 
exports.Userstore = async (req, res) => {

 
  
  try{
      const userId = req.userId;
       
      const data = new transaction({
        Name:                   req.body.Name,
        GST:                    req.body.GST,
        Payment_Type:           req.body.Payment_Type,
        Bill_Number:            req.body.Bill_Number,
        bill_date:              req.body.bill_date,
        Perticular:             req.body.Perticular,
        Basic_Amount:           req.body.Basic_Amount,
        GST_Amount:             req.body.GST_Amount,
        TDS:                    req.body.TDS,
        Total:                  req.body.Total,
        Advance_pay:            req.body.Advance_pay,
        Payment_Amount:         req.body.Payment_Amount,
        GST_status:             req.body.GST_status,
        Location:               req.body.Location,
        Bill_image:                    req.body.Bill_image
      })
         
      // save data
      const savedTransaction = await data.save();

      // Set transaction ref id in user schema 
      const updatedUser = await User.findByIdAndUpdate(userId, { TransactionRef: savedTransaction._id}, { new: true, useFindAndModify: false});
       
      res.status(201).json({
        transaction : savedTransaction,
        user: updatedUser
      });
 
  } catch(error){
      console.error(error);
      res.status(500).json({error: 'server error'})
  }
 
};

//  get all
var ObjectId = require('mongodb').ObjectID;
exports.GetUserData = (req, res) => {
  
  try{
          const Id = (req.userId);
       transaction.find({user :{'_id': ObjectId(Id)}})
       .populate('user')
       .exec((err, data) =>{
        if(err){
          console.log(err);
        }else{
          res.json({data})
        }
       })


  }catch(error){
    console.error(error);
    res.status(500).json({error: 'server error'})
  }

};

//  find specific user and update 
// exports.UpdateTransactionDetails = async (req, res) => {
  
//   try{

//     const updatedTransaction = await Transaction.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       {new: true, runValidators: true, useFindAndModify: false}
//     );
//     if(!updatedTransaction){
//       return res.status(404).json({message: 'Transaction not found'});
//     }
//      res.json(updatedTransaction);
//   }catch(error){
//     res.status(500).json({error: 'server error'});
//   }

// };


//Handle POST request to add a new leave request
exports.addLeaveRequest= async (req, res) => {
  try {
    //  user_id = ObjectId(Id);
    const { from, to, NDays, RDays, leave_reason,status,LeaveType } = req.body;
    //req.body
    // Create a new LeaveRequest object
    const newLeaveRequest = new LeaveRequest({
      user_id: req.params.id,
      from,
      to,
      NDays,
      RDays,
      leave_reason,
      status,
      LeaveType
    });

    // Save the new LeaveRequest object to the database
    const savedLeaveRequest = await newLeaveRequest.save();

    res.json(savedLeaveRequest);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};



//  find specific user and update 

exports.UpdateUserDetails = async (req, res) => {
  
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const options = { new: true };

    const result = await User.findByIdAndUpdate(
        id, updatedData, options
    )

    res.send(result)
}
catch (error) {
    res.status(400).json({ message: error.message })
}
};



//  find specific user and update 

exports.UpdateLeaveDetails = async (req, res) => {
  
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const options = { new: true };

    const result = await LeaveRequest.findByIdAndUpdate(
        id, updatedData, options
    )

    res.send(result)
}
catch (error) {
    res.status(400).json({ message: error.message })
}
};





//find specific user
exports.FindSpecificUser = async (req, res) => {
   try{
    //const id = (req.userId);
    // const user = await User.findById( {'_id': ObjectId(id)} );
    const empId = req.params.empId;
    const user = await User.findById(empId);
     if(!user){
      return res.status(404).json({message: 'User not found'});
     }
     res.json(user)
   } catch(error){
    res.status(500).json({ message: 'error'});
   }
  
};

exports.FindAllLeaves = async (req, res) => {
  try {
    //const id = req.params.id;
    const leaveRequests = await LeaveRequest.find().populate('user_id');;
    res.status(200).json({ leaveRequests });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
 
};
exports.FindApprovedLeaves = async (req, res) => {
  try {
    const leaveRequests = await LeaveRequest.find({ status: 'approved' }).populate('user_id');
    res.status(200).json({ leaveRequests });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.FindPendingLeaves = async (req, res) => {
  try {
    const leaveRequests = await LeaveRequest.find({ status: 'pending' }).populate('user_id');
    res.status(200).json({ leaveRequests });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.FindDeclinedLeaves = async (req, res) => {
  try {
    const leaveRequests = await LeaveRequest.find({ status: 'declined' }).populate('user_id');
    res.status(200).json({ leaveRequests });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get leave history by id

exports.GetUserLeaveHistory = async (req, res) => {
  try {
    const id = req.params.id;
    const leaveRequests = await LeaveRequest.find({ user_id: ObjectId(id) }).populate('user_id');
    res.status(200).json({ leaveRequests });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.DeleteLeaveRequest = async (req, res) => {
  
  try{
      
     const deleteLeave  = await LeaveRequest.findByIdAndDelete(req.params.id);
     if(!deleteLeave){
      return res.status(404).json({message: 'The leave Id was not found'})
     }
     res.json("Leave Request Deleted")

  }catch(error){
    res.status(500).json({message: 'error'})
  }
  
};

exports.actionOnLeaveRequest = async (req, res) => {
  
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const options = { new: true };

    const result = await LeaveRequest.findByIdAndUpdate(
        id, updatedData, options
    )

    res.send(result)
}
catch (error) {
    res.status(400).json({ message: error.message })
}
};


// All user action ends here

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};


  // post method starts here
  
  // rout.post('/post', async (req, res) =>{
  //   const data = new transaction({

  //     Name:                   req.body.Name,
  //     GST:                    req.body.GST,
  //     Payment_Type:           req.body.Payment_Type,
  //     Bill_Number:            req.body.Bill_Number,
  //     bill_date:              req.body.bill_date,
  //     Perticular:             req.body.Perticular,
  //     Basic_Amount:           req.body.Basic_Amount,
  //     GST_Amount:             req.body.GST_Amount,
  //     TDS:                    req.body.TDS,
  //     Total:                  req.body.Total,
  //     Advance_pay:            req.body.Advance_pay,
  //     Payment_Amount:         req.body.Payment_Amount,
  //     GST_status:             req.body.GST_status,
  //     Bill_approved_by_Authoriser:   req.body.Bill_approved_by_Authoriser,
  //     Bill_approved_by_Verifier:     req.bosy.Bill_approved_by_Verifier,
  //     Bill_approved_by_Admin:        req.body.Bill_approved_by_Admin,
  //     Location:                      req.bosy.Location,
  //     Bill_image:                    req.body.Bill_image

  //   })

  //   try{
  //     const dataToSave = await data.save();
  //     res.status(200).json(dataToSave)
  //   }
  //   catch(error) {
  //    res.status(400).json({message: error.message})
  //   }

  // })

    // post method starts here

  //   const store = (req, res, next) =>{
  //       const body = req.body;
        
  //       let data = new transaction({
  //         Name:                   req.body.Name,
  //         GST:                    req.body.GST,
  //         Payment_Type:           req.body.Payment_Type,
  //         Bill_Number:            req.body.Bill_Number,
  //         bill_date:              req.body.bill_date,
  //         Perticular:             req.body.Perticular,
  //         Basic_Amount:           req.body.Basic_Amount,
  //         GST_Amount:             req.body.GST_Amount,
  //         TDS:                    req.body.TDS,
  //         Total:                  req.body.Total,
  //         Advance_pay:            req.body.Advance_pay,
  //         Payment_Amount:         req.body.Payment_Amount,
  //         GST_status:             req.body.GST_status,
  //         Location:               req.body.Location,
  //         Bill_image:                    req.body.Bill_image
  //       })

  //       data.save()
  //       .then(() =>{
  //         res.json({message: 'Transaction inserted successfully'})
  //       })
  //       .catch(error =>{
  //         res.json({message: error})
  //       })

  //   }

    
  
  
  //  module.exports ={
  //   store
  //  }