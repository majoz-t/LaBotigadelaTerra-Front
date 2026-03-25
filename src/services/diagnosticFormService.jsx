import api from "./api"; 

export const diagnosticFormService = {

  getAllByUser: (userId) => api.get(`/diagnosticforms/userforms?userId=${userId}`),

  create: (data) => api.post("/diagnosticforms", data),

  getById: (id) => api.get(`/diagnosticforms/${id}`),
  
  update: (id, data) => api.put(`/diagnosticforms/${id}`, data),
  
  submit: (id) => api.patch(`/diagnosticforms/${id}/submit`),

  confirmFakePayment: (id) => api.patch(`/diagnosticforms/${id}/confirm-fake-payment`),

  deleteForm: (id) => api.delete(`/diagnosticforms/${id}`),
};

