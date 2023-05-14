import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { UserData } from "./listAll";
const searchStyle = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "flex-end",
  alignItems:"center",
  marginTop: "10px",
    marginRight: "25%",
};

interface SearchProps{
    users:UserData[];
    handleTableContent:(usersList:UserData[]) => void
}
const Search:React.FC<SearchProps> = ({ users,handleTableContent }) => {
  
  //find all the users which have the word
  const handleSearch = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>): void => {
    const searchWord = target.value.toLowerCase();
    const filteredData = users.filter(
      (user) =>
        user.firstName.toLowerCase().includes(searchWord) ||
        user.lastName.toLowerCase().includes(searchWord)
    );
    // console.log(filteredData);
    if (!searchWord) {
        // if no search word available show the full list
        handleTableContent(users)
    //   return setSearchList([]);
    }
    handleTableContent(filteredData);
  };

  return (
    <Box sx={searchStyle} id="searchBox">
        <Typography variant="h5" sx={{color:"#191970", marginRight:"10%"}}> Contact List</Typography>
      <TextField
        variant="outlined"
        placeholder="Search Name"
        onChange={handleSearch}
        size="small"
      />
      {/* {searchList && (
        <List>
          {searchList.map((user) => (
            <>
              <ListItem disablePadding>
                <ListItemButton onClick={() => handleDetails(user.id)}>
                  <ListItemText
                    primary={`${user.firstName} ${user.lastName}`}
                  />
                </ListItemButton>
              </ListItem>
            </>
          ))}
        </List>
      )} */}
    </Box>
  );
};
export default Search;
