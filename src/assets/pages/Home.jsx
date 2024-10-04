/* eslint-disable react/prop-types */
import NavBar from './NavBar';
import Footer from './Footer';
import StartPage from './StartPage';
import { Outlet } from 'react-router-dom';
import Content from './Content';

export default function Home() {
  return (
    <div>
      <NavBar />
      <StartPage />

      <Content />

      <Outlet />
      <Footer />
    </div>
  );
}
