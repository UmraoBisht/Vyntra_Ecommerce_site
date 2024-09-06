export const createOrder = (orderData) => {
  return new Promise(async (resove) => {
    const response = await fetch("http://localhost:3000/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
      credentials: "include",
    });
    const data = await response.json();
    resove(data);
  });
};
