import React from "react";
import { searchResultsData, autocompleteData } from "./metadata";
import "./App.css";
import { Input } from "./components/AutocompleteInput/Input";
import { SearchResults } from "./components/SearchResults/SearchResults";

import { AppContext, initialState } from "./context/context";
import AppReducer, {
  addToHistory,
  getHistoryFromStorage,
  removeFromHistory,
} from "./context/reducer";
import { AutocompleteValues } from "./components/AutocompleteInput/AutocompleteValues";

export interface SearchResult {
  id: string;
  title: string;
  link: string;
  description: string;
}

const App: React.FC = () => {
  const [state, dispatch] = React.useReducer(AppReducer, initialState);

  const [searchValues, setSearchValues] = React.useState<string[]>([]);
  const [searchResults, setSearchResults] = React.useState<SearchResult[]>([]);
  const [searchTime, setSearchTime] = React.useState(0);

  React.useEffect(() => {
    dispatch(getHistoryFromStorage());
  }, []);

  const handleChange = (value: string) => {
    let results: string[] = [];
    if (value.length) {
      results = autocompleteData.filter(
        (datum) =>
          datum.slice(0, value.length).toLowerCase() === value.toLowerCase()
      );
    }
    setSearchValues(results);
  };

  const onSearch = (value: string) => {
    const start = performance.now();
    const results = searchResultsData.filter((datum) =>
      datum.title.toLowerCase().includes(value.toLowerCase())
    );

    dispatch(addToHistory(value));
    setSearchResults(results);

    const end = performance.now();
    setSearchTime(end - start);
  };

  const remove = (value: string) => {
    dispatch(removeFromHistory(value));
  };

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <div className="App">
        <h1 className="header">
          <span style={{ color: "#4285F4" }}>S</span>
          <span style={{ color: "#DB4437" }}>e</span>
          <span style={{ color: "#DB4437" }}>a</span>
          <span style={{ color: "#F4B400" }}>r</span>
          <span style={{ color: "#F4B400" }}>c</span>
          <span style={{ color: "#0F9D58" }}>h</span>
          <span style={{ color: "#0F9D58" }}>-</span>
          <span style={{ color: "#4285F4" }}>X</span>
        </h1>

        <div style={{ width: "40%", margin: "auto" }} className="input-wrapper">
          <Input handleSearch={handleChange} onSearch={onSearch} />
          {<AutocompleteValues results={searchValues} onRemove={remove} />}
        </div>

        <SearchResults searchResults={searchResults} searchTime={searchTime} />
      </div>
    </AppContext.Provider>
  );
};

export default App;
