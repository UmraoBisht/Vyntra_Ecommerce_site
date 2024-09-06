export const createUser = (userData) => {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:3000/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
    const data = await response.json();
    resolve(data);
  });
};

export const checkUser = (loginInfo) => {
  return new Promise(async (resolve, reject) => {
    const { email, password } = loginInfo;
    const response = await fetch(
      "http://localhost:3000/users?email=" + email + "&password=" + password,
      {
        method: "GET",
        // method: "POST",
        // headers: { "Content-Type": "application/json" },
        // body: JSON.stringify({ email, password }),
        // credentials: "include",
      }
    );
    const data = await response.json();
    if (data.length > 0) {
      if (data[0].password === password) {
        resolve({ data: data[0] });
      } else {
        reject({ message: "Invalid credentials" });
      }
    } else {
      reject({ message: "User not found" });
    }
  });
};

export const updateUser = (userData) => {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:3000/users/" + userData.id, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
    const data = await response.json();
    resolve(data);
  });
};
