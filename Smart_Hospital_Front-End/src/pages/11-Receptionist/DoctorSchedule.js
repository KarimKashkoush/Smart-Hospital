import React, { useState } from 'react';
import './Receptionist.css';

const DoctorSchedule = () => {
  const doctors = ['Dr. Ahmed', 'Dr. Samira', 'Dr. Mona', 'Dr. Karim'];
  
  const [schedules, setSchedules] = useState([
    {
      id: 1,
      doctor: 'Dr. Ahmed',
      date: '2023-11-15',
      timeSlots: [
        { from: '09:00', to: '12:00' },
        { from: '14:00', to: '17:00' }
      ]
    },
    {
      id: 2,
      doctor: 'Dr. Samira',
      date: '2023-11-15',
      timeSlots: [
        { from: '10:00', to: '13:00' },
        { from: '16:00', to: '19:00' }
      ]
    }
  ]);

  const [newSchedule, setNewSchedule] = useState({
    doctor: '',
    date: '',
    timeSlots: [{ from: '', to: '' }]
  });

  const [editingId, setEditingId] = useState(null);
  const [editSchedule, setEditSchedule] = useState(null);

  const addTimeSlot = (isEdit = false) => {
    if (isEdit) {
      setEditSchedule({
        ...editSchedule,
        timeSlots: [...editSchedule.timeSlots, { from: '', to: '' }]
      });
    } else {
      setNewSchedule({
        ...newSchedule,
        timeSlots: [...newSchedule.timeSlots, { from: '', to: '' }]
      });
    }
  };

  const removeTimeSlot = (index, isEdit = false) => {
    if (isEdit) {
      const updatedSlots = editSchedule.timeSlots.filter((_, i) => i !== index);
      setEditSchedule({ ...editSchedule, timeSlots: updatedSlots });
    } else {
      const updatedSlots = newSchedule.timeSlots.filter((_, i) => i !== index);
      setNewSchedule({ ...newSchedule, timeSlots: updatedSlots });
    }
  };

  const handleTimeSlotChange = (index, field, value, isEdit = false) => {
    if (isEdit) {
      const updatedSlots = [...editSchedule.timeSlots];
      updatedSlots[index][field] = value;
      setEditSchedule({ ...editSchedule, timeSlots: updatedSlots });
    } else {
      const updatedSlots = [...newSchedule.timeSlots];
      updatedSlots[index][field] = value;
      setNewSchedule({ ...newSchedule, timeSlots: updatedSlots });
    }
  };

  const handleAddSchedule = (e) => {
    e.preventDefault();
    if (newSchedule.doctor && newSchedule.date && newSchedule.timeSlots[0].from) {
      setSchedules([...schedules, { ...newSchedule, id: Date.now() }]);
      setNewSchedule({
        doctor: '',
        date: '',
        timeSlots: [{ from: '', to: '' }]
      });
    }
  };

  const handleDeleteSchedule = (id) => {
    setSchedules(schedules.filter(schedule => schedule.id !== id));
  };

  const handleEditSchedule = (schedule) => {
    setEditingId(schedule.id);
    setEditSchedule({ ...schedule });
  };

  const handleUpdateSchedule = (e) => {
    e.preventDefault();
    if (editSchedule.doctor && editSchedule.date && editSchedule.timeSlots[0].from) {
      setSchedules(schedules.map(schedule => 
        schedule.id === editingId ? editSchedule : schedule
      ));
      setEditingId(null);
      setEditSchedule(null);
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditSchedule(null);
  };

  return (
    <div className="receptionist-page">
      <div className="content">
        <h2>Doctor Schedules</h2>
        
        <div className="schedule-management">
          {editingId ? (
            <div className="add-schedule-form">
              <h3>Edit Schedule</h3>
              <form onSubmit={handleUpdateSchedule}>
                <div className="form-row">
                  <div className="form-group">
                    <label>Doctor:</label>
                    <select
                      value={editSchedule.doctor}
                      onChange={(e) => setEditSchedule({...editSchedule, doctor: e.target.value})}
                      required
                    >
                      <option value="">-- Select Doctor --</option>
                      {doctors.map(doctor => (
                        <option key={doctor} value={doctor}>{doctor}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label>Date:</label>
                    <input
                      type="date"
                      value={editSchedule.date}
                      onChange={(e) => setEditSchedule({...editSchedule, date: e.target.value})}
                      required
                    />
                  </div>
                </div>
                
                <div className="time-slots">
                  <label>Working Hours:</label>
                  {editSchedule.timeSlots.map((slot, index) => (
                    <div key={index} className="time-slot-row">
                      <input
                        type="time"
                        value={slot.from}
                        onChange={(e) => handleTimeSlotChange(index, 'from', e.target.value, true)}
                        required
                      />
                      <span>to</span>
                      <input
                        type="time"
                        value={slot.to}
                        onChange={(e) => handleTimeSlotChange(index, 'to', e.target.value, true)}
                        required
                      />
                      {index > 0 && (
                        <button 
                          type="button" 
                          className="remove-slot-btn"
                          onClick={() => removeTimeSlot(index, true)}
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  ))}
                  <button 
                    type="button" 
                    className="add-slot-btn"
                    onClick={() => addTimeSlot(true)}
                  >
                    Add Another Time Slot
                  </button>
                </div>
                
                <div className="form-actions">
                  <button type="submit" className="save-btn">Update Schedule</button>
                  <button type="button" className="cancel-btn" onClick={cancelEdit}>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="add-schedule-form">
              <h3>Add New Schedule</h3>
              <form onSubmit={handleAddSchedule}>
                <div className="form-row">
                  <div className="form-group">
                    <label>Doctor:</label>
                    <select
                      value={newSchedule.doctor}
                      onChange={(e) => setNewSchedule({...newSchedule, doctor: e.target.value})}
                      required
                    >
                      <option value="">-- Select Doctor --</option>
                      {doctors.map(doctor => (
                        <option key={doctor} value={doctor}>{doctor}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label>Date:</label>
                    <input
                      type="date"
                      value={newSchedule.date}
                      onChange={(e) => setNewSchedule({...newSchedule, date: e.target.value})}
                      required
                    />
                  </div>
                </div>
                
                <div className="time-slots">
                  <label>Working Hours:</label>
                  {newSchedule.timeSlots.map((slot, index) => (
                    <div key={index} className="time-slot-row">
                      <input
                        type="time"
                        value={slot.from}
                        onChange={(e) => handleTimeSlotChange(index, 'from', e.target.value)}
                        required
                      />
                      <span>to</span>
                      <input
                        type="time"
                        value={slot.to}
                        onChange={(e) => handleTimeSlotChange(index, 'to', e.target.value)}
                        required
                      />
                      {index > 0 && (
                        <button 
                          type="button" 
                          className="remove-slot-btn"
                          onClick={() => removeTimeSlot(index)}
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  ))}
                  <button 
                    type="button" 
                    className="add-slot-btn"
                    onClick={addTimeSlot}
                  >
                    Add Another Time Slot
                  </button>
                </div>
                
                <button type="submit" className="save-btn">Add Schedule</button>
              </form>
            </div>
          )}
          
          <div className="schedules-list">
            <h3>Current Schedules</h3>
            {schedules.length > 0 ? (
              <div className="schedule-table">
                <table>
                  <thead>
                    <tr>
                      <th>Doctor</th>
                      <th>Date</th>
                      <th>Working Hours</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {schedules.map(schedule => (
                      <tr key={schedule.id}>
                        <td>{schedule.doctor}</td>
                        <td>{schedule.date}</td>
                        <td>
                          {schedule.timeSlots.map((slot, i) => (
                            <div key={i}>
                              {slot.from} - {slot.to}
                              {i < schedule.timeSlots.length - 1 && ', '}
                            </div>
                          ))}
                        </td>
                        <td>
                          <button 
                            className="edit-btn"
                            onClick={() => handleEditSchedule(schedule)}
                          >
                            Edit
                          </button>
                          <button 
                            className="delete-btn"
                            onClick={() => handleDeleteSchedule(schedule.id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p>No schedules available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorSchedule;