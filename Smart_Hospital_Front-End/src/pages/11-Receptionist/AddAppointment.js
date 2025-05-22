import React, { useState } from 'react';
import './Receptionist.css';

const AddAppointment = () => {
  const categories = [
    { id: 'cardio', name: 'Cardiology', doctors: ['Dr. Ahmed', 'Dr. Samir'] },
    { id: 'neuro', name: 'Neurology', doctors: ['Dr. Mona', 'Dr. Karim'] },
    { id: 'ortho', name: 'Orthopedics', doctors: ['Dr. Youssef', 'Dr. Hana'] }
  ];

  const [appointment, setAppointment] = useState({
    patientName: '',
    category: '',
    doctor: '',
    date: '',
    time: '',
    notes: ''
  });

  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const handleCategoryChange = (e) => {
    const categoryId = e.target.value;
    const selectedCategory = categories.find(cat => cat.id === categoryId);
    
    setAppointment({
      ...appointment,
      category: categoryId,
      doctor: ''
    });

    if (selectedCategory) {
      setFilteredDoctors(selectedCategory.doctors);
    } else {
      setFilteredDoctors([]);
    }
  };

  const handleDoctorSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    
    if (appointment.category) {
      const selectedCategory = categories.find(cat => cat.id === appointment.category);
      const filtered = selectedCategory.doctors.filter(doctor => 
        doctor.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredDoctors(filtered);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Appointment submitted:', appointment);
    // You might want to add navigation back to profile or show success message
  };

  return (
    <div className="add-appointment-container">
      <h2>Add New Appointment</h2>
      
      <form className="appointment-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Patient Name:</label>
          <input
            type="text"
            value={appointment.patientName}
            onChange={(e) => setAppointment({...appointment, patientName: e.target.value})}
            required
          />
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label>Category:</label>
            <select
              value={appointment.category}
              onChange={handleCategoryChange}
              required
            >
              <option value="">-- Select Category --</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>
          </div>
          
          <div className="form-group">
            <label>Doctor:</label>
            <div className="search-select">
              <input
                type="text"
                placeholder="Search doctors..."
                value={searchTerm}
                onChange={handleDoctorSearch}
                disabled={!appointment.category}
              />
              <select
                value={appointment.doctor}
                onChange={(e) => setAppointment({...appointment, doctor: e.target.value})}
                required
                disabled={!appointment.category}
              >
                <option value="">-- Select Doctor --</option>
                {filteredDoctors.map(doctor => (
                  <option key={doctor} value={doctor}>{doctor}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label>Date:</label>
            <input
              type="date"
              value={appointment.date}
              onChange={(e) => setAppointment({...appointment, date: e.target.value})}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Time:</label>
            <input
              type="time"
              value={appointment.time}
              onChange={(e) => setAppointment({...appointment, time: e.target.value})}
              required
            />
          </div>
        </div>
        
        <div className="form-group">
          <label>Notes:</label>
          <textarea
            value={appointment.notes}
            onChange={(e) => setAppointment({...appointment, notes: e.target.value})}
          />
        </div>
        
        <div className="form-actions">
          <button type="submit" className="save-btn">Save Appointment</button>
          <button type="button" className="cancel-btn" >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddAppointment;