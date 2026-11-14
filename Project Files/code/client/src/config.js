// Backend base URL. Set REACT_APP_API_URL in your hosting provider.
export const API_URL = (process.env.REACT_APP_API_URL || 'http://localhost:6001').replace(/\/$/, '');
