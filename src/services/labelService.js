import api from "./api";

export const getLabels = async () => {
  try {
    const response = await api.get('/labels'); 
    return response.data;
  } catch (error) {
    console.error('Error fetching aLL label:', error);
    throw error;
  }
};

export const createLabel = async (labelData) => {
  try {
    const response = await api.post('/labels/add', labelData);
    return response.data;
  } catch (error) {
    console.error('Error Creating label:', error);
    throw error;
  }
};

export const updateLabel = async (id, labelData) => {
  try {
    const response = await api.put(`/labels/update/${id}`, labelData); 
    return response.data;
  } catch (error) {
    console.error('Error Updating label:', error);
    throw error;
  }
};

export const deleteLabel = async (id) => {
  try {
    const response = await api.delete(`/labels/delete/${id}`); 
    return response.data;
  } catch (error) {
    console.error('Error Deleting label:', error);
    throw error;
  }
};


export default api;
