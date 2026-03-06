import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import VehicleRentalForm from "../components/VehicleRentalForm";
import {
  buildVehicleRentalPayload,
  initialFormData,
  mapVehicleRentalToFormData,
} from "../utils/vehicleRentalForm";

const EditVehicleRentalPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(initialFormData);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user ? user.token : null;
  useEffect(() => {
    const fetchVehicleRental = async () => {
      try {
        setIsLoading(true);
        setError("");

        const response = await fetch(`/api/vehicleRentals/${id}`);

        if (!response.ok) {
          throw new Error("Failed to fetch vehicle rental");
        }

        const data = await response.json();
        setFormData(mapVehicleRentalToFormData(data));
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVehicleRental();
  }, [id]);

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

      const response = await fetch(`/api/vehicleRentals/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(buildVehicleRentalPayload(formData)),
      });

      if (!response.ok) {
        throw new Error("Failed to update vehicle rental");
      }

      navigate(`/vehicleRentals/${id}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <p className="status-message">Loading vehicle rental...</p>;
  }

  return (
    <>
      {error && <p className="error-message">Error: {error}</p>}

      <VehicleRentalForm
        title="Update Vehicle Rental"
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        buttonText="Update Vehicle Rental"
        isSubmitting={isSubmitting}
      />
    </>
  );
};

export default EditVehicleRentalPage;
