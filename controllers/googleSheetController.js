const { GoogleSpreadsheet } = require('google-spreadsheet');
const catchAsyncFunc = require('../utils/catchAsyncFuncs');
const credentials = require("./keys/zip-project-325807-afdd1d2b80ea.json")
const { promisify } = require('util');
const AppError = require('./../utils/appError');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
// Initialize the sheet - doc ID is the long id in the sheets URL
const doc = new GoogleSpreadsheet('1YQn8eirv693OrOoUauSTSNBv7hi7CSDBLs36dDrtB40');


exports.updatGoogleSheet=catchAsyncFunc(async(req,res, next)=>{
    // Initialize Auth - see https://theoephraim.github.io/node-google-spreadsheet/#/getting-started/authentication
await doc.useServiceAccountAuth(credentials);
await doc.loadInfo(); // loads document properties and worksheets
var now = new Date();
var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
var day = days[ now.getDay() ];
let token;
const sheet = doc.sheetsByTitle[ day ]

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }
    
  if(token){
    const decodedtoken = await promisify(jwt.verify)(
        token,
        process.env.JWT_SECRET
      );
    
      // Check if user still exist
      const loggedUser = await User.findById(decodedtoken.id).select("user_name user_email_address user_phone visitor newsletter ");
      req.body.user_email_address=loggedUser.user_email_address
      req.body.user_phone = loggedUser.user_phone;
      req.body.user_name=loggedUser.user_name;
      req.body.visitor=loggedUser.visitor;
      req.body.newsletter=loggedUser.newsletter



    if(sheet){
        const rows = await sheet.getRows();
        
        let registerd = false;
        await rows.map(e =>{
            for (const [key, value] of Object.entries(e)) {
                if(key==="Email Address" && value ===req.body.user_email_address){
                    // console.log(`${key}: ${value}`);
                    // console.log(`${key}: ${req.body.user_email_address}`);
                    registerd = true
                }
            }
            
        })
        if(!registerd){
            
            await sheet.addRow({ "Full Name": req.body.user_name, "Email Address": req.body.user_email_address, "Phone Number":req.body.user_phone, "Visitor":req.body.visitor, "Recieve News letter":req.body.newsletter});
        }
       

    }else{
        const newSheet = await doc.addSheet({ title:day, headerValues: ["Full Name", "Email Address", "Phone Number", "Visitor", "Recieve News letter"] });
        await newSheet.addRow({ "Full Name": req.body.user_name, "Email Address": req.body.user_email_address, "Phone Number":req.body.user_phone, "Visitor":req.body.visitor, "Recieve News letter":req.body.newsletter});
    }
  }else{

    next(new AppError('Could not verify your user token', 401));
  }


next()
})


