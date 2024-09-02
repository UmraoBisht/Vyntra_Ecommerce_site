export const addToCart = (item) => {
    return new Promise(async (resolve) => {
      const response = await fetch("http://localhost:3000/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item),
      });
      const data = await response.json();
      resolve(data);
    });
  };
  