import React, { useState } from 'react';
import axios from 'axios';
import './UserList.css'; 

const UserList = ({ token }) => {

  const [drivers, setDrivers] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Function to fetch drivers
  const fetchDrivers = async () => {
    setLoading(true); // Set loading state to true when starting the fetch
    
    
    
    /// from external source directly 

    // try {
    //   const response = await axios.get(
    //     'https://api.wetrack.tech/ats/ats/personnel/list',
    //     {
    //       headers: {
    //         Authorization: `JWT ${token}`
    //       },
    //       params: {
    //         params: JSON.stringify({
    //           query: "",
    //           limit: 10,
    //           ascending: 1,
    //           page: 1,
    //           byColumn: 0
    //         }),
    //         fleet_id: 5614
    //       }
    //     }
    //   );




    // getting data accross my backend
    try {
      const response = await axios.get(
        'http://localhost:3000/api/users', 
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      
      // Ensure response.data is an array c
      if (Array.isArray(response.data.data)) {
        setDrivers(response.data.data); // 
      } else {
        console.error('Unexpected response format:', response.data);
        setError('Unexpected response format.');
        setDrivers([]); // Clear drivers in case of error
      }
      setError(''); 
    } catch (error) {
      console.error('Error fetching drivers:', error);
      setError('Failed to load drivers.'); 
      setDrivers([]); 
    } finally {
      setLoading(false); // Set loading state to false 
    }
  };

  return (
    <div className="user-list">
      <h2>Drivers List</h2>
      <button onClick={fetchDrivers} disabled={loading}>
        {loading ? 'Loading...' : 'Fetch Drivers'}
      </button>
      {/* checking */}
      {error && <p>{error}</p>}
      <ul>
        {drivers.length > 0 ? (
          drivers.map((driver) => (
            <li key={driver.id}>
              {driver.name} {driver.surname} - {driver.phone}
            </li>
          ))
        ) : (
          <p>No drivers available.</p>
        )}
      </ul>
    </div>
  );
};

export default UserList;
