import api from "./api";

export const getUser = async () => {
  try {
    const response = await api.get('/users'); 
    return response.data;
  } catch (error) {
    console.error('Error fetching aLL User:', error);
    throw error;
  }
};

export const createUser = async (UserData) => {
  try {
    const response = await api.post('/users/add', UserData);
    console.log("API Response:", response.data); 
    return response.data;
  } catch (error) {
    console.error('Error Creating User:', error);
    throw error;
  }
};

// Update User by ID
export const updateUser = async (id, UserData) => {
  try {
    console.log("API Update request for ID:", id, "Data:", UserData); 
    const response = await api.put(`/users/update/${id}`, UserData);
    console.log("API Response:", response.data); 
    return response.data;
  } catch (error) {
    console.error("Error updating User:", error); 
    throw error;
  }
};


// Delete User by ID
export const deleteUser = async (id) => {
  try {
    const response = await api.delete(`/users/delete/${id}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error deleting User:', error);
    throw error;
  }
};

export default api;
