import React from "react";
import { ChevronLeft } from "@styled-icons/boxicons-regular/ChevronLeft";
import { ChevronRight } from "@styled-icons/boxicons-regular/ChevronRight";

import "./styles.css";

interface IProps {
  totalPages: number;
  currentPage: number;
  paginate(num: number): void;
}

export const Pagination: React.FC<IProps> = (props: IProps) => {
  const { totalPages, currentPage } = props;
  const pages = Array.from(Array(totalPages).keys()).map((page) => page + 1);

  const clickBack = () => {
    props.paginate(-1);
  };

  const clickNext = () => {
    props.paginate(1);
  };

  return (
    <div className="pagination-container">
      <IconButton
        Icon={ChevronLeft}
        onClick={clickBack}
        disabled={currentPage === 1}
      />
      {pages.map((page) => (
        <p
          key={page}
          style={{
            fontWeight: currentPage === page ? "bold" : "normal",
            color: currentPage === page ? "#4285F4" : undefined,
          }}
        >
          {page}
        </p>
      ))}

      <IconButton
        Icon={ChevronRight}
        onClick={clickNext}
        disabled={currentPage === totalPages}
      />
    </div>
  );
};

interface IconProps {
  Icon: any;
  disabled?: boolean;
  onClick(): void;
}

const IconButton = (props: IconProps) => {
  const { Icon } = props;
  return (
    <button onClick={props.onClick} disabled={props.disabled}>
      <Icon size={20} />
    </button>
  );
};
