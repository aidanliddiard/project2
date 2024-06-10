import React, { useState } from 'react';

const VacationForm = () => {
    const [formData, setFormData] = useState({
      city: '',
      country: '',
      description: '',
      startDate: '',
      endDate: '',
      userId: '',
    });
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      setFormData({
        city: '',
        country: '',
        description: '',
        startDate: '',
        endDate: '',
        userId: '',
      });
    };
  
    return (
      <div>
        <h2>Create a Vacation</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>
              City:
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div>
            <label>
              Country:
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div>
            <label>
              Description:
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div>
            <label>
              Start Date:
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div>
            <label>
              End Date:
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div>
            <label>
              User ID:
              <input
                type="text"
                name="userId"
                value={formData.userId}
                onChange={handleInputChange}
              />
            </label>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  };
  
  export default VacationForm;