import { useEffect } from 'react';
import HomeNavbar from '../../componentes/navbar/HomeNavbar';
import './NotFoundPage.css'
function NotFoundPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  })
  return (
    <>
      <HomeNavbar/>
      <h1 className="not-found-text">Pagina no encontrada</h1>
    </>
  );
}

export default NotFoundPage;