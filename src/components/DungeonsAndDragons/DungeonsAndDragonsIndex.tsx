import { FC, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/useTypedSelector";
import {
  addToFavorites,
  getData,
  removeFromFavorites,
} from "../../features/dungeon-dragons/DungeonsAndDragonsSlice";
import DungeonsAndDragons from "./DungeonsAndDragons";
import Loader from "../Ui/Loader";
import { DungeonsAndDragons as IDungeonsAndDragons } from "../../models/Imodel";
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import { TablePagination } from "@mui/material";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const DungeonsAndDragonsIndex: FC = () => {
  const dispatch = useAppDispatch();
  const { error, loading, data, favorites, searchQuery } = useAppSelector(
    (state) => state
  );

  const [filterdData, setFilterdData] = useState<IDungeonsAndDragons[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(50);

  useEffect(() => {
    if (!data?.length) {
      dispatch(getData());
      return;
    }
    if (searchQuery.trim() === "") {
      setFilterdData(data.slice(startIndex, endIndex));
    } else {
      const filteredData = data
        .slice(startIndex, endIndex)
        .filter((item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
      setFilterdData(filteredData);
    }
  }, [dispatch, data, startIndex, endIndex, setFilterdData, searchQuery]);

  const isItemInFavorites = (itemId: string) => {
    return favorites.some((item) => item.name === itemId);
  };

  const handleAddToFavorites = (item: IDungeonsAndDragons) => {
    dispatch(addToFavorites(item));
  };

  const handleRemoveFromFavorites = (item: IDungeonsAndDragons) => {
    dispatch(removeFromFavorites(item.name));
  };

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
    setStartIndex(newPage * rowsPerPage);
    setEndIndex((newPage + 1) * rowsPerPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (error) {
    return (
      <div className="handler-container">
        <h3>
          Something went Wrong <br /> {error}
        </h3>
      </div>
    );
  }

  if (!loading && filterdData.length === 0) {
    return (
      <div className="handler-container">
        <h3>No data found</h3>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <TablePagination
        component="div"
        count={data?.length ?? 100}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <div className="row">
        {loading ? (
          <Loader />
        ) : (
          filterdData &&
          filterdData.map((item) => (
            <div className="col-md-6 col-lg-3 mt-4" key={item.index}>
              <DungeonsAndDragons dungeonsanddragons={item} />
              <Checkbox
                {...label}
                icon={<FavoriteBorder />}
                checkedIcon={<Favorite sx={{ color: "red" }} />}
                checked={isItemInFavorites(item.name)}
                onChange={(event) =>
                  isItemInFavorites(item.name)
                    ? handleRemoveFromFavorites(item)
                    : handleAddToFavorites(item)
                }
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DungeonsAndDragonsIndex;
