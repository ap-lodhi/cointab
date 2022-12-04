const jwt =require('jsonwebtoken')
const bcrypt =require('bcryptjs')
const crypto =require('crypto');
const userModel = require('./DataBace/schema');



const SECRET_KEY = "asderfgecx12derd";



// Register User 


async function signUp(req,res){
    let {name, email, password} =req.body;

    const user =await userModel.findOne({email})
 

    
    if(user){
        return res.send({
            response:"error",
            message:"User already register"
        })
    }else{
        password = bcrypt.hashSync(password, 10)
        await userModel.create({
            name,
            email,
            password,
            verifyEmailotp: crypto.randomInt(10000, 100000),
           
        })

        return res.send({
            response:"success",
            message:'user sign up Successfuly'
        })
    }

}



// login

async function login(req,res){
    const {email, password , attempts } =req.body
    // let {lastlogin} =req.body
    // let count = 0

    const userFound =await userModel.findOne({
        email
    })

    if(!userFound){
       return  res.status(400).send({
        response:"error",
        message:"email not  found"
       })
    }else{


        // if(count >=  5){
        //     return ({
        //         responce: " blocked",
        //         message:"user has been bloced for 24 hour"
        //     })
        // }
        let matched = bcrypt.compareSync(password , userFound.password)
        // console.log(userFound.password)
        if(matched){
            let {name ,email,verifiedEmail} = userFound
            const token = jwt.sign({name, email, verifiedEmail }, SECRET_KEY)
            res.send({
                count: 0,
                response:'success',
                message:'successfully loged in',
                token,
                user:{
                    name,
                    email,
                    verifiedEmail
                }
            })
        }else{
            
            return res.status(400).send(
              
                {
                response:'error',
                message:'Invalid Password',
              

            })
        }
        
    }
}

// get email id 

async function getEmail(req,res){
    const query = req.query
    let data  = await userModel.find()
    return res.send(JSON.stringify(data))
    

}


   

module.exports={signUp,login, getEmail}
