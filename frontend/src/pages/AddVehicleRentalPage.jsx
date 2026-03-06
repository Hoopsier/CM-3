import { useState } from "react";
import { useNavigate } from "react-router-dom";
import VehicleRentalForm from "../components/VehicleRentalForm";
import {
  buildVehicleRentalPayload,
  initialFormData,
} from "../utils/vehicleRentalForm";

const AddVehicleRentalPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("agency.")) {
      const field = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        agency: {
          ...prev.agency,
          [field]: value,
        },
      }));
      return;
    }

    if (name.startsWith("location.")) {
      const field = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        location: {
          ...prev.location,
          [field]: value,
        },
      }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsSubmitting(true);
      setError("");

      const response = await fetch("/api/vehicleRentals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(buildVehicleRentalPayload(formData)),
      });

      if (!response.ok) {
        throw new Error("Failed to create vehicle rental");
      }

      const createdVehicleRental = await response.json();
      const rentalId = createdVehicleRental.id || createdVehicleRental._id;

      navigate(`/vehicleRentals/${rentalId}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {error && <p className="error-message">Error: {error}</p>}

      <VehicleRentalForm
        title="Add a New Vehicle Rental"
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        buttonText="Add Vehicle Rental"
        isSubmitting={isSubmitting}
      />
    </>
  );
};

export default AddVehicleRentalPage;