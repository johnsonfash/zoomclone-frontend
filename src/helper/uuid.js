const uuid = () => {
  return ([1e3] + -1e3 + -4e3).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
}

export default uuid;