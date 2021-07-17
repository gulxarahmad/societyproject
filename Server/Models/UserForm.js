const mongoose = require('mongoose');

const BookingForm = new mongoose.Schema({
    
    registrationNumber:String,
    plotNo:Number,
    street:String,
    plotSize:Number,
    type:String,
    clientName:String,
    fhName:String,
    residentialAddress:String,
    permanentAddress:String,
    contactNumber:Number,
    landLine:Number,
    email:String,
    occupation:String,
    age:Number,
    nationality:String,
    clientCNIC:Number,
    nomineeName:String,
    nomineeRelation:String,
    nomineeCNIC:Number,
    nomineeAddress:String,
    totalPlotCost:Number,
    downPayment:Number,
    bankOrDraft:String,
    date: String,
    drawnOn:String,
    image:String
})

const BookingForms = mongoose.model("BookingData",BookingForm);
module.exports = BookingForms