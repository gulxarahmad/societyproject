const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');

const dotenv = require('dotenv');

const cors = require('cors');
const Routes = require('./Routes/signuproute');
const loginRoute = require('./Routes/loginroute');

const notFound = require('./Data/Middleware/ErrorHandle');
const errorHandle = require('./Data/Middleware/ErrorHandle');


const BookingForm = require('./Models/UserForm');

const PORT = 3009

const app = express();
dotenv.config();

const storageEngine = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null, "./public/image");
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname);
    }
});

const url = 'mongodb+srv://gullosheikh:Gullo@butt1@cluster0.cani3.mongodb.net/Products?retryWrites=true&w=majority'
mongoose.connect(url, {
    useNewUrlParser: true

})

app.use(express.json());
app.use(cors());
app.use(express.static('public'));




const upload = multer({storage:storageEngine});


app.post('/uploads', upload.single('image'), (req,res)=>{

    console.log('Upload is calling');
    console.log(req.body.registrationNumber);

   const imageURL = "http://localhost:3009/image/"+req.file.filename;
   console.log(imageURL);

    const newBooking = BookingForm({
        registrationNumber:req.body.registrationNumber,
        plotNo:req.body.plotNo,
        street:req.body.street,
        plotSize:req.body.plotSize,
        type:req.body.type,
        clientName:req.body.clientName,
        fhName:req.body.fhName,
        residentialAddress:req.body.residentialAddress,
        permanentAddress:req.body.permanentAddress,
        contactNumber:req.body.contactNumber,
        landLine:req.body.landLine,
        email:req.body.email,
        occupation:req.body.occupation,
        age:req.body.age,
        nationality:req.body.nationality,
        clientCNIC:req.body.clientCNIC,
        nomineeName:req.body.nomineeName,
        nomineeRelation:req.body.nomineeRelation,
        nomineeCNIC:req.body.nomineeCNIC,
        nomineeAddress:req.body.nomineeAddress,
        totalPlotCost:req.body.totalPlotCost,
        downPayment:req.body.downPayment,
        bankOrDraft:req.body.bankOrDraft,
        date: req.body.date,
        drawnOn:req.body.drawnOn,
        image:imageURL

    });

    try{
        newBooking.save();
    }
    catch(err){
        console.log('Something is wrong');
    }

})

app.get('/readbookings',async(req,res)=>{

    await BookingForm.find({},(err,result)=>{
        if(err){
            res.send("Error in loading data")
        }
        else{
            res.send(result);
        }
    })
})

app.delete('/deletebooking/:id',async(req,res)=>{
    const id = req.params.id;
    await BookingForm.findByIdAndDelete(id).exec()
})


app.use('/signup',Routes);
app.use('/login',loginRoute);




app.listen(PORT, ()=>{
    console.log('Server is running');
})

