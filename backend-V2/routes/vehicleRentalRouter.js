const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.js')
const {
  getAllVehicleRentals,
  createVehicleRental,
  getVehicleRentalById,
  updateVehicleRental,
  deleteVehicleRental,
} = require('../controllers/vehicleRentalControllers');

// GET /api/vehicleRentals
router.get('/', getAllVehicleRentals);


// GET /api/vehicleRentals/:vehicleRentalId
router.get('/:vehicleRentalId', getVehicleRentalById);

router.use(auth)

// POST /api/vehicleRentals
router.post('/', createVehicleRental);

// PUT /api/vehicleRentals/:vehicleRentalId
router.put('/:vehicleRentalId', updateVehicleRental);

// DELETE /api/vehicleRentals/:vehicleRentalId
router.delete('/:vehicleRentalId', deleteVehicleRental);

module.exports = router;
