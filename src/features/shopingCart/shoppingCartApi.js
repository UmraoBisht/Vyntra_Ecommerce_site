export const addToCart = (item) => {
  return new Promise(async (resolve) => {
    delete item["id"];
    const response = await fetch("http://localhost:3000/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item),
    });
    const data = await response.json();
    resolve(data);
  });
};

export const fetchCartByUserId = (userId) => {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:3000/cart?user=" + userId);
    const data = await response.json();
    resolve(data);
  });
};

export const updateCart = (item) => {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:3000/cart/" + item.id, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item),
    });
    const data = await response.json();
    resolve(data);
  });
};

export const removeCartItem = (itemId) => {
  return new Promise(async (resolve) => {
    await fetch(`http://localhost:3000/cart/${itemId}`, {
      method: "DELETE",
    });
    resolve({ id: itemId });
  });
};

export const resetCart = (userId) => {
  return new Promise(async (resolve) => {
    const cartItems = await fetchCartByUserId(userId); // Fetch the cart items for the user
    // Delete each item in the cart
    for (let item of cartItems) {
      await removeCartItem(item.id);
    }
    // const data = await response.json();
    resolve({ status: "success" });
  });
};
