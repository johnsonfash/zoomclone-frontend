import toast, { Toaster } from "react-hot-toast";

export const copy = (text) => {
  navigator.clipboard.writeText(text);
  toast.success("Copied to clipboard");
};

export const ToastContainer = () => (
  <Toaster
    toastOptions={{
      duration: 700,
    }}
    position="bottom-center"
    reverseOrder={false}
  />
);