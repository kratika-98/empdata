

import React, { useState } from 'react';
import axios from 'axios';

const AddProduct = () => {
  const [employeeData, setEmployeeData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    department: '',
    salary: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData({ ...employeeData, [name]: value });
  };

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/employees', employeeData);
      console.log(response.data); 
      setEmployeeData({
        firstName: '',
        lastName: '',
        email: '',
        department: '',
        salary: ''
      });
      setError('');
    } catch (error) {
      console.error(error);
      setError('Failed to add employee');
    }
  };

  return (
    <div>
      <h2>Add Employee</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>First Name:</label>
        <input type="text" name="firstName" value={employeeData.firstName} onChange={handleChange} />
        <label>Last Name:</label>
        <input type="text" name="lastName" value={employeeData.lastName} onChange={handleChange} />
        <label>Email:</label>
        <input type="email" name="email" value={employeeData.email} onChange={handleChange} />
        <label>Department:</label>
        <select name="department" value={employeeData.department} onChange={handleChange}>
          <option value="Tech">Tech</option>
          <option value="Marketing">Marketing</option>
          <option value="Operations">Operations</option>
        </select>
        <label>Salary:</label>
        <input type="number" name="salary" value={employeeData.salary} onChange={handleChange} />
        <button type="submit">Add Employee</button>
      </form>
    </div>
  );
};

export default AddProduct;
