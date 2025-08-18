// src/modules/shared/components/NavLink.jsx
import { NavLink as RouterNavLink } from 'react-router-dom';

export function NavLinkCustom({ to, children, onClick, ...props }) {
  return (
    <RouterNavLink
      to={to}
      className={({ isActive }) =>
        `nav-link px-3 py-2 rounded-pill mx-1 nav-link-custom ${
          isActive ? 'active bg-primary text-white shadow-sm' : 'text-dark'
        }`
      }
      onClick={onClick}
      {...props}
    >
      {children}
    </RouterNavLink>
  );
}

export function NavLinkMobile({ to, children, onClick, ...props }) {
  return (
    <RouterNavLink
      to={to}
      className={({ isActive }) =>
        `nav-link px-3 py-2 ${isActive ? 'active' : ''}`
      }
      onClick={onClick}
      {...props}
    >
      {children}
    </RouterNavLink>
  );
}
