import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// ------------------------scroll window to top when navigate to another page--------------------- //

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
