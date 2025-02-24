import { useState } from 'react';
import axios from 'axios';

const usePostTask = (API) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const postTask = async (taskData) => {
    setLoading(true);
    setError(null);
    setData(null);

    try {
      const response = await axios.post(`${API}/tasks`, taskData);
      setData(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return { postTask, loading, error, data };
};

export default usePostTask;