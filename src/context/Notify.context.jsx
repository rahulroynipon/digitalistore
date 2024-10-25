import React, { createContext, useContext, useState } from "react";
import { Button, useTheme } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";

const NotifyContext = createContext();

export const NotifyProvider = ({ children }) => {
  const [modals, setModals] = useState([]);
  const theme = useTheme();

  const addModal = (id, component, options = {}) => {
    const newModal = {
      id,
      component,
      ...options,
    };
    setModals((prev) => [...prev, newModal]);
  };

  const removeModal = (id) => {
    setModals((prev) => prev.filter((modal) => modal.id !== id));
  };

  return (
    <NotifyContext.Provider value={{ modals, addModal, removeModal }}>
      {children}
      {/* Static or configurable background overlay */}
      {modals.length > 0 && modals.some((modal) => modal.overlay) && (
        <div className="fixed inset-0 bg-black bg-opacity-50"></div>
      )}
      <AnimatePresence>
        {modals.map((modal, index) => (
          <motion.div
            key={modal.id}
            initial={modal.initial || { opacity: 0, y: -50, scale: 0.9 }}
            animate={
              modal.animate || {
                opacity: 1,
                x: 20 * index,
                y: 20 * index,
                scale: 1,
              }
            }
            exit={modal.exit || { opacity: 0, x: 50 * index, scale: 0.9 }}
            transition={{ duration: modal.duration || 0.3 }}
            className={`fixed inset-0 flex items-center justify-center ${
              modal.className || ""
            }`}
          >
            <div
              style={{
                backgroundColor: theme.palette.background.paper,
                color: theme.palette.text.primary,
                ...modal.style,
              }}
              className="relative rounded-lg max-w-fit w-[200px] min-w-[300px] p-4 shadow-2xl"
            >
              {/* Render modal content with close functionality */}
              {React.cloneElement(modal.component, {
                closeModal: () => removeModal(modal.id),
              })}
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </NotifyContext.Provider>
  );
};

export const useNotify = () => useContext(NotifyContext);
