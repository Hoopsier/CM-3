const VehicleRentalForm = ({
  title,
  formData,
  handleChange,
  handleSubmit,
  buttonText,
  isSubmitting,
}) => {
  return (
    <div className="create">
      <h2>{title}</h2>

      <form onSubmit={handleSubmit}>
        <label>Vehicle Model:</label>
        <input
          type="text"
          name="vehicleModel"
          value={formData.vehicleModel}
          onChange={handleChange}
          required
        />

        <label>Category:</label>
        <select name="category" value={formData.category} onChange={handleChange}>
          <option value="Economy">Economy</option>
          <option value="Luxury">Luxury</option>
          <option value="SUV">SUV</option>
          <option value="Van">Van</option>
          <option value="Truck">Truck</option>
        </select>

        <label>Description:</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />

        <label>Agency Name:</label>
        <input
          type="text"
          name="agency.name"
          value={formData.agency.name}
          onChange={handleChange}
          required
        />

        <label>Agency Email:</label>
        <input
          type="email"
          name="agency.contactEmail"
          value={formData.agency.contactEmail}
          onChange={handleChange}
          required
        />

        <label>Fleet Size:</label>
        <input
          type="number"
          min="0"
          name="agency.fleetSize"
          value={formData.agency.fleetSize}
          onChange={handleChange}
        />

        <label>City:</label>
        <input
          type="text"
          name="location.city"
          value={formData.location.city}
          onChange={handleChange}
          required
        />

        <label>State:</label>
        <input
          type="text"
          name="location.state"
          value={formData.location.state}
          onChange={handleChange}
          required
        />

        <label>Daily Price:</label>
        <input
          type="number"
          step="0.01"
          min="0"
          name="dailyPrice"
          value={formData.dailyPrice}
          onChange={handleChange}
          required
        />

        <label>Availability Status:</label>
        <select
          name="availabilityStatus"
          value={formData.availabilityStatus}
          onChange={handleChange}
        >
          <option value="available">Available</option>
          <option value="rented">Rented</option>
          <option value="maintenance">Maintenance</option>
        </select>

        <label>Booking Deadline:</label>
        <input
          type="date"
          name="bookingDeadline"
          value={formData.bookingDeadline}
          onChange={handleChange}
        />

        <label>Insurance Policy:</label>
        <input
          type="text"
          name="insurancePolicy"
          value={formData.insurancePolicy}
          onChange={handleChange}
          required
        />

        <button disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : buttonText}
        </button>
      </form>
    </div>
  );
};

export default VehicleRentalForm;