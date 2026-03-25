import api from "./api"; 

export const diagnosticFormService = {
  create: (data) => api.post("/diagnosticforms", data),
  
  update: (id, data) => api.put(`/diagnosticforms/${id}`, data),
  
  submit: (id) => api.patch(`/diagnosticforms/${id}/submit`),
  
  confirmPayment: (id) => api.patch(`/diagnosticforms/${id}/confirm-payment`),

  getById: (id) => api.get(`/diagnosticforms/${id}`)
};
