import { Link } from "react-router-dom";

const VehicleRentalListing = ({ vehicleRental, onDelete }) => {
  const rentalId = vehicleRental.id || vehicleRental._id;

  const handleDelete = async () => {
    const confirmed = window.confirm(
      `Delete ${vehicleRental.vehicleModel}? This action cannot be undone.`
    );

    if (!confirmed) return;

    await onDelete(rentalId);
  };

  return (
    <div className="rental-preview">
      <Link to={`/vehicleRentals/${rentalId}`}>
        <h2>{vehicleRental.vehicleModel}</h2>
      </Link>

      <p>Category: {vehicleRental.category}</p>
      <p>City: {vehicleRental.location?.city}</p>
      <p>State: {vehicleRental.location?.state}</p>
      <p>Daily Price: ${vehicleRental.dailyPrice}</p>
      <p>Status: {vehicleRental.availabilityStatus}</p>
      <p>Agency: {vehicleRental.agency?.name}</p>

      <div className="card-actions">
        <Link
          to={`/edit-rental/${rentalId}`}
          className="action-link secondary-link"
        >
          Edit
        </Link>

        <button type="button" className="danger-button" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default VehicleRentalListing;