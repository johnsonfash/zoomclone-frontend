const parseJson = (data) => {
  let value = [];
  try {
    if (data) {
      value = JSON.parse(data);
    }
  } catch (error) {
    value = [];
  }
  return value;
}

export default parseJson