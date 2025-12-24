// const API_URL = "http://localhost:5000/api";

// export const loginUser = async (data) => {
//   const res = await fetch(`${API_URL}/auth/login`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(data),
//   });
//   return res.json();
// };

// export const signupUser = async (data) => {
//   const res = await fetch(`${API_URL}/auth/signup`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(data),
//   });
//   return res.json();
// };

// export const fetchProfile = async (token) => {
//   const res = await fetch(`${API_URL}/users/profile`, {
//     headers: { Authorization: `Bearer ${token}` },
//   });
//   return res.json();
// };

// const API_URL = "http://localhost:5000/api/auth";

// export const signupUser = async (data) => {
//   try {
//     const res = await fetch(`${API_URL}/signup`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(data)
//     });
//     return await res.json();
//   } catch (err) {
//     console.error(err);
//     throw err;
//   }
// };

// export const loginUser = async (data) => {
//   try {
//     const res = await fetch(`${API_URL}/login`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(data)
//     });
//     return await res.json();
//   } catch (err) {
//     console.error(err);
//     throw err;
//   }
// };

const API_URL = "http://127.0.0.1:5000/api/auth";

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
