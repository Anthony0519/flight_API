const express = require("express")

const router = express.Router()

const {bookFlight, deleteByFlightId, updateByFlightId, getAllByDestinations, getAllByAirports} = require("../controller/controller")

router.post("/myflight", bookFlight)
router.get("/Destinations/:destination", getAllByDestinations)
router.get("/airports/:Airport", getAllByAirports)
router.put("/updateflight/:FlightId", updateByFlightId)
router.delete("/cancelflight/:FlightId", deleteByFlightId)

module.exports = router