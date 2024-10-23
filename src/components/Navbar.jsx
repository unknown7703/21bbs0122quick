import "./navbar.css";
import  Display from '../assets/Display.svg';
import  Down from '../assets/Down.svg';
const Navbar = () => {
  
  return (
    <div className="navbar">
      <button className="display-button">
      <img src={Display} alt="display-logo"/>
        Display
        <img src={Down} alt="down-logo"/>
      </button>
    </div>
  );
};
export default Navbar;
