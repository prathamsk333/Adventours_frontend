import logo from '/AdvenTours.png';

export default function Footer() {
  return (
    <footer className="footer">
      <img src={logo} alt="logo" className='footer-logo'/>

      <div>
        <div>
          <ul className="footer-content">
            <li>
              <a className="footer-box" href="">
                About me
              </a>
            </li>
            <li>
              <a className="footer-box" href="">
                Become a guide
              </a>
            </li>
            <li>
              <a className="footer-box" href="">
                Contact
              </a>
            </li>
          </ul>
        </div>
        <div>
          <p className="copyright">&copy; 2024 Pratham S Kore</p>
        </div>
      </div>
    </footer>
  );
}
