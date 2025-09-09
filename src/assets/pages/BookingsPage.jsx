/* eslint-disable react/prop-types */
import NavBar from './NavBar';
import Footer from './Footer';
import Bookings from './Bookings';

export default function BookingsPage() {
  return (
    <div>
      <NavBar homePage={true}/>
      <div className='w-full h-[4rem]'></div>

      <Bookings />
      <Footer />
    </div>
  );
}
