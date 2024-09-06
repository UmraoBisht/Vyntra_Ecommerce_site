export const fetchUserOrders = (userId) => {
  return new Promise(async (resolve) => {
    const response = await fetch("https://localhost:3000" + userId);
    const data = await response.json();
    resolve(data);
  });
};
