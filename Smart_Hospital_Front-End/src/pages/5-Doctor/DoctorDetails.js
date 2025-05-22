import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./doctordetails.css";
import { useLocation } from "react-router-dom";

const DoctorDetails = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const location = useLocation();
  const [doctorData, setDoctorData] = useState([]);
  const doctor = location.state?.doctor;

  useEffect(() => {
    if (!doctor || !doctor.userId) {
      console.error("No doctor or userId found in location state");
      return;
    }

    fetch(`${process.env.REACT_APP_API_URL}/get-doctor/${doctor.userId}`)
      .then(res => {
        if (!res.ok) throw new Error("فشل في جلب البيانات");
        return res.json();
      })
      .then(data => setDoctorData(data.doctor))
      .catch(err => console.error(err));

    // Load user from localStorage
    const user = localStorage.getItem("user");
    if (user) {
      const userData = JSON.parse(user);
      setIsLoggedIn(true);
      setUserName(userData.name);
    }
  }, [doctor]);

  const [reviews] = useState([
    {
      id: 1,
      patientName: "Ahmed Mohamed",
      rating: 5,
      comment: "الدكتورة نورهان ممتازة جداً في التشخيص والعلاج، أنصح بها بشدة",
      date: "2023-05-15"
    },
    {
      id: 2,
      patientName: "Mariam Ali",
      rating: 4,
      comment: "طبيبة محترفة وشرحها واضح، لكن الانتظار كان طويلاً بعض الشيء",
      date: "2023-04-22"
    },
  ]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    timeSlotId: null,
    time: "",
    message: "",
    doctorId: "",
    patientId: "",
  });

  const getAvailableSlotsForDate = (date) => {
    if (!doctorData.week || !doctorData.timeSlots) return [];

    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const dayName = dayNames[date.getDay()]; // اسم اليوم من التاريخ

    // هل الدكتور متاح في اليوم ده؟
    if (!doctorData.week.includes(dayName)) {
      return [];
    }

    return doctorData.timeSlots.map(slot => {
      // parse الوقت بس من slot.hour
      const slotDate = new Date(slot.hour);
      // بسخدم الوقت (ساعة ودقيقة) من slotDate فقط
      const timeString = slotDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      return {
        id: slot.id,
        time: timeString,
        booked: slot.booked,
      };
    });
  };

  const [rating, setRating] = useState(4);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [isLoadingSlots, setIsLoadingSlots] = useState(false);
  const [slotStatus, setSlotStatus] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);


  const generateAvailableDates = () => {
    if (!doctorData.week) return [];

    const dayNameMap = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const dates = [];
    const today = new Date();

    for (let i = 0; i < 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);

      const dayName = dayNameMap[date.getDay()];
      if (doctorData.week.includes(dayName)) {
        dates.push(date);
      }
    }

    return dates;
  };

  const availableDates = generateAvailableDates();

  const handleDateSelect = (date) => {
    const dateString = date.toISOString().split('T')[0];
    setSelectedDate(date);
    setFormData({ ...formData, date: dateString, timeSlotId: null, time: "" });
    setShowDatePicker(false);
    checkSlotAvailability(dateString, "");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "timeSlotId") {
      const selectedSlot = availableSlots.find(slot => slot.id === Number(value));
      const newTime = selectedSlot ? selectedSlot.time : "";
      setFormData(prev => ({
        ...prev,
        timeSlotId: Number(value),
        time: newTime,
      }));
      if (formData.date) {
        checkSlotAvailability(formData.date, newTime);
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const checkSlotAvailability = (dateString, time) => {
    if (!dateString || !doctorData.timeSlots) return;

    setIsLoadingSlots(true);

    setTimeout(() => {
      const date = new Date(dateString);
      const slotsForDate = getAvailableSlotsForDate(date); // ✅ ستُرجع فقط المتاحة

      setAvailableSlots(slotsForDate);

      if (time) {
        const slot = slotsForDate.find(s => s.time === time);
        setSlotStatus(slot ? "available" : "not-available");
      } else {
        setSlotStatus(null);
      }

      setIsLoadingSlots(false);
    }, 300);
  };

  const user = JSON.parse(localStorage.getItem("user"));
  const Id = user?.userId;
  const role = user?.role;
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (slotStatus !== "available") {
      alert("Please select an available time slot before submitting.");
      return;
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/create-booking`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          timeSlotId: formData.timeSlotId,
          date: new Date(formData.date).toISOString(),
          time: formData.time,
          patientId: Id,
          patientName: formData.name,
          doctorId: doctor.userId
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Booking failed");
      }

      // Navigate on success
      navigate("/confirmation", {
        state: {
          doctorName: doctor.name,
          date: formData.date,
          time: formData.time,
          cost: "50 EGP",
          reservationNumber: `D-${Math.floor(100000 + Math.random() * 900000)}`
        },
      });
    } catch (error) {
      alert("Booking failed: " + error.message);
    }
  };

  // Helper to format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "Select a date";
    const options = { weekday: 'long', year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <>
      <header className="contact-header">
        <div className="nav-logo">
          <img src="/logo.png" alt="Hospital Logo" className="hospital-logo" />
        </div>
        <nav className="navbar1">
          <ul className="nav-links1">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about-us">About Us</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
          </ul>
          <div className="About-nav-right">
            {isLoggedIn ? (
              <Link to={`/${role}Profile/${Id}`} className="welcome-message">
                Hello, {userName}
              </Link>
            ) : (
              <>
                <Link to="/LogIn">Log In</Link>
                <Link to="/SignUpSelection">Sign Up</Link>
              </>
            )}
          </div>
        </nav>
      </header>

      <main>
        <section className="scheduler-container">
          <div className="combined-container">
            {/* Left Column - Doctor Image and Reviews */}
            <div className="left-column">
              <div className="image-section">
                <div className="image-frame">
                  <img
                    src={doctor.profileImage}
                    alt="Dr. Nourhan Mokhtar"
                    className="service-image"
                  />
                  <div className="image-overlay">
                    <div className="overlay-content">
                      <h3>{doctor.name}</h3>
                      <p>{doctor.education}</p>
                      <div className="star-rating">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <span
                            key={star}
                            className={`star ${star <= rating ? "filled" : ""}`}
                            onClick={() => setRating(star)}
                          >
                            ★
                          </span>
                        ))}
                        <span className="rating-text">
                          {rating}.0 (24 reviews)
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Patient Reviews Section */}
              <div className="doctor-reviews-section">
                <div className="reviews-header">
                  <h2>Patient Reviews</h2>
                  <div className="average-rating">
                    <span className="rating-number">{rating}.0</span>
                    <div className="stars">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span key={star} className={star <= rating ? "filled" : ""}>★</span>
                      ))}
                    </div>
                    <span className="total-reviews">({reviews.length} reviews)</span>
                  </div>
                </div>

                <div className="reviews-list">
                  {reviews.length > 0 ? (
                    reviews.map((review) => (
                      <div key={review.id} className="review-card">
                        <div className="review-header">
                          <h4>{review.patientName}</h4>
                          <div className="review-rating">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <span key={star} className={star <= review.rating ? "filled" : ""}>★</span>
                            ))}
                          </div>
                          <span className="review-date">
                            {new Date(review.date).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="review-comment">{review.comment}</p>
                      </div>
                    ))
                  ) : (
                    <p className="no-reviews">No reviews yet</p>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column - Appointment Form */}
            <div className="form-section">
              <div className="form-header">
                <h1 className="form-title">Schedule Your Appointment</h1>
                <p className="form-subtitle">Book with Dr. {doctor.name}</p>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label>Name:</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Name"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Phone:</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Your Phone"
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Email:</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Email"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Date:</label>
                    <div className="date-picker-container">
                      <div
                        className="date-display"
                        onClick={() => setShowDatePicker(!showDatePicker)}
                      >
                        {selectedDate ? formatDate(selectedDate) : "Select a date"}
                      </div>
                      {showDatePicker && (
                        <div className="date-picker-popup">
                          {availableDates.map((date, index) => (
                            <div
                              key={index}
                              className={`date-option ${selectedDate && selectedDate.toDateString() === date.toDateString() ? "selected" : ""}`}
                              onClick={() => handleDateSelect(date)}
                            >
                              {date.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    {isLoadingSlots && (
                      <div className="loading-indicator">
                        Checking availability...
                      </div>
                    )}
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Time:</label>
                    <select
                      name="timeSlotId"
                      value={formData.timeSlotId || ""}
                      onChange={handleChange}
                      required
                      disabled={!formData.date}
                      className="compact-time-select"
                    >
                      <option value="">Select time</option>
                      {availableSlots.map((slot) => (
                        <option key={slot.id} value={slot.id}>
                          {slot.time}
                        </option>
                      ))}
                    </select>
                    {slotStatus && !isLoadingSlots && formData.time && (
                      <div className={`slot-status ${slotStatus}`}>
                        {slotStatus === "available"
                          ? "✓ Slot available"
                          : "✗ Slot not available"}
                      </div>
                    )}
                  </div>
                </div>

                <div className="form-divider"></div>

                <div className="form-group">
                  <label>Message:</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Message"
                    rows="3"
                  ></textarea>
                </div>

                <div className="appointment-summary">
                  <h3>
                    Appointment: {formatDate(formData.date)} {formData.time && `at ${formData.time}`}
                  </h3>
                </div>
                <button
                  type="submit"
                  className="appointment-submit-btn"
                  disabled={slotStatus !== "available"}
                >
                  Confirm Appointment
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default DoctorDetails;