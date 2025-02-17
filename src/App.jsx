import React, { Suspense } from "react";
import { Toaster } from "sonner";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { motion } from "framer-motion";
import { Box, CircularProgress } from "@mui/material";
import GetAuth from "./components/Global/GetAuth";
import Layout from "./components/Global/Layout";
import Login from "./pages/Login/Login";

const Dashboard = React.lazy(() => import("./pages/Dashbord"));
const ProductCategory = React.lazy(() => import("./pages/ProductCategory"));
const Brand = React.lazy(() => import("./pages/Brand"));
const Color = React.lazy(() => import("./pages/Color"));
const ProductUploader = React.lazy(() => import("./pages/ProductUploader"));
const ProductView = React.lazy(() => import("./pages/ProductView"));
const ProductList = React.lazy(() => import("./pages/ProductList"));
const OrderList = React.lazy(() => import("./pages/OrderList"));
const OrderView = React.lazy(() => import("./pages/OrderView"));



function App() {
  return (
    <>
      <GetAuth />
      <Toaster richColors expand={false} position="top-right" closeButton />

      <BrowserRouter>
        <Suspense fallback={<CustomLoader />}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Dashboard />} />
              {routeItems?.map((item) => (
                <Route
                  key={item.id}
                  path={item.path}
                  element={item.component}
                />
              ))}
            </Route>

            <Route path="/login" element={<Login />} />
            {/* Handle undefined routes */}
            {/* <Route path="*" element={<NotFound />} /> */}
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
}

export default App;

// Professional route items with meaningful components
export const routeItems = [
  {
    id: "product-list",
    path: "/products/list",
    component: <ProductList />,
  },
  {
    id: "product-view",
    path: "/products/view/:id",
    component: <ProductView />,
  },
  {
    id: "product-upload",
    path: "/products/upload",
    component: <ProductUploader />,
  },
  {
    id: "consumer-list",
    path: "/consumer/list",
    component: <>Component List</>,
  },
  {
    id: "all-orders",
    path: "/orders/list",
    component: <OrderList />,
  },
  {
    id: "order-view",
    path: "/orders/view/:id",
    component: <OrderView />,
  },
  {
    id: "message",
    path: "/message/contact",
    component: <>ContactMessages</>, // Replace with actual component
  },
  {
    id: "reviews",
    path: "/message/review",
    component: <>ProductReviews</>, // Replace with actual component
  },
  {
    id: "product-category",
    path: "/category/product",
    component: <ProductCategory />,
  },
  {
    id: "brand-category",
    path: "/category/brand",
    component: <Brand />,
  },
  {
    id: "color-category",
    path: "/category/color",
    component: <Color />, // Replace with actual component
  },
  {
    id: "notification",
    path: "/notification",
    component: <>Notification </>, // Replace with actual component
  },
];

export const CustomLoader = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Box>
        <CircularProgress size={60} sx={{ color: "#6941C5" }} />
      </Box>
    </motion.div>
  );
};
