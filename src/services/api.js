export async function getCategories() {
  try {
    const endpoint = await fetch('https://api.mercadolibre.com/sites/MLB/categories')
      .then((res) => res.json());
    return endpoint;
  } catch (error) {
    console.log(error);
  }
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  try {
    const endpoint = await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`)
      .then((res) => res.json());
    return endpoint;
  } catch (error) {
    console.log(error);
  }
}
