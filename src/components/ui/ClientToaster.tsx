"use client";
import { ToastContainer } from "react-toastify";
import React from "react";

export function ClientToaster() {
  return (
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
      style={{ zIndex: 99999 }}
    />
  );
}
