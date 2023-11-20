"use client";

import Pagination from "@mui/material/Pagination";

type Props = {
  count: number;
  page: number;
  resultsPerPage: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
};

const PaginationComponent = ({
  count,
  page,
  setPage,
  resultsPerPage,
}: Props) => {
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const countPages = Math.ceil(count / resultsPerPage);
  return (
    <div className="flex justify-center my-10">
      <Pagination
        count={countPages}
        page={page}
        onChange={handleChange}
        size="large"
        color="primary"
      />
    </div>
  );
};

export default PaginationComponent;
