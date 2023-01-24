import React from "react";
import "./styles.css";
import { Search } from "@styled-icons/bootstrap/Search";
import { Clock } from "@styled-icons/bootstrap/Clock";
import { AppContext } from "../../context/context";

interface IProps {
  item: string;
  onRemove(item: string): void;
}

export const AutocompleteItem: React.FC<IProps> = (props: IProps) => {
  const { item } = props;
  const { state } = React.useContext(AppContext);

  const [visited, setVisited] = React.useState(
    state.history[item.toLowerCase()]
  );

  const Icon = visited ? Clock : Search;
  const color = visited ? "#52188C" : undefined;

  const handleRemove = () => {
    props.onRemove(item);
    setVisited(false);
  };

  return (
    <div className="autocomplete-item">
      <div className="autocomplete-text-wrapper">
        <Icon size={12} className="search-icon" />
        <p style={{ color, fontSize: 14 }}>{item}</p>
      </div>

      {visited && <button onClick={handleRemove}>remove</button>}
    </div>
  );
};
