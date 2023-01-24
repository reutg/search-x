import React from "react";

import { AutocompleteItem } from "./AutocompleteItem";

interface IProps {
  results: string[];
  onRemove(value: string): void;
}

export const AutocompleteValues: React.FC<IProps> = (props: IProps) => {
  return (
    <div className="results-container">
      {props.results.map((result) => (
        <AutocompleteItem
          key={result}
          item={result}
          onRemove={props.onRemove}
        />
      ))}
    </div>
  );
};
