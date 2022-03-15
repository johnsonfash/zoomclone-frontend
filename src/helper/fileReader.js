const imageToString = (e, cb) => {
  let file = e.target.files[0];
  var reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function () {
    cb(reader.result)
  };
  reader.onerror = function (error) {
    return '';
  };
  return '';
}

export default imageToString