const url = import.meta.env.VITE_API_URL;
interface User {
  name?: string;
  email: string;
  password: string;
}

export async function signUpUser({ name, email, password }: User) {
  const user = await fetch(url + "/api/auth/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    mode: "cors",
    body: JSON.stringify({ name, email, password }),
  });

  if (!user.ok) {
    const errorData = await user.json();
    throw new Error(errorData.error);
  }
  return await user.json();
}

export async function loginUser({ email, password }: User) {
  const user = await fetch(url + "/api/auth/users/sessions", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    mode: "cors",
    body: JSON.stringify({ email, password }),
  });
  if (!user.ok) {
    throw new Error("Invalid email or password");
  }
  return await user.json();
}

export async function getUser() {
  try {
    const response = await fetch(url + "/api/auth/users/me", {
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const userData = await response.json();
    return userData;
  } catch (error) {
    // console.log(error);
    return null;
  }
}

export async function signOutUser() {
  try {
    await fetch(url + "/api/auth/users/sessions", {
      method: "DELETE",
      credentials: "include",
    });
  } catch (error) {
    console.error(error);
  }
}
