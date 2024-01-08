const mongoose = require('mongoose')
const  {DateTime} = require("luxon")

const dateAndTime = DateTime.now()

const bookedDate = dateAndTime.toFormat("yyyy-MM-dd")
const bookedTime = dateAndTime.toFormat("HH:mm:ss")


const datas = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "please enter your name"]
    },
    email: {
        type: String,
        required: [true, "please enter your email"]
    },
    currentLocation: {
        type: String,
        required: [true, "please enter your destination"]
    },
    takeOffTime: {
        type: String,
        enum: ["6:00AM", "9:00AM", "12:00PM", "3:00PM", "6:00PM"],
        required: [true, "enter your time"]
    },
    destination: {
        type: String,
        required: [true, "please enter your location"]
    },
    Airport: {
        type: String,
        required: [true, "please enter Airport Name"]
    },
    FlightId: {
        type: Number,
    },
    bookedDate: {
        type: String,
        default: bookedDate,
    },
    bookedTime: {
        type: String,
        default: bookedTime,
    }

})



const dataBase = mongoose.model("Transportation", datas)

module.exports = dataBase