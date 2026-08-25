import React, { useState } from "react";

export default function OfferRide({ onPostRide }) {
  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState({
    pickup: "",
    dropoff: "",
    date: "",
    time: "",
    seats: "2",
    vehicle: "car",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitRide = (e) => {
    e.preventDefault();

    const newRide = {
      id: Date.now(),

      name: "You",
      initials: "YO",
      role: "Student",

      pickup: form.pickup,
      dropoff: form.dropoff,
      date: form.date,
      time: form.time,

      vehicle:
        form.vehicle.charAt(0).toUpperCase() +
        form.vehicle.slice(1),

      seats: Number(form.seats),

      score: 100,
      rating: 5.0,
      trips: 0,

      accent: "coral",
      rotation: "-0.8deg",
    };

    onPostRide(newRide);

    setSubmitted(true);

    setForm({
      pickup: "",
      dropoff: "",
      date: "",
      time: "",
      seats: "2",
      vehicle: "car",
    });
  };

  return (
    <main className="page-shell">

      <section className="page-heading offer-heading">
        <div>
          <span className="eyebrow">OFFER A RIDE</span>

          <h1>
            Got a seat?
            <br />
            <em>Share the hop.</em>
          </h1>

          <p>
            Add your commute and let people on your campus
            discover your route.
          </p>
        </div>
      </section>

      <section className="offer-layout">

        <form
          className="offer-form"
          onSubmit={submitRide}
        >

          {/* ROUTE */}

          <div className="form-section">
            <span className="form-number">01</span>

            <div>
              <h3>Your route</h3>

              <label>
                Pickup location

                <input
                  name="pickup"
                  value={form.pickup}
                  onChange={handleChange}
                  placeholder="e.g. BTM Layout"
                  required
                />
              </label>

              <label>
                Destination

                <input
                  name="dropoff"
                  value={form.dropoff}
                  onChange={handleChange}
                  placeholder="e.g. BMS College"
                  required
                />
              </label>
            </div>
          </div>

          {/* DATE + TIME */}

          <div className="form-section">
            <span className="form-number">02</span>

            <div>
              <h3>When are you leaving?</h3>

              <div className="form-two-column">

                <label>
                  Date

                  <input
                    type="date"
                    name="date"
                    value={form.date}
                    onChange={handleChange}
                    required
                  />
                </label>

                <label>
                  Departure

                  <input
                    type="time"
                    name="time"
                    value={form.time}
                    onChange={handleChange}
                    required
                  />
                </label>

              </div>
            </div>
          </div>

          {/* RIDE DETAILS */}

          <div className="form-section">
            <span className="form-number">03</span>

            <div>
              <h3>Ride details</h3>

              <div className="form-two-column">

                <label>
                  Available seats

                  <select
                    name="seats"
                    value={form.seats}
                    onChange={handleChange}
                  >
                    <option value="1">1 seat</option>
                    <option value="2">2 seats</option>
                    <option value="3">3 seats</option>
                    <option value="4">4 seats</option>
                  </select>
                </label>

                <label>
                  Vehicle

                  <select
                    name="vehicle"
                    value={form.vehicle}
                    onChange={handleChange}
                  >
                    <option value="car">Car</option>
                    <option value="bike">Bike</option>
                    <option value="scooty">Scooty</option>
                  </select>
                </label>

              </div>
            </div>
          </div>

          <button
            className="primary-button offer-submit"
            type="submit"
          >
            Post my ride
            <span>→</span>
          </button>

        </form>

        <aside className="offer-note">

          <div className="offer-sticker">
            HOP
          </div>

          <span className="eyebrow">
            WHY SHARE?
          </span>

          <h2>
            One empty seat
            <br />
            can change
            <br />
            someone's commute.
          </h2>

          <p>
            Your route stays visible only to verified
            members of your campus.
          </p>

        </aside>

      </section>

      {submitted && (
        <div
          className="success-message"
          onClick={() => setSubmitted(false)}
        >
          <strong>Ride posted!</strong>

          <span>
            Your route is now visible to matching riders.
          </span>
        </div>
      )}

    </main>
  );
}