const dataBase = require("../model/Model")

exports.bookFlight = async (req,res)=>{
    try{

        const user = req.body
        const check = user.email
        const flightId = await dataBase.find()

        const userDatas = dataBase({
            name: user.name.toLowerCase(),
            email: user.email.toLowerCase(),
            currentLocation: user.currentLocation.toLowerCase(),
            takeOffTime: user.takeOffTime,
            destination: user.destination.toLowerCase(),
            Airport: user.Airport.toLowerCase(),
            FlightId: flightId.length +1
        })

        const regEx = /^([a-zA-Z0-9]+)@([a-zA-Z]+)\.([a-zA-Z]{2,5})$/

        const existing = await dataBase.findOne({email:check})
        const bookFlight = await dataBase.create(userDatas)

        if(!regEx.test(check)){
            res.status(400).json({
                message: "Wrong email format"
            })
        }
       else if(existing){
            res.status(400).json({
                message: `hi ${user.name}, you already booked a trip to ${existing.destination} click the update on your flight ticket if you would love to change destinations`
            })
        }else{
            res.status(400).json({
                message: `hi ${user.name}, your trip to ${user.TravelTo} have been successfully booked`,
                details: bookFlight
            })
        }
        


    }catch(err){
        res.status(500).json(err.message)
    }
}

exports.getAllByAirports = async (req,res)=>{
   try {
    const airport = req.params.Airport
    const airports = airport.toLowerCase()
    const geAllUser = await dataBase.find({Airport: airports})

    if (geAllUser) {
       
        res.status(200).json({
            message: `here are all the flight booked on ${airports}`,
            clients: geAllUser
        })
    }
   } catch (error) {
    res.status(400).json(error.message)
   }
}
exports.getAllByDestinations = async (req,res)=>{
  try {
    const locate = req.params.destination
    const destinations = locate.toLowerCase()
    const getAllUser = await dataBase.find({destination: destinations})

    if (getAllUser) {
        res.status(200).json({
            message: `here are all the client travelling to ${locate}`,
            clients: getAllUser
        })
    }
  } catch (error) {
    res.status(400).json(error.message)
  }
}

exports.updateByFlightId = async (req,res)=>{
try {
    const id = req.params.FlightId

    const userOldDetail = await dataBase.findOne({FlightId:id})

    const body = req.body

    const userNewDetails = {
        Airport: body.Airport,
        destination: body.destination,
        currentLocation: body.currentLocation
    }

    const updates = await dataBase.findOneAndUpdate(userOldDetail, userNewDetails, {new: true})

    if (updates) {
        res.status(404).json({
            message:"Updated user successfully",
            data: updates
        })
    }
} catch (error) {
    res.status(400).json(error.message)
}
}

exports.deleteByFlightId = async (req,res)=>{
    try {
        const id = req.params.FlightId

    const deleteUser = await dataBase.findOne({FlightId:id})

    const deletes = await dataBase.findByIdAndDelete(deleteUser)

    if (deletes) {
        res.status(404).json({
            message:"deleted user successfully",
            deleteUser
        })
    }
    } catch (error) {
        res.status(400).json(error.message)
    }
}