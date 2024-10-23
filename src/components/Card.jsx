import "./card.css";
import Nopriority from "../assets/Nopriority.svg";
import ImgHighPriority from "../assets/ImgHighPriority.svg";
import ImgMediumPriority from "../assets/ImgMediumPriority.svg";
import ImgLowPriority from "../assets/ImgLowPriority.svg";
import SVGUrgentPrioritygrey from "../assets/SVGUrgentPrioritygrey.svg";
import Backlog from "../assets/Backlog.svg";
import Todo from "../assets/Todo.svg";
import Inprogress from "../assets/Inprogress.svg";
import Done from "../assets/Done.svg";


const Card = ({ id, title, tag, userid, status, priority }) => {
  var settag;
  const priorityMap = new Map([
    [4, SVGUrgentPrioritygrey],
    [3, ImgHighPriority],
    [2, ImgMediumPriority],
    [1, ImgLowPriority],
    [0, Nopriority]
  ]);

  const completionMap = new Map(
    [
        ["Todo",Todo],
        ["In progress",Inprogress],
        ["Backlog",Backlog],
        ["Done",Done]
    ]);

  const priorityStatusIcon = priorityMap.get(priority);
  const completionStatusIcon=completionMap.get(status);

  if (tag !== null) {
    //document.getElementById("id").getElementsByClassName("card-tag-holders").style='display:block';
    settag = tag;
  }
  return (
    <div id="id" className="card-component">
      <div className="card-id">{id}</div>
      <div className="card-title"><img src={completionStatusIcon} alt="priority-status" /> {title}</div>
      <div className="card-tags">
        <div className="card-priority-holders">
          <img src={priorityStatusIcon} alt="priority-status" />
        </div>
        <div className="card-tag-holders"><span className="dot"></span>{settag}</div>
      </div>
    </div>
  );
};
export default Card;
