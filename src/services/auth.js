import objIsEmpty from "../helper/objIsEmpty";
import parseJson from "../helper/parseJson";

export const isRegistered = () => {
  return localStorage.getItem("webrtc_name");
}

export const register = (obj) => {
  localStorage.setItem('webrtc_name', obj.name);
  localStorage.setItem('webrtc_image', obj.image);
  localStorage.setItem('webrtc_id', obj.id);
}

export const regImage = (str) => {
  localStorage.setItem('webrtc_image', str)
}

export const getImage = () => {
  return localStorage.getItem('webrtc_image');
}

export const getID = () => {
  return localStorage.getItem('webrtc_id');
}

export const regName = (str) => {
  localStorage.setItem('webrtc_name', str)
}

export const getName = () => {
  return localStorage.getItem('webrtc_name');
}

export const logOut = () => {
  window.localStorage.clear();
  window.location.reload(true);
}

export const getLinks = () => {
  return parseJson(localStorage.getItem('webrtc_prevLinks')).reverse();
}

export const addLink = (obj) => {
  const link = getLinks().slice(0, 4);
  link.push(obj);
  localStorage.setItem('webrtc_prevLinks', JSON.stringify(link))
}

export const getUser = () => {
  return {
    name: localStorage.getItem('webrtc_name'),
    image: localStorage.getItem('webrtc_image'),
    id: localStorage.getItem('webrtc_id')
  }
}