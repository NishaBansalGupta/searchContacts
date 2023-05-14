import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { UserData } from "@/pages/listAll";

interface MatchParams {
  open: boolean;
  handleClose: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  user: UserData;
}
const style = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  position: "absolute" as "absolute",
  top: "20%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60%",
  bgcolor: "#dae3f3", //'background.paper', //98bbed
  border: "4px solid #191970",
  boxShadow: 24,
  p: 4,
};

const Details: React.FC<MatchParams> = ({
  open,
  user,
  handleClose,
}): JSX.Element => {
    const imgSrc= user.image
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography variant="h4" sx={{ color: "#191970" }}>
            
            User Details
          </Typography>
          <img src={imgSrc} alt="" width={50} height={50}/>
          <CustomText>
            Name: {user.firstName} {user.lastName}
          </CustomText>
          <CustomText>Age: {user.age}</CustomText>
          <CustomText>Birth Date: {user.birthDate}</CustomText>
          <CustomText>Gender: {user.gender}</CustomText>
          <CustomText>Email: {user.email}</CustomText>
          <CustomText>Phone: {user.phone}</CustomText>
          
        </Box>
      </Modal>
    </div>
  );
};

export default Details;

interface Props {
  children: React.ReactNode;
}
const CustomText: React.FC<Props> = ({ children }: Props) => {
  return (
    <Typography
      sx={{
        py: "10px",
      }}
    >
      {children}
    </Typography>
  );
};
