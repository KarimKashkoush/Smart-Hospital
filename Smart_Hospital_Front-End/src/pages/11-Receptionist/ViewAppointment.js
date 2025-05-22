import React, { useState } from 'react';
import './Receptionist.css';

const ViewAppointment = () => {
  const categories = [
    { id: 'cardio', name: 'Cardiology', doctors: ['Dr. Ahmed', 'Dr. Samir'] },
    { id: 'neuro', name: 'Neurology', doctors: ['Dr. Mona', 'Dr. Karim'] },
    { id: 'ortho', name: 'Orthopedics', doctors: ['Dr. Youssef', 'Dr. Hana'] }
  ];

  const [appointments, setAppointments] = useState([
    {
      id: 1,
      patientName: 'Ahmed Mohamed',
      category: 'cardio',
      doctor: 'Dr. Ahmed',
      date: '2023-11-15',
      time: '10:00',
      status: 'Confirmed'
    },
    {
      id: 2,
      patientName: 'Mona Ali',
      category: 'neuro',
      doctor: 'Dr. Mona',
      date: '2023-11-15',
      time: '11:30',
      status: 'Pending'
    }
  ]);

  const [filters, setFilters] = useState({
    category: '',
    doctor: '',
    date: '',
    status: 'all'
  });

  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingAppointment, setEditingAppointment] = useState(null);
  const [editFormData, setEditFormData] = useState({
    patientName: '',
    category: '',
    doctor: '',
    date: '',
    time: ''
  });

  const handleCategoryChange = (e) => {
    const categoryId = e.target.value;
    const selectedCategory = categories.find(cat => cat.id === categoryId);
    
    setFilters({
      ...filters,
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
    
    if (filters.category) {
      const selectedCategory = categories.find(cat => cat.id === filters.category);
      const filtered = selectedCategory.doctors.filter(doctor => 
        doctor.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredDoctors(filtered);
    }
  };

  const handleCancelAppointment = (id) => {
    setAppointments(appointments.map(appointment => 
      appointment.id === id ? { ...appointment, status: 'Cancelled' } : appointment
    ));
  };

  const handleEditAppointment = (appointment) => {
    setEditingAppointment(appointment.id);
    setEditFormData({
      patientName: appointment.patientName,
      category: appointment.category,
      doctor: appointment.doctor,
      date: appointment.date,
      time: appointment.time
    });
  };

  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({
      ...editFormData,
      [name]: value
    });
  };

  const handleSaveEdit = (id) => {
    setAppointments(appointments.map(appointment => 
      appointment.id === id ? { 
        ...appointment,
        patientName: editFormData.patientName,
        category: editFormData.category,
        doctor: editFormData.doctor,
        date: editFormData.date,
        time: editFormData.time,
        status: 'Confirmed' // Reset status to confirmed when edited
      } : appointment
    ));
    setEditingAppointment(null);
  };

  const handleCancelEdit = () => {
    setEditingAppointment(null);
  };

  const filteredAppointments = appointments.filter(appointment => {
    return (
      (filters.category === '' || appointment.category === filters.category) &&
      (filters.doctor === '' || appointment.doctor === filters.doctor) &&
      (filters.date === '' || appointment.date === filters.date) &&
      (filters.status === 'all' || appointment.status.toLowerCase() === filters.status)
    );
  });

  return (
    <div className="receptionist-page">
      
      <div className="content">
        <h2>View Appointments</h2>
        
        <div className="appointment-filters">
          <div className="form-row">
            <div className="form-group">
              <label>Filter by Category:</label>
              <select
                value={filters.category}
                onChange={handleCategoryChange}
              >
                <option value="">All Categories</option>
                {categories.map(category => (
                  <option key={category.id} value={category.id}>{category.name}</option>
                ))}
              </select>
            </div>
            
            <div className="form-group">
              <label>Filter by Doctor:</label>
              <div className="search-select">
                <input
                  type="text"
                  placeholder="Search doctors..."
                  value={searchTerm}
                  onChange={handleDoctorSearch}
                  disabled={!filters.category}
                />
                <select
                  value={filters.doctor}
                  onChange={(e) => setFilters({...filters, doctor: e.target.value})}
                  disabled={!filters.category}
                >
                  <option value="">All Doctors</option>
                  {filteredDoctors.map(doctor => (
                    <option key={doctor} value={doctor}>{doctor}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>Filter by Date:</label>
              <input
                type="date"
                value={filters.date}
                onChange={(e) => setFilters({...filters, date: e.target.value})}
              />
            </div>
            
            <div className="form-group">
              <label>Filter by Status:</label>
              <select
                value={filters.status}
                onChange={(e) => setFilters({...filters, status: e.target.value})}
              >
                <option value="all">All Statuses</option>
                <option value="confirmed">Confirmed</option>
                <option value="pending">Pending</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        </div>
        
        <div className="appointments-list">
          <table>
            <thead>
              <tr>
                <th>Patient</th>
                <th>Category</th>
                <th>Doctor</th>
                <th>Date</th>
                <th>Time</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAppointments.map(appointment => (
                <tr key={appointment.id}>
                  {editingAppointment === appointment.id ? (
                    <>
                      <td>
                        <input
                          type="text"
                          name="patientName"
                          value={editFormData.patientName}
                          onChange={handleEditFormChange}
                        />
                      </td>
                      <td>
                        <select
                          name="category"
                          value={editFormData.category}
                          onChange={handleEditFormChange}
                        >
                          {categories.map(category => (
                            <option key={category.id} value={category.id}>{category.name}</option>
                          ))}
                        </select>
                      </td>
                      <td>
                        <select
                          name="doctor"
                          value={editFormData.doctor}
                          onChange={handleEditFormChange}
                        >
                          {categories.find(c => c.id === editFormData.category)?.doctors.map(doctor => (
                            <option key={doctor} value={doctor}>{doctor}</option>
                          ))}
                        </select>
                      </td>
                      <td>
                        <input
                          type="date"
                          name="date"
                          value={editFormData.date}
                          onChange={handleEditFormChange}
                        />
                      </td>
                      <td>
                        <input
                          type="time"
                          name="time"
                          value={editFormData.time}
                          onChange={handleEditFormChange}
                        />
                      </td>
                      <td>
                        <span className={`status-badge confirmed`}>
                          Confirmed
                        </span>
                      </td>
                      <td>
                        <button 
                          className="save-btn"
                          onClick={() => handleSaveEdit(appointment.id)}
                        >
                          Save
                        </button>
                        <button 
                          className="cancel-edit-btn"
                          onClick={handleCancelEdit}
                        >
                          Cancel
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td>{appointment.patientName}</td>
                      <td>{categories.find(c => c.id === appointment.category)?.name || ''}</td>
                      <td>{appointment.doctor}</td>
                      <td>{appointment.date}</td>
                      <td>{appointment.time}</td>
                      <td>
                        <span className={`status-badge ${appointment.status.toLowerCase()}`}>
                          {appointment.status}
                        </span>
                      </td>
                      <td>
                        <button 
                          className="edit-btn"
                          onClick={() => handleEditAppointment(appointment)}
                          disabled={appointment.status === 'Cancelled'}
                        >
                          Edit
                        </button>
                        <button 
                          className="cancel-btn"
                          onClick={() => handleCancelAppointment(appointment.id)}
                          disabled={appointment.status === 'Cancelled'}
                        >
                          Cancel
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ViewAppointment;