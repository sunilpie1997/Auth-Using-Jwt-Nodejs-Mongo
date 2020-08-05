const express=require("express");
const mongoose=require("mongoose");

/* seperate routes for user */
const userRouter=require('./routes/user');


const path=require("path");

/* accessing database uri of mongodb cloud */
const uri=require("./essentials/db_properties").uri;


/* creating express server */
const app=express();


/* connecting to mongodb database cloud  */
mongoose.connect(uri);

/*  on connecting to database */

mongoose.connection.on('connected', function(){  
  console.log("connected to Mongo cloud ");
});

/* if error while connecting */
mongoose.connection.on('error', function(err){
   console.log("Mongoose default connection has occured "+err+" error");
});

/* if disconnected */
mongoose.connection.on('disconnected', function(){
   console.log("Mongoose default connection is disconnected");
});

/* Returns middleware that only parses JSON and only looks at requests 
  where the Content-Type header matches the type option */
  app.use(express.json());

  

/* serve static files --->OPTIONAL:link to angular build files 
app.use(express.static(path.join(__dirname,"/ecommerce-app/build/")));



app.get("",(req,resp)=>{
  
        resp.sendFile(path.join(__dirname,'/ecommerce-app/build/index.html'),(err)=>{

    });
});

*/


app.use('/users',userRouter);

app.listen(8080,(err)=>{

  try{
  if(err) throw err;
    console.log("server is running on port 8080");
  }
  catch(err){
    console.log("error in starting server on port 8080");
  }
})