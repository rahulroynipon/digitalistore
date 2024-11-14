import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@emotion/react";

export default function Modal({ isOpen, children, closeHandler }) {
  const theme = useTheme();
  const bgColor = theme.palette.background.default;

  const handleBackgroundClick = (e) => {
    e.stopPropagation();
    closeHandler();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Background Overlay */}
          <div
            onClick={handleBackgroundClick}
            className="fixed inset-0 flex items-center justify-center backdrop-blur-sm"
            style={{
              background: "rgba(0, 0, 0, 0.6)",
              zIndex: 999,
            }}
          >
            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className=" rounded-lg overflow-hidden"
            >
              {children}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
