/* bcrypt settings */
/* using bcrypt to hash password before saving in  DB */
const bcrypt = require('bcrypt');
const saltRounds = 10;
/* ***********************************************************/

/* access jwt library for generating token,signing them and verifying them */
var jwt = require('jsonwebtoken');

/* reading private key file for signing json web token  */
const fs=require("fs");


 /*  access middleware function for verifying token and authenticare user */
 
const authenticateToken=require("../essentials/auth-user").authenticateToken;
const express=require("express");

/* using express router */
const router=express.Router();



/* access user model defined in 'models/user.js' file */
const User=require("../models/user");

/* getting user details after user sends token in authorization header:
NOTE:use postman tool for this 

if user does not send,appropriate message is shown to user
*/

router.get('/',authenticateToken,async (req,resp)=>{

    try{
        /* 'authenticateToken' middleware function adds username to request after verifing user */
        const username=req.username;

        if(username!=null && username!=undefined){

            /* use async/await for better readablity instead of .then() */
            const user=await User.findOne({"username":username});

            if(user)
            /* extra protection :)) */
             resp.status(200).json(user);

             else

             resp.status(200).send("no user exists with given username");
        }
        else

        throw new Error("enter valid username");
    }
    /* all the errors generated including database error are catched and app. message is shown to user with
    proper error status codes
     */
    catch(err){
        resp.status(400).send(err.message);
    }
});


/*create user */
router.post('/create', async (req,resp)=>{
    try{
        /* only below three fields are required accordind to 'userSchema' so...... */

            let new_user=new User({
                username:req.body.username,
                email:req.body.email,
                password:req.body.password,

            });
                
               const hash = await bcrypt.hash(new_user.password, saltRounds);
                
               /* replace plain password with hashed password  */
                new_user.password=hash;

                /* save user */
                const user= await new_user.save();
                resp.json(user);
    }
    catch(err){
        resp.status(400).send(err.message);
    }
});

  /* authenticate user */

router.post('/auth',async (req,resp)=>{

    try{
    const username=req.body.username;
    const password=req.body.password;

    /* check for null and undefined */
    if((username==null || username==undefined )||(password==null || password==undefined)){
        throw new Error("authentication credentials were not provided");
    }

    const user=await User.findOne({"username":username});
    
   /* compare password entered with hashed password in DB */
    const result= await bcrypt.compare(password,user.password);
    
    /* check if matches or not */
    if(result==true){
        /* issue json web token */

        var privateKey = await fs.readFileSync('private_key.ppk');
        
        /* construct and sign tokenBody */
        jwt.sign({ "username": user.username,"email":user.email,"exp": Math.floor(Date.now() / 1000) + (2*60 * 60) },
            privateKey, function(err, token) {
        
            if(err) throw new Error(err);

            /* convert into json output  */
            const tokenBody={"access_token":token};
            resp.status(200).json(tokenBody);
          });

    }
    else
    throw new Error("invalid username and password");

    }

    catch(err){
        resp.status(400).send(err.message);
    }
});

/* exporting router object is necessary */
module.exports=router