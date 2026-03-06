export const initialFormData = {
  vehicleModel: '',
  category: 'Economy',
  description: '',
  agency: {
    name: '',
    contactEmail: '',
    fleetSize: '',
  },
  location: {
    city: '',
    state: '',
  },
  dailyPrice: '',
  availabilityStatus: 'available',
  bookingDeadline: '',
  insurancePolicy: '',
};

export const buildVehicleRentalPayload = (formData) => ({
  vehicleModel: formData.vehicleModel.trim(),
  category: formData.category,
  description: formData.description.trim(),
  agency: {
    name: formData.agency.name.trim(),
    contactEmail: formData.agency.contactEmail.trim(),
    fleetSize:
      formData.agency.fleetSize === ''
        ? undefined
        : Number(formData.agency.fleetSize),
  },
  location: {
    city: formData.location.city.trim(),
    state: formData.location.state.trim(),
  },
  dailyPrice: Number(formData.dailyPrice),
  availabilityStatus: formData.availabilityStatus,
  bookingDeadline: formData.bookingDeadline || undefined,
  insurancePolicy: formData.insurancePolicy.trim(),
});

export const mapVehicleRentalToFormData = (vehicleRental) => ({
  vehicleModel: vehicleRental.vehicleModel || '',
  category: vehicleRental.category || 'Economy',
  description: vehicleRental.description || '',
  agency: {
    name: vehicleRental.agency?.name || '',
    contactEmail: vehicleRental.agency?.contactEmail || '',
    fleetSize: vehicleRental.agency?.fleetSize ?? '',
  },
  location: {
    city: vehicleRental.location?.city || '',
    state: vehicleRental.location?.state || '',
  },
  dailyPrice: vehicleRental.dailyPrice ?? '',
  availabilityStatus: vehicleRental.availabilityStatus || 'available',
  bookingDeadline: vehicleRental.bookingDeadline
    ? new Date(vehicleRental.bookingDeadline).toISOString().slice(0, 10)
    : '',
  insurancePolicy: vehicleRental.insurancePolicy || '',
});
