***********Project description *************

https://github.com/sunilpie1997/authenticate_using_jwt_nodejs.git

*check steps.txt to get started with this*

This project shows how to  safely store password and at the same time authenticate users 
using json web token.

Benefit:a) no repeated database lookups for authenticating users in multiple requests
            except for the first time

        b)no need to maintain session on server(nodejs).


Note:the backend nodejs server uses MONGODB CLOUD.
    So,make sure to create your account on mongodb cloud and get connection uri,
    after clicking 'connect' tab. 

Note:private_key is generated using 'puttygen' tool.
    You can create yours.

    Benifit:json web token are created after signing with this key.
        so,that only those requests succeed that contain tokens
        in 'Authorization' header and ****ARE SIGNED BY THIS 'private_key'****


Note:'essentials' folder contain 2 files:
     
     a) db_properties->connection uri for mongodb cloud.ENTER CORRECT PASSWORD AND DATABASE_NAME after creating  user on MONGODB CLOUD.

     b)auth-user->contains middleware 'authenticateToken' function to verify token and extract username
     and execute database search for that username.

     ex:  router.get('/',authenticateToken,async (req,resp)=>{.......});


Note:I have used 'bcrypt' module to hash password before storing user details in DATABASE.

     and used 'bcrypt.compare' function to compare password entered by user with above 'hashed password'
     for authentication. 


