import { useState } from "react";
import {
  Class,
  DungeonsAndDragons as IDungeonsAndDragons,
} from "../../models/Imodel";
import { Modal, Box, Typography } from "@mui/material";
import { getDragonData } from "../../features/dungeon-dragons/DungeonsAndDragonsSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/useTypedSelector";
import { DragonModelLoader } from "../Ui/DragonModelLoader";

interface DungeonsAndDragonsProps {
  dungeonsanddragons: IDungeonsAndDragons;
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const DungeonsAndDragons = ({
  dungeonsanddragons,
}: DungeonsAndDragonsProps) => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const { dragondata, dragonloading } = useAppSelector((state) => state);
  const { index, name, url } = dungeonsanddragons;

  const handleOpen = (url: string) => {
    setOpen(true);
    dispatch(getDragonData(url));
  };

  const handleClose = () => setOpen(false);

  return (
    <div>
      <div className="card">
        <div className="card-header">{index}</div>
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
          <div
            className="btn btn-sm btn-primary"
            onClick={() => handleOpen(url)}
          >
            Read More...
          </div>
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {dragonloading ? (
            <DragonModelLoader />
          ) : (
            <Box>
              <Typography id="modal-modal-title" variant="h5" component="h2">
                {dragondata?.name}
              </Typography>
              <hr />
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                {dragondata?.desc[0]}
              </Typography>
              <hr />
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Range : {dragondata?.range}
              </Typography>
              <hr />
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Level : {dragondata?.level}
              </Typography>
              <hr />
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Class :{" "}
                {dragondata?.classes.map((item: Class) => item.name + ",")}
              </Typography>
            </Box>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default DungeonsAndDragons;
