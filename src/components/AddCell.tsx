import { FC } from "react";
import { FaPlus } from "react-icons/fa";
import { useActions } from "../hooks/useActions";

import "./AddCell.css";

interface AddCellProps {
  nextCellId: string | null;
  forceVisible?: boolean;
}

const AddCell: FC<AddCellProps> = ({ nextCellId, forceVisible }) => {
  const { insertCellBefore } = useActions();

  return (
    <div className={`add-cell ${forceVisible && "force-visible"}`}>
      <div className="add-buttons">
        <button
          className="button is-rounded is-primary is-small"
          onClick={() => insertCellBefore(nextCellId, "code")}
        >
          <span className="icon is-small">
            <FaPlus />
          </span>
          <span>Code</span>
        </button>
        <button
          className="button is-rounded is-primary is-small"
          onClick={() => insertCellBefore(nextCellId, "text")}
        >
          <span className="icon is-small">
            <FaPlus />
          </span>
          <span>Text</span>
        </button>
      </div>
      <div className="divider"></div>
    </div>
  );
};

export default AddCell;
