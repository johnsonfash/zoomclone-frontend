export const cartQuantity = (cart, id) => {
  return cart.filter((d) => d.id == id)
    .map((d) => d.id)
    .reduce((a, b) => a + b);
}

export const getProperty = (cart, id, property) => {
  return cart.filter((d) => d.id == id).map(d => d[property]);
}

export const gp = (products, id) => {
  return products.filter(d => d.id == id)[0];
}


export const totalPrice = (fetch, store) => {
  return store.length ? store.map((d) => {
    return gp(fetch, d.id)?.price * d.quantity;
  })
    .reduce((p, n) => p + n) : "0"
}

export const getUUID = () => {
  let d = (performance && performance.now && (performance.now() * 1000)) || 0;
  return 'xx-xx-4x-yx-x'.replace(/[xy]/g, c => {
    let r = Math.random() * 16;
    if (d > 0) {
      r = (d + r) % 16 | 0;
      d = Math.floor(d / 16);
    }
    return (c == 'x' ? r : (r & 0x7 | 0x8)).toString(16);
  });
}