import { history } from "../index"; // Your history instance
import { createAuthError } from "../utils/authError";

export const authMiddleware = (store) => (next) => (action) => {
  // Handle rejected actions
  if (action.type.endsWith('/rejected')) {
    const error = action.payload;
    
    if (error?.isAuthError) {
      // Show error message
      console.error('Auth Error:', error.message);
      alert(error.message);
      
      // Redirect to login
      history.push('/login');
    }
  }
  
  return next(action);
};