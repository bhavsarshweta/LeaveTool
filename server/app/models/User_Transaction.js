const mongoose = require("mongoose");

const Transaction = mongoose.model(
    "Transaction",
    new mongoose.Schema({

        user:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },

        Name: {
            type: String,
            required: true,
        },
        GST: {
            type: String,
            required: true,
        },
        Payment_Type: {
            type: String,
            required: true,
        },
        Bill_Number: {
            type: Number,
            required: true,
        },
        bill_date: {
            type: Date,
            
        },
        Perticular: {
            type: String,
            required: true,
        },
        Basic_Amount: {
            type: Number,
            required: true,
        },
        GST_Amount: {
            type: Number,
            required: true,
        },
        TDS: {
            type: Number,
            required: true,
        },
        Total: {
            type: Number,
            required: true,
        },
        Advance_pay: {
            type: Number,
            required: true,
        },
        Payment_Amount: {
            type: Number,
            required: true,
        },
        GST_status: {
            type: String,
            required: true,
        },
        Bill_approved_by_Authoriser: {
            type: String,
        
        },
        Bill_approved_by_Verifier: {
            type: String,
            
        },
        Bill_approved_by_Admin: {
            type: String,
            
        },
        Location: {
            type: String,
            
        },
        Bill_image: {
            type: Buffer,
            
        }
        

    }
    
    )
);

// const Transaction = mongoose.model(
//         "Transaction",
//         new mongoose.Schema({

                  
//           type: mongoose.Schema.Types.ObjectId,
//           ref: "User"
      

//         })
// )

module.exports = Transaction;