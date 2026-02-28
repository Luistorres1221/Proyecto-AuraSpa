/**
 * API Service - Facade para comunicación con backend Spring Boot
 * Backend URL: http://localhost:8080/api
 */

const API_BASE_URL = 'http://localhost:8080/api';

// Obtener token JWT del localStorage
const getToken = () => localStorage.getItem('authToken');

// Headers por defecto con autenticación
const getHeaders = (requireAuth = true) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  
  if (requireAuth) {
    const token = getToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }
  
  return headers;
};

// Manejo genérico de respuestas
const handleResponse = async (response) => {
  const data = await response.json();
  
  if (!response.ok) {
    const error = new Error(data.message || `HTTP ${response.status}`);
    error.status = response.status;
    error.data = data;
    throw error;
  }
  
  return data;
};

/**
 * ==================== AUTH ENDPOINTS ====================
 */
export const authAPI = {
  
  // POST /api/auth/login
  login: (email, password) => 
    fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: getHeaders(false),
      body: JSON.stringify({ email, password })
    }).then(handleResponse),
  
  // POST /api/auth/register
  register: (userData) => 
    fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: getHeaders(false),
      body: JSON.stringify(userData)
    }).then(handleResponse),
  
  // POST /api/auth/refresh-token
  refreshToken: (refreshToken) => 
    fetch(`${API_BASE_URL}/auth/refresh-token`, {
      method: 'POST',
      headers: getHeaders(false),
      body: JSON.stringify({ refreshToken })
    }).then(handleResponse),
  
  // POST /api/auth/verify-email/{token}
  verifyEmail: (token) => 
    fetch(`${API_BASE_URL}/auth/verify-email/${token}`, {
      method: 'POST',
      headers: getHeaders(false)
    }).then(handleResponse),
  
  // POST /api/auth/verify-2fa
  verify2FA: (code) => 
    fetch(`${API_BASE_URL}/auth/verify-2fa`, {
      method: 'POST',
      headers: getHeaders(true),
      body: JSON.stringify({ code })
    }).then(handleResponse),
  
  // POST /api/auth/request-password-reset
  requestPasswordReset: (email) => 
    fetch(`${API_BASE_URL}/auth/request-password-reset`, {
      method: 'POST',
      headers: getHeaders(false),
      body: JSON.stringify({ email })
    }).then(handleResponse),
  
  // POST /api/auth/reset-password
  resetPassword: (token, newPassword) => 
    fetch(`${API_BASE_URL}/auth/reset-password`, {
      method: 'POST',
      headers: getHeaders(false),
      body: JSON.stringify({ token, newPassword })
    }).then(handleResponse),
  
  // POST /api/auth/logout
  logout: () => 
    fetch(`${API_BASE_URL}/auth/logout`, {
      method: 'POST',
      headers: getHeaders(true)
    }).then(handleResponse)
};

/**
 * ==================== USER ENDPOINTS ====================
 */
export const userAPI = {
  
  // GET /api/user/profile
  getProfile: () => 
    fetch(`${API_BASE_URL}/user/profile`, {
      method: 'GET',
      headers: getHeaders(true)
    }).then(handleResponse),
  
  // PUT /api/user/update
  updateProfile: (userData) => 
    fetch(`${API_BASE_URL}/user/update`, {
      method: 'PUT',
      headers: getHeaders(true),
      body: JSON.stringify(userData)
    }).then(handleResponse),
  
  // POST /api/user/change-password
  changePassword: (currentPassword, newPassword) => 
    fetch(`${API_BASE_URL}/user/change-password`, {
      method: 'POST',
      headers: getHeaders(true),
      body: JSON.stringify({ currentPassword, newPassword })
    }).then(handleResponse),
  
  // GET /api/user/appointments
  getAppointments: () => 
    fetch(`${API_BASE_URL}/user/appointments`, {
      method: 'GET',
      headers: getHeaders(true)
    }).then(handleResponse),
  
  // GET /api/user/appointment/{id}
  getAppointmentDetail: (appointmentId) => 
    fetch(`${API_BASE_URL}/user/appointment/${appointmentId}`, {
      method: 'GET',
      headers: getHeaders(true)
    }).then(handleResponse)
};

/**
 * ==================== APPOINTMENT ENDPOINTS ====================
 */
export const appointmentAPI = {
  
  // POST /api/appointments/book
  bookAppointment: (appointmentData) => 
    fetch(`${API_BASE_URL}/appointments/book`, {
      method: 'POST',
      headers: getHeaders(true),
      body: JSON.stringify(appointmentData)
    }).then(handleResponse),
  
  // PUT /api/appointments/{id}/reschedule
  rescheduleAppointment: (appointmentId, newDate, newTime) => 
    fetch(`${API_BASE_URL}/appointments/${appointmentId}/reschedule`, {
      method: 'PUT',
      headers: getHeaders(true),
      body: JSON.stringify({ date: newDate, time: newTime })
    }).then(handleResponse),
  
  // POST /api/appointments/{id}/cancel
  cancelAppointment: (appointmentId) => 
    fetch(`${API_BASE_URL}/appointments/${appointmentId}/cancel`, {
      method: 'POST',
      headers: getHeaders(true)
    }).then(handleResponse)
};

/**
 * ==================== ADMIN ENDPOINTS ====================
 */
export const adminAPI = {
  
  // GET /api/admin/services
  getServices: () => 
    fetch(`${API_BASE_URL}/admin/services`, {
      method: 'GET',
      headers: getHeaders(true)
    }).then(handleResponse),
  
  // POST /api/admin/services
  createService: (serviceData) => 
    fetch(`${API_BASE_URL}/admin/services`, {
      method: 'POST',
      headers: getHeaders(true),
      body: JSON.stringify(serviceData)
    }).then(handleResponse),
  
  // GET /api/admin/professionals
  getProfessionals: () => 
    fetch(`${API_BASE_URL}/admin/professionals`, {
      method: 'GET',
      headers: getHeaders(true)
    }).then(handleResponse),
  
  // POST /api/admin/professionals
  createProfessional: (professionalData) => 
    fetch(`${API_BASE_URL}/admin/professionals`, {
      method: 'POST',
      headers: getHeaders(true),
      body: JSON.stringify(professionalData)
    }).then(handleResponse),
  
  // GET /api/admin/appointments
  getAppointments: (filters = {}) => {
    const params = new URLSearchParams();
    if (filters.status) params.append('status', filters.status);
    if (filters.date) params.append('date', filters.date);
    
    return fetch(`${API_BASE_URL}/admin/appointments?${params.toString()}`, {
      method: 'GET',
      headers: getHeaders(true)
    }).then(handleResponse);
  },
  
  // PUT /api/admin/appointments/{id}/status
  updateAppointmentStatus: (appointmentId, status) => 
    fetch(`${API_BASE_URL}/admin/appointments/${appointmentId}/status`, {
      method: 'PUT',
      headers: getHeaders(true),
      body: JSON.stringify({ status })
    }).then(handleResponse),
  
  // GET /api/admin/users
  getUsers: () => 
    fetch(`${API_BASE_URL}/admin/users`, {
      method: 'GET',
      headers: getHeaders(true)
    }).then(handleResponse),
  
  // POST /api/admin/users
  createUser: (userData) => 
    fetch(`${API_BASE_URL}/admin/users`, {
      method: 'POST',
      headers: getHeaders(true),
      body: JSON.stringify(userData)
    }).then(handleResponse),
  
  // PUT /api/admin/users/{id}
  updateUser: (userId, userData) => 
    fetch(`${API_BASE_URL}/admin/users/${userId}`, {
      method: 'PUT',
      headers: getHeaders(true),
      body: JSON.stringify(userData)
    }).then(handleResponse),
  
  // DELETE /api/admin/users/{id}
  deleteUser: (userId) => 
    fetch(`${API_BASE_URL}/admin/users/${userId}`, {
      method: 'DELETE',
      headers: getHeaders(true)
    }).then(handleResponse)
};

/**
 * ==================== HEALTH CHECK ====================
 */
export const healthAPI = {
  
  // GET /api/health/status
  checkStatus: () => 
    fetch(`${API_BASE_URL}/health/status`, {
      method: 'GET',
      headers: getHeaders(false)
    }).then(handleResponse).catch(err => ({
      status: 'offline',
      message: err.message
    }))
};

/**
 * ==================== AUTH HELPER FUNCTIONS ====================
 */
export const authHelpers = {
  
  // Guardar token y usuario en localStorage
  saveAuthData: (response) => {
    localStorage.setItem('authToken', response.token);
    localStorage.setItem('refreshToken', response.refreshToken);
    localStorage.setItem('user', JSON.stringify(response.user));
  },
  
  // Obtener usuario del localStorage
  getStoredUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },
  
  // Limpiar datos de autenticación
  clearAuthData: () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
  },
  
  // Verificar si hay sesión activa
  isAuthenticated: () => {
    return !!getToken();
  },
  
  // Obtener usuario actual
  getCurrentUser: () => {
    return authHelpers.getStoredUser();
  }
};

export default {
  authAPI,
  userAPI,
  appointmentAPI,
  adminAPI,
  healthAPI,
  authHelpers
};
