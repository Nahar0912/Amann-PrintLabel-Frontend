import api from "./api";

export const getArticle = async () => {
  try {
    const response = await api.get('/articles'); 
    return response.data;
  } catch (error) {
    console.error('Error fetching aLL article:', error);
    throw error;
  }
};

export const createArticle = async (articleData) => {
  try {
    const response = await api.post('/articles/add', articleData);
    return response.data;
  } catch (error) {
    console.error('Error Creating article:', error);
    throw error;
  }
};

// Update article by ID
export const updateArticle = async (id, articleData) => {
  try {
    console.log("API Update request for ID:", id, "Data:", articleData); 
    const response = await api.put(`/articles/update/${id}`, articleData);
    console.log("API Response:", response.data); 
    return response.data;
  } catch (error) {
    console.error("Error updating article:", error); 
    throw error;
  }
};


// Delete article by ID
export const deleteArticle = async (id) => {
  try {
    const response = await api.delete(`/articles/delete/${id}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error deleting article:', error);
    throw error;
  }
};

export default api;
