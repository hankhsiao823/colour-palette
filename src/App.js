import { useEffect, useState } from "react";
import {
  Grid,
  Box,
  IconButton,
  Button,
  Typography,
  Slider,
  Fab,
} from "@mui/material";
import {ColorDialog,CopyDialog} from "./component/Dialog";
import rgbaToHex from "./component/rgbaToHex";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

function App() {
  const [red, setRed] = useState(100);
  const [green, setGreen] = useState(100);
  const [blue, setBlue] = useState(100);
  const [alpha, setAlpha] = useState(0.5);
  const [open, setOpen] = useState(false);
  const [copyOpen, setCopyOpen] = useState(false);
  const data = { red,green,blue,alpha,setRed, setGreen, setBlue, setAlpha, setOpen, open,copyOpen, setCopyOpen };

  const colorComponent = [
    {
      colorParam: red,
      colorBox: `rgba(${red},0,0)`,
      colorAddMethod: () => setRed(red + 1),
      colorMinusMethod: () => setRed(red - 1),
      colorTextField: () => setOpen("Red"),
    },
    {
      colorParam: green,
      colorBox: `rgba(0,${green},0)`,
      colorAddMethod: () => setGreen(green + 1),
      colorMinusMethod: () => setGreen(green - 1),
      colorTextField: () => setOpen("Green"),
    },
    {
      colorParam: blue,
      colorBox: `rgba(0,0,${blue})`,
      colorAddMethod: () => setBlue(blue + 1),
      colorMinusMethod: () => setBlue(blue - 1),
      colorTextField: () => setOpen("Blue"),
    },
  ];

  const handleHex = (red, green, blue) => {
    return rgbaToHex(red, green, blue);
  };

  return (
    <Grid container sx={{ height: "100vh" }}>
      <Grid container sx={{ height: "50%" }}>
        <Grid
          item
          xs={12}
          sx={{
            background: `rgba(${red},${green},${blue},${alpha})`,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            color:
              red >= 125 || green >= 125 || blue >= 125 || alpha <= 0.1
                ? "black"
                : "white",
          }}
        >
          <Typography variant="h6">
            Hex:{handleHex(red, green, blue)}
          </Typography>
          <Typography variant="h6">Opacity:{alpha * 100}%</Typography>
        </Grid>
      </Grid>
      <Grid
        item
        xs={12}
        sx={{
          display: "flex",
          height: "5%",
          justifyContent: "center",
          alignItems: "center",
          background: `rgba(0,0,0,${alpha})`,
        }}
      >
        <Typography
          sx={{
            mr: 2,
            fontSize: {xs:16,sm:24},
            fontWeight: "bold",
            color: alpha <= 0.5 ? "black" : "white",
          }}
        >
          A
        </Typography>
        <Box sx={{ width: "80%", height: 46,display: 'flex',alignItems:'center' }}>
          <Slider
            sx={{ color: alpha <= 0.5 ? "black" : "white" }}
            key={`slider-${alpha}`}
            defaultValue={alpha}
            valueLabelDisplay="auto"
            onChange={(e) => setAlpha(e.target.value)}
            step={0.1}
            min={0}
            max={1}
          />
        </Box>
      </Grid>
      <Grid container item sx={{ height: "45%" }}>
        {colorComponent.map((item, index) => {
          return (
            <Grid
              key={index}
              item
              xs={4}
              sx={{
                height: "100%",
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
                flexDirection: "column",
                backgroundColor: item.colorBox,
              }}
            >
              <Box sx={{ visibility: item.colorParam >= 255 && "hidden" }}>
                <IconButton
                  sx={{ color: item.colorParam >= 125 ? "black" : "white" }}
                  onClick={item.colorAddMethod}
                >
                  <KeyboardArrowUpIcon sx={{ fontSize: {xs:98,sm:112} }} />
                </IconButton>
              </Box>
              <Box>
                <Button onClick={item.colorTextField}>
                  <Typography
                    sx={{
                      color: item.colorParam >= 125 ? "black" : "white",
                      fontSize: {xs:16,sm:32,md:64},
                    }}
                  >
                    {index === 0 ? "R" : index === 1 ? "G" : "B"}(
                    {item.colorParam})
                  </Typography>
                </Button>
              </Box>
              <Box sx={{ visibility: item.colorParam <= 0 && "hidden" }}>
                <IconButton
                  sx={{ color: item.colorParam >= 125 ? "black" : "white" }}
                  onClick={item.colorMinusMethod}
                >
                  <KeyboardArrowDownIcon sx={{ fontSize:  {xs:98,sm:112} }} />
                </IconButton>
              </Box>
            </Grid>
          );
        })}
        <ColorDialog data={data} />
        <CopyDialog data={data}/>
        <Fab sx={{position:'absolute',bottom:{xs:5,sm:16},right:{xs:5,sm:16}}} onClick={()=>setCopyOpen(true)}>
          <ContentCopyIcon />
        </Fab>
      </Grid>
    </Grid>
  );

 
}

export default App;
