// ProductPage.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductPage = () => {
  const [employees, setEmployees] = useState([]);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [newEmployeeData, setNewEmployeeData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    department: '',
    salary: ''
  });
  const [error, setError] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/employees');
      setEmployees(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (employee) => {
    setEditingEmployee(employee);
    setNewEmployeeData({
      firstName: employee.firstName,
      lastName: employee.lastName,
      email: employee.email,
      department: employee.department,
      salary: employee.salary
    });
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:3000/employees/${editingEmployee._id}`, newEmployeeData);
      setEditingEmployee(null);
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/employees/${id}`);
      setEmployees(employees.filter(employee => employee._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewEmployeeData({ ...newEmployeeData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/employees', newEmployeeData);
      console.log(response.data); // Assuming successful employee addition returns a message
      setNewEmployeeData({
        firstName: '',
        lastName: '',
        email: '',
        department: '',
        salary: ''
      });
      setError('');
      fetchData();
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
        <input type="text" name="firstName" value={newEmployeeData.firstName} onChange={handleChange} />
        <label>Last Name:</label>
        <input type="text" name="lastName" value={newEmployeeData.lastName} onChange={handleChange} />
        <label>Email:</label>
        <input type="email" name="email" value={newEmployeeData.email} onChange={handleChange} />
        <label>Department:</label>
        <select name="department" value={newEmployeeData.department} onChange={handleChange}>
            <option value="">select department</option>
          <option value="Tech">Tech</option>
          <option value="Marketing">Marketing</option>
          <option value="Operations">Operations</option>
        </select>
        <label>Salary:</label>
        <input type="number" name="salary" value={newEmployeeData.salary} onChange={handleChange} />
        <button type="submit">Add Employee</button>
      </form>

      <h2>Employees</h2>
      <table style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr>
           
            <th style={{ border: '1px solid black', padding: '8px' }}>First Name</th>
            <th style={{ border: '1px solid black', padding: '8px' }}>Last Name</th>
            <th style={{ border: '1px solid black', padding: '8px' }}>Email</th>
            <th style={{ border: '1px solid black', padding: '8px' }}>Department</th>
            <th style={{ border: '1px solid black', padding: '8px' }}>Salary</th>
            <th style={{ border: '1px solid black', padding: '8px' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(employee => (
            <tr key={employee._id}>
             
              <td style={{ border: '1px solid black', padding: '8px' }}>
                {editingEmployee && editingEmployee._id === employee._id ? (
                  <input
                    type="text"
                    value={newEmployeeData.firstName}
                    onChange={(e) => setNewEmployeeData({ ...newEmployeeData, firstName: e.target.value })}
                  />
                ) : (
                  employee.firstName
                )}
              </td>
              <td style={{ border: '1px solid black', padding: '8px' }}>
                {editingEmployee && editingEmployee._id === employee._id ? (
                  <input
                    type="text"
                    value={newEmployeeData.lastName}
                    onChange={(e) => setNewEmployeeData({ ...newEmployeeData, lastName: e.target.value })}
                  />
                ) : (
                  employee.lastName
                )}
              </td>
              <td style={{ border: '1px solid black', padding: '8px' }}>
                {editingEmployee && editingEmployee._id === employee._id ? (
                  <input
                    type="text"
                    value={newEmployeeData.email}
                    onChange={(e) => setNewEmployeeData({ ...newEmployeeData, email: e.target.value })}
                  />
                ) : (
                  employee.email
                )}
              </td>
              <td style={{ border: '1px solid black', padding: '8px' }}>
                {editingEmployee && editingEmployee._id === employee._id ? (
                  <input
                    type="text"
                    value={newEmployeeData.department}
                    onChange={(e) => setNewEmployeeData({ ...newEmployeeData, department: e.target.value })}
                  />
                ) : (
                  employee.department
                )}
              </td>
              <td style={{ border: '1px solid black', padding: '8px' }}>
                {editingEmployee && editingEmployee._id === employee._id ? (
                  <input
                    type="text"
                    value={newEmployeeData.salary}
                    onChange={(e) => setNewEmployeeData({ ...newEmployeeData, salary: e.target.value })}
                  />
                ) : (
                  employee.salary
                )}
              </td>
              <td style={{ border: '1px solid black', padding: '8px' }}>
                {editingEmployee && editingEmployee._id === employee._id ? (
                  <button onClick={handleUpdate}>Save</button>
                ) : (
                  <button onClick={() => handleEdit(employee)}>Edit</button>
                )}
                <button onClick={() => handleDelete(employee._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductPage;
