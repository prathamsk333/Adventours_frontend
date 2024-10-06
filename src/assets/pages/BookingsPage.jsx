/* eslint-disable react/prop-types */
import NavBar from './NavBar';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';
import Bookings from './Bookings';

export default function BookingsPage() {
  return (
    <div>
      <NavBar homePage={true}/>

      <Bookings />
      <Footer />
    </div>
  );
}
