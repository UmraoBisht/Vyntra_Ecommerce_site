export function fetchAllProducts() {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:3000/products");
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchProductsByFilters(filter, sort, pagination) {
  //  filters= {category:["smartphone","groceries"]}
  //  sort= {_sort:"price",_order:"desc"}
  // pagination = {_page:1 , _limit:10}

  let queryString = "";
  for (let key in filter) {
    let categoryValues = filter[key];
    if (categoryValues.length > 0) {
      let lastCagegoryValue = categoryValues[categoryValues.length - 1];
      queryString += `${key}=${lastCagegoryValue}&`;
    }
  }

  for (let key in sort) {
    queryString += `${key}=${sort[key]}&`;
  }

  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`;
  }

  return new Promise(async (resolve) => {
    const response = await fetch(
      "http://localhost:3000/products?" + queryString
    );
    const data = await response.json();
    const totalItems = response.headers.get("X-Total-Count");
    resolve({
      data: {
        products: data,
        totalItems: totalItems,
      },
    });
  });
}

export function fetchCategories() {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:3000/category");
    const data = await response.json();
    resolve({ data });
  });
}
export function fetchBrands() {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:3000/brand");
    const data = await response.json();
    resolve({ data });
  });
}
export function fetchProductById(id) {
  return new Promise(async (resolve) => {
    const response = await fetch(`http://localhost:3000/products/${id}`);
    const data = await response.json();
    resolve({ data });
  });
}
