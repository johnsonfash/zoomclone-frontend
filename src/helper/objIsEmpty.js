const objIsEmpty = (data) => {
  try {
    if (Array.isArray(data)) {
      return data.length ? false : true;
    } else if (data !== null && typeof data === 'object') {
      return Object.keys(data).length === 0;
    } else {
      return true;
    }
  } catch (e) { }
  return true;
}

export default objIsEmpty;