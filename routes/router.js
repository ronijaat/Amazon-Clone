const express = require("express");
const bcrypt = require("bcryptjs");

const router = express.Router();

const Products = require("../models/productsSchema");
const USER = require('../models/userSchema');
const authenticate = require("../middleware/authenticate");

//get all products
router.get("/getproducts",async(req,res)=>{
    try{
        const productdata = await Products.find({});
        // console.log(productdata);
        res.status(200).json(productdata);
    }
    catch(e){
        res.status(400).json(e);
    }
})

//get one products
router.get("/getproductsone/:id",async(req,res)=>{
    try{
        const {id} = req.params;
        const productdata = await Products.findOne({id:id});
        return res.status(200).json(productdata);
    }catch(e){
        res.status(400).json(e);
    }
})

//register user data
router.post("/register",async(req,res)=>{
    const {fname,email,mobile,password,cpassword} = req.body;
    if(!fname || !email || !mobile || !password || !cpassword){
        res.status(422).json({error:"fill all data"});
        console.log("no data available")
    };

    try{
        const preuser = await USER.findOne({email:email});
        if(preuser){
            res.status(422).json({error:"User is Already Present"});
        }
        else if(password!==cpassword){
            res.status(422).json({error:"Password Mismatch"});
        }
        else{
            const finalUser = new USER({
                fname,email,mobile,password,cpassword
            });

            // bcryptjs

            //password hashing process

            const storedata = await finalUser.save();
            console.log(storedata)

            res.status(201).json(storedata);
        }
    }catch(error){
        res.status(400).json(error);
    }
})

//
router.post("/login",async(req,res)=>{
    const {email,password} = req.body;
    if(!email || !password){
        res.status(400).json({error:"fill all data"})
    }

    try{
        const userlogin = await USER.findOne({email:email});
        // console.log(userlogin);

        if(userlogin){
            const isMatch = await bcrypt.compare(password, userlogin.password);
            // console.log(isMatch);

            //token generate
            const token = await userlogin.generateAuthToken();
            // console.log(token);

            //generate cookie
            res.cookie("Amazonweb",token,{
                expires:new Date(Date.now() + 900000),
                httpOnly:true
            })

            if(!isMatch){
                res.status(400).json({error:"invalid details on password matching"});
            }else{
                res.status(201).json(userlogin);
            }
        }else{
            res.status(400).json({error:"invalid details"});
        }
    }catch(error){
        res.status(400).json(error);
    }
})

//adding data into cart

router.post("/addcart/:id",authenticate,async(req,res)=>{
    try{
        console.log("perfect 6");
        const {id} = req.params;
        console.log("id",id);
        const cart = await Products.findOne({id:id});
        console.log("cart",cart);

        const UserContact = await USER.findOne({_id:req.userID});
        console.log("UserContact",UserContact);

        if(UserContact){
            const cartData = await UserContact.addcartData(cart);
            await UserContact.save();
            res.status(201).json(UserContact);
        }else{
            res.status(401).json({error:"invalid user"});
        }

    }catch(error){

    }
})

//get cart details 

router.get('/cartdetails',authenticate,async(req,res)=>{
    try{
        const buyuser = await USER.findOne({_id:req.userID});
        res.status(201).json(buyuser);
    }catch(error){
        console.log("error");
    }
})


//get valid user

router.get('/validuser',authenticate,async(req,res)=>{
    try{
        const validuserone = await USER.findOne({_id:req.userID});
        res.status(201).json(validuserone);
    }catch(error){
        console.log("error");
    }
})

// remove item from cart
router.delete('/remove/:id',authenticate,async(req,res)=>{
    try{
        const id = req.params.id;

        req.rootUser.carts = req.rootUser.carts.filter((cur)=>{
            return cur.id != id;
        })
        await req.rootUser.save();
        res.status(201).json(req.rootUser);
        console.log("item removed",req.rootUser);

    }catch{
        console.log("error");
        res.status(400).json(error);
    }
})

// for user logout

router.get("/logout",authenticate,async(req,res)=>{
    try{
        req.rootUser.tokens = req.rootUser.tokens.filter((curr)=>{
            return curr.token !== req.token;
        })
        res.clearCookie("Amazonweb",{path:"/"});
        await req.rootUser.save();
        res.status(201).json(req.rootUser.tokens);
        console.log("user logout")

    }catch(error){
        console.log(error);
    }
})


module.exports = router;