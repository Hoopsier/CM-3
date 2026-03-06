import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const VehicleRentalPage = ({ isAuthenticated }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [vehicleRental, setVehicleRental] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
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
        setVehicleRental(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVehicleRental();
  }, [id]);

  const handleDelete = async () => {
    const confirmed = window.confirm("Delete this vehicle rental?");

    if (!confirmed) return;

    try {
      setError("");

      const response = await fetch(`/api/vehicleRentals/${id}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete vehicle rental");
      }

      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  if (isLoading) {
    return <p className="status-message">Loading vehicle rental...</p>;
  }

  if (error) {
    return <p className="error-message">Error: {error}</p>;
  }

  if (!vehicleRental) {
    return <p className="status-message">Vehicle rental not found.</p>;
  }

  return (
    <div className="rental-details">
      <h2>{vehicleRental.vehicleModel}</h2>
      <p>
        <strong>Category:</strong> {vehicleRental.category}
      </p>
      <p>
        <strong>Description:</strong> {vehicleRental.description}
      </p>
      <p>
        <strong>Agency:</strong> {vehicleRental.agency?.name}
      </p>
      <p>
        <strong>Agency Email:</strong> {vehicleRental.agency?.contactEmail}
      </p>
      <p>
        <strong>Fleet Size:</strong> {vehicleRental.agency?.fleetSize ?? "N/A"}
      </p>
      <p>
        <strong>Location:</strong> {vehicleRental.location?.city},{" "}
        {vehicleRental.location?.state}
      </p>
      <p>
        <strong>Daily Price:</strong> ${vehicleRental.dailyPrice}
      </p>
      <p>
        <strong>Status:</strong> {vehicleRental.availabilityStatus}
      </p>
      <p>
        <strong>Booking Deadline:</strong>{" "}
        {vehicleRental.bookingDeadline
          ? new Date(vehicleRental.bookingDeadline).toLocaleDateString()
          : "N/A"}
      </p>
      <p>
        <strong>Insurance Policy:</strong> {vehicleRental.insurancePolicy}
      </p>

      <div className="card-actions">
        {/* <Link to={`/edit-rental/${id}`} className="action-link secondary-link">
          Edit
        </Link>

        <button type="button" className="danger-button" onClick={handleDelete}>
          Delete
        </button> */}

        {isAuthenticated && (
          <div className="card-actions">
            <Link
              to={`/edit-rental/${id}`}
              className="action-link secondary-link"
            >
              Edit
            </Link>

            <button
              type="button"
              className="danger-button"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default VehicleRentalPage;
