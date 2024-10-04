import Footer from './Footer';
import NavBar from './NavBar';

export default function NotFound() {
  return (
    <>
      <NavBar homePage={true} />
      <div className="w-full h-screen flex justify-center items-center flex-col">
        <div className='text-red-500 mt-20 text-5xl overflow-hidden'>Error! Could not find the route.</div>
        <div className='text-slate-700 mt-20 text-2xl overflow-hidden'>Try again using valid route </div>

      </div>

      <Footer />
    </>
  );
}
