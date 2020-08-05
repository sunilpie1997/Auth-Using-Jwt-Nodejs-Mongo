const mongoose=require("mongoose");

const { ObjectId } = require("mongodb");


const validateEmail=require("../validators/validate_email").validateEmail;
/* embed profile */
const Profile=require("./profile").schema;



const userSchema=new mongoose.Schema({
    username:{
        type:String,
        unique:true,
        required:true,
        maxlength:[100,"max length supported for username is 100"],
        index:{unique:true},

    },
    password:{
        type:String,
        required:true,
        maxlength:[100,"max length supported for password is 100"],

    },

    email:{
        type:String,
        maxlength:[100,"max length supported for email is 100"],
        unique:true,
        required:true,
        index:{unique:true},
        validate:(value)=>{
            return validateEmail(value);
        }

    },

    is_active:{
        type:Boolean,
        default:true,
    },

    is_superuser:{
        type:Boolean,
        default:false,
        
    },

    date_updated:{
        type:Date,
        default:null,
        
    },

    profile:{
        type:Profile,
        default:null,
    },

    orders:{
        type:[ObjectId]
    }

    

});


/* compare hashed password with given password entered by user during login */




/* after saving update 'date_updated' field in user model 
userSchema.post('save',()=>{
    
    try{
    let now=Date.now();
    this.date_updated=now;
    }
    catch(err){
        console.log("err in saving 'date_updated' in user");
    }
});
*/
module.exports=mongoose.model('User',userSchema);