const fs=require("fs");

const jwt=require("jsonwebtoken");
const { response } = require("express");

const cert=fs.readFileSync("private_key.ppk");

exports.authenticateToken=function (req, res, next) {

    // Gather the jwt access token from the request header
    const authHeader = req.headers['authorization'];

    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.status(400).send("auth credentials not provided") // if there isn't any token
  
    try{
    jwt.verify(token,cert,(err,decoded) => {
      
      if (err) res.status(400).send('this token expired or is invalid');

      else
      {
      req.username = decoded.username;

      next(); // pass the execution off to whatever request the client intended
      }
    });

        }
        catch(err){
            next(err);
        }

  }