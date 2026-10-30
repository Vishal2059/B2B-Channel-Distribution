
const API_URL = process.env.NEXT_PUBLIC_API_URL;

async function authRequest(endpoint, payload) {
  if (!API_URL) {
    throw new Error("Backend URL missing. Check .env.local");
  }

  let response;

  try {
    response = await fetch(
      `${API_URL.replace(/\/$/, "")}${endpoint}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );
  } catch (error) {
    throw new Error(
      "Backend connection failed. Please check your server."
    );
  }

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
}

// Signup API
export async function signupUser({
  name,
  email,
  phone,
  password,
  role,
}) {
  return authRequest("/api/auth/signup", {
    name,
    email,
    phone,
    password,
    role,
  });
}

// Login API
export async function loginUser({ email, password }) {
  return authRequest("/api/auth/login", {
    email,
    password,
  });
}

// Save authentication session
export function saveAuthSession(data, rememberMe = false) {
  if (!data?.token) {
    throw new Error("Authentication token not received");
  }

  // Clear previous session
  localStorage.removeItem("leadmarket-token");
  localStorage.removeItem("leadmarket-user");

  sessionStorage.removeItem("leadmarket-token");
  sessionStorage.removeItem("leadmarket-user");

  // Choose storage based on Remember Me
  const storage = rememberMe ? localStorage : sessionStorage;

  storage.setItem("leadmarket-token", data.token);

  storage.setItem(
    "leadmarket-user",
    JSON.stringify({
      _id: data._id,
      name: data.name,
      email: data.email,
      role: data.role,
    })
  );
}

// Logout
export function logoutUser() {
  localStorage.removeItem("leadmarket-token");
  localStorage.removeItem("leadmarket-user");

  sessionStorage.removeItem("leadmarket-token");
  sessionStorage.removeItem("leadmarket-user");

  window.location.href = "/login";
}
