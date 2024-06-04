import { useState, useMemo } from 'react';

interface NavProps {
  menuItem: string;
  url: string;
}

const NavData: NavProps[] = [
  {
    menuItem: 'Home',
    url: '/',
  },
  {
    menuItem: 'Stocks',
    url: '/stocks',
  },
];

const Navigation = () => {
  const [isActive, setActive] = useState(false);
  const handleMenuItemClick = (url: string) => {
    setActive(false);
    window.location.href = url;
  };

  const items = useMemo(() => NavData, []); // Memoize the menu items
  return (
    <div className="navigation w-100">
      <div className="navigation homemade-container-sm mx-auto d-flex align-items-center">
        <ul className="adNav__list">
          {items.map((item, index) => (
            <li
              className="d-inline-block decoration-none"
              key={index}
              role="presentation"
            >
              <a
                href={item.url}
                role="menuitem"
                onClick={() => handleMenuItemClick(item.url)}
              >
                {item.menuItem}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Navigation;
