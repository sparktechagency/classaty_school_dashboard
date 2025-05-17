import { JSX } from "react";
import { NavLink } from "react-router-dom";

// Define types for the input item and child item
interface SidebarItem {
  key: string;
  path?: string;
  name?: string;
  icon?: string;
  children?: SidebarItem[]; // Recursive type for nested children
}

// Define the structure of the sidebar item object that will be returned
interface SidebarMenuItem {
  key: string;
  icon: JSX.Element | null;
  label: JSX.Element;
  children?: SidebarMenuItem[]; // Nested items can also follow this structure
}

export const sidebarItemsGenerator = (
  items: SidebarItem[],
  role: string
): SidebarMenuItem[] => {
  const sidebarItems = items.reduce<SidebarMenuItem[]>((acc, item) => {
    // Add main item if it has path and name
    if (item.path && item.name) {
      acc.push({
        key: item.key,
        icon: item.icon ? (
          <img
            src={item.icon}
            alt="icon"
            width={20}
            style={{
              marginRight: "5px",
              filter: location.pathname.includes(item.path)
                ? "invert(90%) sepia(10%) saturate(9990%) hue-rotate(160deg) brightness(100%) contrast(100%)"
                : undefined,
            }}
          />
        ) : null,
        label: <NavLink to={`/${role}/${item.path}`}>{item.name}</NavLink>,
      });
    }

    // Add children if present
    if (item.children && item.children.length > 0) {
      acc.push({
        key: item.key,
        icon: item.icon ? (
          <img
            src={item.icon}
            alt="icon"
            width={20}
            style={{
              marginRight: "5px",
              filter: location.pathname.includes(item.key as string)
                ? "invert(90%) sepia(10%) saturate(9990%) hue-rotate(160deg) brightness(100%) contrast(100%)"
                : undefined,
            }}
          />
        ) : null,
        label: <span className="">{item.name}</span>,
        children: item.children
          .filter((child) => child.name) // Ensure child has a name
          .map((child) => ({
            key: child.key,
            icon: child.icon ? (
              <img
                src={child.icon}
                alt="icon"
                className="w-5 h-5"
                style={{
                  marginRight: "0px",
                  filter: location.pathname.includes(child.path as string)
                    ? "invert(30%) sepia(86%) saturate(428%) hue-rotate(359deg) brightness(105%) contrast(103%)"
                    : undefined,
                }}
              />
            ) : null,
            label: (
              <NavLink to={`/${role}/${child.path}`}>{child.name}</NavLink>
            ),
          })),
      });
    }

    return acc;
  }, []); // Make sure to initialize the accumulator as an empty array

  return sidebarItems;
};
