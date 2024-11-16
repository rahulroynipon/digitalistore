import GetAuth from "./components/Global/GetAuth";
import Header from "./components/Global/Header";
import Login from "./pages/Login/Login";
import { Toaster } from "sonner";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Global/Layout";
import Dashboard from "./pages/Dashbord";
import ProductCategory from "./pages/ProductCategory";
import Brand from "./pages/Brand";

function App() {
  return (
    <>
      <GetAuth />
      <Toaster richColors expand={false} position="top-right" closeButton />

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            {routeItems?.map((item) => (
              <Route
                key={item?.id}
                path={item?.path}
                element={item?.component}
              />
            ))}
          </Route>

          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

export const routeItems = [
  {
    id: "product-list",
    path: "/products/list",
    component: <p>product list</p>,
  },
  {
    id: "product-view",
    path: "/products/view",
    component: <p>products view</p>,
  },
  {
    id: "product-upload",
    path: "/products/upload",
    component: <p>product upload</p>,
  },
  {
    id: "all-orders",
    path: "/orders/list",
    component: <p>orders list</p>,
  },
  {
    id: "pending-orders",
    path: "/orders/pending",
    component: <p>Pending Orders</p>,
  },
  {
    id: "completed-orders",
    path: "/orders/completed",
    component: <p>Completed Orders</p>,
  },
  {
    id: "message",
    path: "/message/contact",
    component: <p>Contact Message</p>,
  },
  {
    id: "reviews",
    path: "/message/review",
    component: <p>Reviews</p>,
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
    id: "notification",
    path: "/notification",
    component: <p>notification</p>,
  },
];
