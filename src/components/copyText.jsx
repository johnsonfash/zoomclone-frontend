import toast, { Toaster } from "react-hot-toast";

export const copy = (text, info = false) => {
  navigator.clipboard.writeText(text);
  toast.success(info ? info : "Copied to clipboard", {
    duration: 1000,
  });
};

export const error = (text) => {
  toast.error(`Error: ${text}`, {
    duration: 2000,
  });
};

export const ToastContainer = () => (
  <Toaster position="bottom-center" reverseOrder={false} />
);
