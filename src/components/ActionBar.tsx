import { FC } from "react";
import { FaArrowUp, FaArrowDown, FaTimes } from "react-icons/fa";
import { useActions } from "../hooks/useActions";
import "./ActionBar.css";

interface ActionBarProps {
  id: string;
}

const ActionBar: FC<ActionBarProps> = ({ id }) => {
  const { moveCell, deleteCell } = useActions();

  return (
    <div className="action-bar">
      <button
        className="button is-primary is-small"
        onClick={() => moveCell(id, "up")}
      >
        <span className="icon">
          <FaArrowUp />
        </span>
      </button>
      <button
        className="button is-primary is-small"
        onClick={() => moveCell(id, "down")}
      >
        <span className="icon">
          <FaArrowDown />
        </span>
      </button>
      <button
        className="button is-primary is-small"
        onClick={() => deleteCell(id)}
      >
        <span className="icon">
          <FaTimes />
        </span>
      </button>
    </div>
  );
};

export default ActionBar;
