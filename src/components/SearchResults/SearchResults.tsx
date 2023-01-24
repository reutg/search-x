import React from "react";
import "./styles.css";
import { SearchResult } from "../../App";
import { Divider } from "../Divider";
import { Pagination } from "../Pagination/Pagination";

interface IProps {
  searchResults: SearchResult[];
  searchTime: number;
}

export const SearchResults: React.FC<IProps> = (props: IProps) => {
  const { searchResults, searchTime } = props;

  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(searchResults.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = searchResults.slice(indexOfFirstItem, indexOfLastItem);

  if (searchResults.length === 0) {
    return <></>;
  }

  const paginate = (num: number) => {
    setCurrentPage((prevPage) => prevPage + num);
  };

  return (
    <div>
      <Divider />
      <div className="search-results-container">
        <p style={{ color: "#70757a", fontSize: 14 }}>
          {`${searchResults.length} results (${searchTime} seconds)`}
        </p>
        {currentItems.map((result) => (
          <div className="result" key={result.id}>
            <a href={result.link}>
              <h4>{result.title}</h4>
            </a>
            <p>{result.description}</p>
          </div>
        ))}
      </div>

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        paginate={paginate}
      />
    </div>
  );
};
