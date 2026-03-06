const VehicleRental = require('../models/vehicleRentalModel');
const mongoose = require('mongoose');

// GET /api/vehicleRentals
const getAllVehicleRentals = async (req, res) => {
  try {
    const vehicles = await VehicleRental.find({});
    return res.status(200).json(vehicles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// POST /api/vehicleRentals
const createVehicleRental = async (req, res) => {
  const {
    vehicleModel,
    category,
    description,
    agency,
    contactEmail,
    location,
    dailyPrice,
    listingDate,
    availabilityStatus,
    bookingDeadline,
    insurancePolicy,
  } = req.body;

  try {
    const vehicle = await VehicleRental.create({
      vehicleModel,
      category,
      description,
      agency,
      contactEmail,
      location,
      dailyPrice,
      listingDate,
      availabilityStatus,
      bookingDeadline,
      insurancePolicy,
    });

    return res.status(201).json(vehicle);

  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};



// GET /api/vehicleRentals/:vehicleRentalId
const getVehicleRentalById = async (req, res) => {
  try {
    const { vehicleRentalId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(vehicleRentalId)) {
      return res.status(400).json({ error: 'Invalid vehicle rental id' });
    }

    const vehicle = await VehicleRental.findById(vehicleRentalId);

    if (!vehicle) {
      return res.status(404).json({ error: 'Vehicle rental not found' });
    }

    return res.status(200).json(vehicle);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
// PUT /api/vehicleRentals/:vehicleRentalId
const updateVehicleRental = async (req, res) => {
  try {
    const { vehicleRentalId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(vehicleRentalId)) {
      return res.status(400).json({ error: 'Invalid vehicle rental id' });
    }

    const updatedVehicleRental = await VehicleRental.findByIdAndUpdate(
      vehicleRentalId,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!updatedVehicleRental) {
      return res.status(404).json({ error: 'Vehicle rental not found' });
    }

    return res.status(200).json(updatedVehicleRental);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// DELETE /api/vehicleRentals/:vehicleRentalId
const deleteVehicleRental = async (req, res) => {
  try {
    const { vehicleRentalId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(vehicleRentalId)) {
      return res.status(400).json({ error: 'Invalid vehicle rental id' });
    }

    const deletedVehicleRental = await VehicleRental.findByIdAndDelete(vehicleRentalId);

    if (!deletedVehicleRental) {
      return res.status(404).json({ error: 'Vehicle rental not found' });
    }

    return res.status(200).json({
      message: "Vehicle rental deleted successfully",
      data: deletedVehicleRental
    });

  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getAllVehicleRentals,
  createVehicleRental,
  getVehicleRentalById,
  updateVehicleRental,
  deleteVehicleRental,
};
