import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

function Create() {
  const [title, setTitle] = useState('');
  const [load, setLoad] = useState('');
  const [reps, setReps] = useState('');
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();


  const handleSaveBook = () => {
    const userId = localStorage.getItem("userId")
    const data = {
      title,
      load,
      reps,
      userId: userId
    };

    axios
      .post(` http://localhost:5002/gym/`,  data) 
      .then(() => {
        enqueueSnackbar('Gym created successfully', { variant: 'success' });
        navigate('/home');
      })
      .catch((error) => {
        enqueueSnackbar('Failed to create gym', { variant: 'error' });
        console.error(error);
      });
  };

  return (
    <div className="col-lg-8 mb-4">
      <div className="bg-white rounded shadow p-3 mb-3">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <label className="fw-bold text-primary">Exersice title:</label>
            <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mx-5 px-4 py-2"
            placeholder="Enter gym title"
          />
            <label className="mb-1">Load (kg):</label>
            <input
            type={Number}
            value={load}
            onChange={(e) => setLoad(e.target.value)}
            className="mx-4 px-4 py-2"
            placeholder="Enter gym load"
          />
            <label className="mb-1">Reps:</label>
            <input
            type={Number}
            value={reps}
            onChange={(e) => setReps(e.target.value)}
            className="mx-4 px-4 py-2"
            placeholder="Enter number of workout"
          />
            <small className="text-muted">1 minute ago</small>
          </div>
          <button className="btn btn-outline-danger">
            <i className="bi bi-trash"></i>
          </button>
        </div>
      </div>

      <button onClick={handleSaveBook} type="submit" className="btn btn-primary w-25 my-3">
              Add Workout
      </button>
    </div>

  )
}

export default Create
