import { useEffect } from 'react';
import HomeNavbar from '../../componentes/navbar/HomeNavbar';
import './NotFoundPage.css'
import imagen404 from "../../../../assets/error404.jpg";
function NotFoundPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  })
  return (
    <>
      <HomeNavbar/>
      <div style={{
        margin:"auto",
        height:"100vh", 
        display:"flex",
        justifyContent:"center", 
        alignItems:"center"}}>
    	  <img alt="not-found" className="imagen-not-found" src={imagen404}/>
      </div>
    </>
  );
}

export default NotFoundPage;