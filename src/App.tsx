import { FC } from "react";
import "bulmaswatch/superhero/bulmaswatch.min.css";
import CellList from "./components/CellList";
import { initializeBundle } from "./bundler";

const App: FC = () => {
  initializeBundle();
  return (
    <div>
      <CellList />
    </div>
  );
};

export default App;
