
//const API_URL = "http://127.0.0.1:5000/api/auth";
const API_URL = "https://b8094b66-4cc1-4972-8c77-31cd8e70f560-00-abi5h71rz1rr.pike.replit.dev/api/auth";

export const signupUser = async (data) => {
  try {
    const res = await fetch(`${API_URL}/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data) // Now correctly handles the JSON object from Signup.jsx
    });
    
    const result = await res.json();
    
    if (!res.ok) {
      throw new Error(result.message || "Signup failed");
    }
    
    return result;
  } catch (err) {
    console.error("Signup API Error:", err);
    throw err;
  }
};

export const loginUser = async (data) => {
  try {
    const res = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    
    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.message || "Login failed");
    }

    return result;
  } catch (err) {
    console.error("Login API Error:", err);
    throw err;
  }
};
