import { FC } from "react";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

export const DragonModelLoader: FC = () => {
  return (
    <Stack spacing={0}>
      <Skeleton
        variant="text"
        sx={{ fontSize: "3rem" }}
        width={300}
        height={30}
      />
      <hr />
      <Skeleton
        variant="text"
        sx={{ fontSize: "2rem" }}
        width={300}
        height={200}
      />
      <hr />
      <Skeleton variant="rounded" width={100} height={30} />
      <hr />
      <Skeleton variant="rounded" width={100} height={30} />
      <hr />
      <Skeleton variant="rounded" width={100} height={30} />
    </Stack>
  );
};
