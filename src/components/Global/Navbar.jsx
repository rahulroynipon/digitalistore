import { Box, ListItemIcon, MenuItem } from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useTheme } from "@emotion/react";
import { useEffect, useState } from "react";
import { FaProductHunt } from "react-icons/fa";
import { FaCartArrowDown } from "react-icons/fa6";
import { MdDashboard } from "react-icons/md";
import { RiLoginCircleLine } from "react-icons/ri";
import { MdMessage } from "react-icons/md";
import { MdCategory } from "react-icons/md";
import { MdNotificationsActive } from "react-icons/md";
import { NavLink, useLocation } from "react-router-dom";

export default function Navbar() {
  const theme = useTheme();
  const [openSubMenu, setOpenSubMenu] = useState(null); // Track open submenu
  const logoColor = theme.palette.text.isActive;
  return (
    <>
      <h1
        style={{ color: logoColor }}
        className="mt-2  mx-5 my-7 text-2xl font-bold"
      >
        Digital Shop
      </h1>
      <div className="px-1">
        {navItems.map((item) => (
          <NavItem
            key={item.id}
            item={item}
            openSubMenu={openSubMenu}
            setOpenSubMenu={setOpenSubMenu}
          />
        ))}
      </div>
    </>
  );
}

export function NavItem({ item, openSubMenu, setOpenSubMenu }) {
  const theme = useTheme();
  const location = useLocation();
  const navTextColor = theme.palette.text.secondary;
  const isActiveText = theme.palette.text.isActive;

  // Toggle the submenu, and close any other open submenu
  const toggleSubMenu = () => {
    setOpenSubMenu((prev) => (prev === item.id ? null : item.id));
  };

  const isSubMenuOpen = openSubMenu === item.id;
  const isActive =
    location.pathname.split("/").includes(item.path) ||
    location.pathname === item?.path;

  return (
    <>
      <NavLink
        to={!item?.subItems ? item?.path : null}
        style={{
          color: isActive ? isActiveText : navTextColor,
          transition: "color 0.1s ease-in-out",
        }}
      >
        <MenuItem
          onClick={toggleSubMenu}
          sx={{
            padding: 1.6,
            borderRadius: 2,
            fontSize: 17.5,
            marginTop: 1,
            backgroundColor: isActive ? `${isActiveText}25` : "",
            transition:
              "background-color 0.3s ease-in-out, color 0.2s ease-in-out",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <ListItemIcon
                sx={{
                  color: isActive ? isActiveText : navTextColor,
                  fontSize: 22,
                }}
              >
                {item.icon}
              </ListItemIcon>
              <span style={{ fontWeight: 500 }}>{item.label}</span>
            </Box>

            {item.subItems && (
              <ChevronRightIcon
                sx={{
                  color: navTextColor,
                  transform: `rotate(${isSubMenuOpen ? "90deg" : "0deg"})`,
                  transition: "transform 0.3s ease",
                }}
              />
            )}
          </Box>
        </MenuItem>
      </NavLink>

      {item.subItems && (
        <Box
          sx={{
            maxHeight: isSubMenuOpen ? "200px" : "0px",
            opacity: isSubMenuOpen ? 1 : 0,
            overflow: "hidden",
            transition: "max-height 0.3s ease, opacity 0.3s ease",
            marginLeft: 0.6,
          }}
        >
          <ul
            style={{ borderColor: `${navTextColor}90` }}
            className="flex flex-col gap-4 pl-6 border-l border-dashed ml-5 mb-3 pt-3"
          >
            {item.subItems.map((subItem) => (
              <NavLink
                key={subItem.id}
                to={subItem?.path}
                style={({ isActive }) => ({
                  color: isActive ? isActiveText : navTextColor,
                  transition: "color 0.1s ease-in-out",
                })}
              >
                {subItem.label}
              </NavLink>
            ))}
          </ul>
        </Box>
      )}
    </>
  );
}

export const navItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/",
    icon: <MdDashboard />,
  },
  {
    id: "products",
    label: "Products",
    icon: <FaProductHunt />,
    path: "products",
    subItems: [
      {
        id: "product-list",
        label: "Product List",
        path: "/products/list",
      },
      {
        id: "product-view",
        label: "Product View",
        path: "/products/view",
      },
      {
        id: "product-upload",
        label: "Product Upload",
        path: "/products/upload",
      },
    ],
  },
  {
    id: "orders",
    label: "Orders",
    icon: <FaCartArrowDown />,
    path: "orders",
    subItems: [
      { id: "all-orders", label: "Orders List", path: "/orders/list" },
      {
        id: "pending-orders",
        label: "Pending Orders",
        path: "/orders/pending",
      },
      {
        id: "completed-orders",
        label: "Completed Orders",
        path: "/orders/completed",
      },
    ],
  },
  {
    id: "message",
    label: "Message",
    icon: <MdMessage />,
    path: "message",
    subItems: [
      {
        id: "message",
        label: "Contact Message",
        path: "/message/contact",
      },
      {
        id: "reviews",
        label: "Reviews",
        path: "/message/review",
      },
    ],
  },
  {
    id: "category",
    label: "Category",
    icon: <MdCategory />,
    path: "category",
    subItems: [
      {
        id: "product-category",
        label: "Product Category",
        path: "/category/product",
      },
      {
        id: "brand-category",
        label: "Brand Category",
        path: "/category/brand",
      },
      {
        id: "color-category",
        label: "Color Category",
        path: "/category/color",
      },
    ],
  },
  {
    id: "notification",
    label: "Notification",
    path: "/notification",
    icon: <MdNotificationsActive />,
  },

  {
    id: "login",
    label: "Login",
    path: "/login",
    icon: <RiLoginCircleLine />,
  },
];
