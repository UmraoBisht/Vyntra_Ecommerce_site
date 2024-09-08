export const fetchUserOrders = (userId) => {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:3000/orders/?user.id=" + userId);
    const data = await response.json();
    console.log(data);
    resolve(data);
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



export const fetchLoggedInUserInfo = (userId)=>{
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:3000/users/"+userId, {
      // credentials: 'include',
    });
    const data = await response.json();
    resolve(data);
  });
}