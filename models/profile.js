const mongoose=require("mongoose");

/* creating schema  */
const profileSchema=new mongoose.Schema({
    
    first_name:{
        type:String,
        maxlength:[100,"max length supported for first name is 100"],
        default:null,
    },

    last_name:{
        type:String,
        maxlength:[100,"max length supported for last name is 100"],
        default:null,
    },

    contact_no:{
        type:String,
        maxlength:[15,"max length supported for contact no is 15"],
        default:null,


    },


});

module.exports=mongoose.model('Profile',profileSchema);