import './board.css';
import Card from './Card';
const Board = () => {
  return (<div id="board" className="board-component">
    <Card id='CAM-1' title='Get getElementById' tag="Feature Request" userid="122" status="Todo" priority={2} />
    </div>);
};
export default Board;
