import { useState } from "react";
import { useNavigate } from "react-router-dom";
import VehicleRentalForm from "../components/VehicleRentalForm";
import {
  buildVehicleRentalPayload,
  initialFormData,
} from "../utils/vehicleRentalForm";

const parseResponse = async (response) => {
  const contentType = response.headers.get("content-type") || "";

  if (contentType.includes("application/json")) {
    return response.json();
  }

  return response.text();
};

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

      const result = await parseResponse(response);

      if (!response.ok) {
        const message =
          typeof result === "string"
            ? result
            : result?.message || "Failed to create vehicle rental";

        throw new Error(message);
      }

      const rentalId = result?.id || result?._id;

      if (!rentalId) {
        throw new Error(
          "Vehicle rental was created, but the response did not include an id."
        );
      }

      navigate(`/vehicleRentals/${rentalId}`);
    } catch (err) {
      setError(err.message || "Something went wrong while creating the vehicle rental.");
      console.error("AddVehicleRentalPage submit error:", err);
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