import Head from "next/head";
import Box from "@mui/material/Box";
import ListAll from "./listAll";

const style = {
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
};
export default function Home() {
  return (
    <>
      <Head>
        <title>Sarch App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box sx={style}>
        <ListAll />
      </Box>
    </>
  );
}
