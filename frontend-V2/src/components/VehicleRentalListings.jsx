import { useEffect, useState } from "react";
import VehicleRentalListing from "./VehicleRentalListing";

const VehicleRentalListings = () => {
  const [vehicleRentals, setVehicleRentals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user ? user.token : null;

  useEffect(() => {
    const fetchVehicleRentals = async () => {
      try {
        setIsLoading(true);
        setError("");

        const response = await fetch("/api/vehicleRentals");

        if (!response.ok) {
          throw new Error("Failed to fetch vehicle rentals");
        }

        const data = await response.json();
        setVehicleRentals(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVehicleRentals();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/vehicleRentals/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete vehicle rental");
      }

      setVehicleRentals((prev) =>
        prev.filter(
          (vehicleRental) => (vehicleRental.id || vehicleRental._id) !== id,
        ),
      );
    } catch (err) {
      setError(err.message);
    }
  };

  if (isLoading) {
    return <p className="status-message">Loading vehicle rentals...</p>;
  }

  if (error) {
    return <p className="error-message">Error: {error}</p>;
  }

  if (vehicleRentals.length === 0) {
    return <p className="status-message">No vehicle rentals found.</p>;
  }

  return (
    <div className="rental-list">
      {vehicleRentals.map((vehicleRental) => (
        <VehicleRentalListing
          key={vehicleRental.id || vehicleRental._id}
          vehicleRental={vehicleRental}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
};

export default VehicleRentalListings;
