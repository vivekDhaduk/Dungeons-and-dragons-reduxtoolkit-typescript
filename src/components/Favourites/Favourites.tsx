import { Checkbox } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../hooks/useTypedSelector";
import DungeonsAndDragons from "../DungeonsAndDragons/DungeonsAndDragons";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import { DungeonsAndDragons as IDungeonsAndDragons } from "../../models/Imodel";
import {
  addToFavorites,
  removeFromFavorites,
} from "../../features/dungeon-dragons/DungeonsAndDragonsSlice";

const Favourites = () => {
  const dispatch = useAppDispatch();

  const { favorites } = useAppSelector((state) => state);

  const isItemInFavorites = (itemId: string) => {
    return favorites.some((item) => item.name === itemId);
  };

  const handleAddToFavorites = (item: IDungeonsAndDragons) => {
    dispatch(addToFavorites(item));
  };

  const handleRemoveFromFavorites = (item: IDungeonsAndDragons) => {
    dispatch(removeFromFavorites(item.name));
  };

  if (favorites.length === 0) {
    return (
      <div className="handler-container">
        <h3>No Favorite items are there</h3>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="row">
        {favorites &&
          favorites.map((item) => (
            <div className="col-md-6 col-lg-3 mt-4" key={item.index}>
              <DungeonsAndDragons dungeonsanddragons={item} />
              <Checkbox
                icon={<FavoriteBorder />}
                checkedIcon={<Favorite sx={{ color: "red" }} />}
                checked={isItemInFavorites(item.name)}
                onChange={() =>
                  isItemInFavorites(item.name)
                    ? handleRemoveFromFavorites(item)
                    : handleAddToFavorites(item)
                }
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Favourites;
