import toast, { Toaster } from "react-hot-toast";

export const copy = (text) => {
  navigator.clipboard.writeText(text);
  toast.success("Copied to clipboard", {
    duration: 800,
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
