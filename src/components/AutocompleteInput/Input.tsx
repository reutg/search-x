import React from "react";
import { Search } from "@styled-icons/bootstrap/Search";
import { Close } from "@styled-icons/material/Close";

interface IProps {
  handleSearch(value: string): void;
  onSearch(value: string): void;
}

export const Input: React.FC<IProps> = (props: IProps) => {
  const [value, setValue] = React.useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    props.handleSearch(event.target.value);
  };

  const onSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    props.onSearch(value);
    clearInput();
  };

  const clearInput = () => {
    setValue("");
    props.handleSearch("");
  };

  return (
    <form noValidate onSubmit={onSearch}>
      <div className="input-content">
        <Search size={14} className="search-icon" />
        <input
          autoFocus
          className="search-input"
          name="search"
          onChange={handleChange}
          value={value}
          placeholder="Search..."
        />

        {!!value.length && (
          <Close size={20} className="clear-icon" onClick={clearInput} />
        )}
      </div>
    </form>
  );
};
