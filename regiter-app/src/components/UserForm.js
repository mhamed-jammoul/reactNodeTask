import React, { useState } from 'react';
import axios from 'axios';
import './UserForm.css'; 

const UserForm = ({ token }) => {
  // State for form inputs
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [identityNo, setIdentityNo] = useState('');
  const [rfid, setRfid] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log('hereeere')
      // await axios.post(
      //   'https://api.wetrack.tech/ats/ats/personnel/new',
      //   {
      //     name,
      //     surname,
      //     identity_no: identityNo,
      //     rfid,
      //     fleet_id: 5614, 
      //     phone
      //   },
      //   {
      //     headers: {
      //       Authorization: `JWT ${token}`
      //     }
      //   }
      // );

      await axios.post(
        'http://localhost:3000/api/user', 
        {
          name,
          surname,
          identity_no: identityNo,
          rfid,
          phone,
          fleet_id: 5614 
        },
        {
          headers: {
            Authorization: `Bearer ${token}` 
          }
        }
      );

      // Clear form fields and show success message
      setName('');
      setSurname('');
      setIdentityNo('');
      setRfid('');
      setPhone('');
      setMessage('Form submitted successfully!');
    } catch (error) {
      // Handle error
      console.error('Error creating driver:', error);
      setMessage('Failed to submit the form.');
    }
  };

  return (
    <div className="user-form">
      <h2>Register New Driver</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="surname">Surname:</label>
          <input
            type="text"
            id="surname"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="identityNo">Identity No:</label>
          <input
            type="text"
            id="identityNo"
            value={identityNo}
            onChange={(e) => setIdentityNo(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="rfid">RFID:</label>
          <input
            type="text"
            id="rfid"
            value={rfid}
            onChange={(e) => setRfid(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone:</label>
          <input
            type="text"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default UserForm;
