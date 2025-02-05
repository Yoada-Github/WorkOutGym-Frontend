import React, { useEffect, useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { format } from 'date-fns'; // Import date-fns for formatting

function Home() {
  const [gyms, setGyms] = useState([]); // To store the workouts
  const [title, setTitle] = useState(''); // Form state for workout title
  const [load, setLoad] = useState(''); // Form state for load
  const [reps, setReps] = useState(''); // Form state for reps
  const [error, setError] = useState(''); // Error message for validation
  const navigate = useNavigate();

  // Fetch user's workouts from the backend
  useEffect(() => {
    const userId = localStorage.getItem('userId');
    axios
      .get(`http://localhost:5002/gym/gyms/${userId}`)
      .then((response) => {
        console.log(response,"99999999999999999999999999999999999")
        setGyms(response.data); // Update the workouts list
      })
      .catch((error) => {
        console.error('Error fetching workouts:', error);
        alert('Failed to fetch workouts. Please try again later.');
      });
  }, []);

  // Handle workout creation
  const handleAddWorkout = (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!title || !load || !reps) {
      setError('Please fill in all the fields');
      return;
    }

    const userId = localStorage.getItem('userId');
    const newWorkout = {
      title, 
      load, 
      reps, 
      userId,
      timestamp:new Date().toISOString(),
     };

    axios
      .post(' http://localhost:5002/gym/', newWorkout)
      .then((response) => {
        setGyms((prevGyms) => [response.data, ...prevGyms]); // Add the new workout to the list
        setTitle('');
        setLoad('');
        setReps('');
      })
      .catch((error) => {
        console.error('Error creating workout:', error);
        alert('Failed to create workout. Please try again later.');
      });
  };

  const handleDeleteWorkout = (id) => {
    axios
      .delete(`http://localhost:5002/gym/delete/${id}`)
      .then(() => {
        setGyms((prevGyms) => prevGyms.filter((gym) => gym._id !== id)); // Remove the deleted workout
      })
      .catch((error) => {
        console.error('Error deleting workout:', error);
        alert('Failed to delete workout. Please try again later.');
      });
  };
  return (
    <div className="container-fluid bg-light min-vh-100">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center bg-white p-3 mb-4">
        <h1 className="fw-bold fs-2 mb-0">My Workout Gym</h1>
        <div className="d-flex align-items-center">
          <Link to="/">
            <button className="btn btn-outline-primary">Log out</button>
          </Link>
        </div>
      </div>

      <div className="row">
        {/* Display Workouts */}
        <div className="col-lg-8">
          {gyms.length === 0 ? (
            <p className="text-muted">No workouts created yet.</p>
          ) : (
            <ul className="list-group">
              {gyms.map((gym, index) => (
                
                <li key={index} className="list-group-item d-flex justify-content-between align-items-center p-3 my-3">
                  <div>
                    <span className='text-primary fs-3 fw-bold'><strong>{gym.title}</strong> </span><br /> 
                   <strong>Load(kg):</strong>{gym.load} kg <br />
                  <strong>Reps:</strong>{gym.reps} <br />
                  <small className="text-muted">
                    {gym.createdAt}
                  </small>
                  </div>
                  <button
                    className="btn btn-black p-4"
                    onClick={() => handleDeleteWorkout(gym._id)}
                  >
                   <FaTrash />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Add Workout Form */}
        <div className="col-lg-4 my-3">
          <div className="rounded p-4">
            <h3 className="fw-bold mb-4">Add a New Workout</h3>
            <form onSubmit={handleAddWorkout}>
              <div className="mb-3">
                <label htmlFor="exerciseTitle" className="form-label">
                  Exercise Title:
                </label>
                <input
                  type="text"
                  value={title}
                  id="exerciseTitle"
                  className="form-control"
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter title"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="load" className="form-label">
                  Load (in kg):
                </label>
                <input
                  type="number"
                  value={load}
                  id="load"
                  className="form-control"
                  onChange={(e) => setLoad(e.target.value)}
                  placeholder="Enter load"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="reps" className="form-label">
                  Reps:
                </label>
                <input
                  type="number"
                  value={reps}
                  id="reps"
                  className="form-control"
                  onChange={(e) => setReps(e.target.value)}
                  placeholder="Enter reps"
                />
              </div>
              <button type="submit" className="btn btn-primary w-25 my-3">
                Add Workout
              </button>
              {error && <div className="text-danger mt-3">{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
