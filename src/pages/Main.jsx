import './main.css'
import Navbar from "../components/Navbar";
import Board from '../components/Board';
const Main =()=> {
    return(
        <div className="main-component">
            <Navbar/>
            <Board/>
        </div>
    );
}

export default Main;