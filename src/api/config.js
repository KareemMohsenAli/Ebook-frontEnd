const urls = {
    LOCAL: "http://localhost:5000",
    SERVER: "",
  };
  
  export const BACKEND_URL = process.env.BACKEND_API_LINK || urls["LOCAL"];