import { useEffect, FC, useState } from "react";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Search from "./search";
import Link from "next/link";
import Details from "@/src/Details";
export interface UserData {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
  birthDate: string;
  gender: string;
  image: string;
  email: string;
  phone:string
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundImage: "linear-gradient(#D7A979, #AB7942)",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const listStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  my: "10px",
};

const ListAll: FC = () => {
  const [users, setUsers] = useState<UserData[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<UserData[]>([]);
  const [showDetails, setShowDetails] =useState(false);
  const [currentUser, setCurrentUser] =useState<UserData |null>(null)
  //On page load fetch the data
  useEffect(() => {
    fetch("https://dummyjson.com/users?limit=10")
      .then((res) => res.json())
      .then((json) => {
        console.log(json.users);
        setUsers(json.users);
        setFilteredUsers(json.users)
      });
  }, []);

  //show details when the name is clicked
  const handleDetails = (id:string) => {
    console.log("id",id)
    const user = users.find((tempUser) => tempUser.id === id )
    setCurrentUser(user!)
    setShowDetails(true)
  }

  //Hide details modal when closed
  const handleClose = () => {
    setCurrentUser(null);
    setShowDetails(false)

  }

  //Show search resuls in table. If no search then show full list
  const handleTableContent = (usersList: UserData[]) => {
    setFilteredUsers(usersList)
  }
  return (
    <>
    <Search users={users}  handleTableContent={handleTableContent}/>
      <Box sx={listStyle} id="listBox">
        
        {/* Show data in a table format */}
        <TableContainer component={Paper} sx={{ width: "50vw" }}>
          <Table aria-label="customized table">
            {/*Table Header */}
            <TableHead>
              <TableRow>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell align="right">Phone</StyledTableCell>
                <StyledTableCell align="right">Email</StyledTableCell>
              </TableRow>
            </TableHead>
            {/* Table Body */}
            <TableBody>
              {filteredUsers &&
                filteredUsers.map((user) => (
                  <StyledTableRow key={user.firstName}>
                    <StyledTableCell component="th" scope="row" onClick={ () => handleDetails(user.id)}>
                      <Link href="">
                        {user.firstName}&nbsp;{user.lastName}
                      </Link>
                    </StyledTableCell>
                    <StyledTableCell align="right">{user.phone}</StyledTableCell>
                    <StyledTableCell align="right">
                      {user.email}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      
      {showDetails && <Details user={currentUser as UserData} open={showDetails} handleClose={handleClose}/>}
    </>
  );
};

export default ListAll;
