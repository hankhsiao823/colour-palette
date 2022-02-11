import { useForm, Controller } from "react-hook-form";
import {
  Button,
  Dialog,
  TextField,
  DialogContent,
  DialogActions,
  Paper,
  Typography,
  Tooltip,
} from "@mui/material";
import rgbaToHex from "./rgbaToHex";
import { Box } from "@mui/system";
import { useState } from "react";

function ColorDialog({ data }) {
  const { handleSubmit, control, resetField } = useForm();
  const { setRed, setGreen, setBlue, setOpen, open } = data;

  const handleClose = () => {
    setOpen(false);
  };

  const handleColor = (data) => {
    resetField("colorNumber");
    // console.log(data);
    switch (open) {
      case "Red":
        setRed(Number(data.colorNumber));
        setOpen(false);
        break;
      case "Blue":
        setBlue(Number(data.colorNumber));
        setOpen(false);
        break;
      case "Green":
        setGreen(Number(data.colorNumber));
        setOpen(false);
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <Dialog open={open && true}>
        <DialogContent>
          <Controller
            name="colorNumber"
            control={control}
            rules={{
              required: false,
              validate: (value) =>
                (value >= 0 && value <= 255) || "輸入的值請在0~255之間",
            }}
            render={({ field, fieldState: { error } }) => (
              <TextField
                type="number"
                {...field}
                onChange={field.onChange}
                value={field.value || ""}
                error={error}
                helperText={error && error.message}
                fullWidth
              />
            )}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>取消</Button>
          <Button onClick={handleSubmit(handleColor)}>確認</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

function CopyDialog({ data }) {
  const { red, green, blue, alpha, copyOpen, setCopyOpen } = data;
  const [copy, setCopy] = useState("copy");

  const handleClose = () => {
    setCopyOpen(false);
  };

  const handleHex = (red, green, blue) => {
    return rgbaToHex(red, green, blue);
  };

  const copyRgbaToClipBoard = (str) => {
    navigator.clipboard.writeText(str);
    setCopy("copied");
  };

  const copyHexToClipBoard = (str) => {
    navigator.clipboard.writeText(str);
    setCopy("copied");
  };

  return (
    <Dialog open={copyOpen} onClose={handleClose}>
      <DialogContent
        sx={{
          width: 330,
          height: 250,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          px: 1,
        }}
      >
        <Typography sx={{ my: 1 }}>RGBA</Typography>
        <Tooltip title={copy} placement="top" arrow>
          <Paper
            elevation={24}
            onClick={() =>
              copyRgbaToClipBoard(
                `background-color:'rgba(${red},${green},${blue},${alpha})'`
              )
            }
            onMouseEnter={() => setCopy("copy")}
            sx={{
              backgroundColor: "rgb(0, 30, 60)",
              border: "1px solid rgb(19, 47, 76)",
              color: "#fff",
              p: 1,
              cursor: "pointer",
            }}
          >
            <Box component="span" sx={{ color: "#f92672" }}>
              background-color
            </Box>{" "}
            :{" "}
            <Box component="span" sx={{ color: "#a6e22e" }}>
              'rgba({`${red},${green},${blue},${alpha}`})'
            </Box>
          </Paper>
        </Tooltip>
        <Typography sx={{ my: 1 }}>HEX</Typography>
        <Tooltip title={copy} placement="top" arrow>
          <Paper
            elevation={24}
            onClick={() =>
              copyHexToClipBoard(
                "background-color:" +
                  handleHex(red, green, blue) +
                  ",opacity:" +
                  alpha * 100 +
                  "%"
              )
            }
            onMouseEnter={() => setCopy("copy")}
            sx={{
              backgroundColor: "rgb(0, 30, 60)",
              border: "1px solid rgb(19, 47, 76)",
              color: "#fff",
              p: 1,
              cursor: "pointer",
            }}
          >
            <Box component="span" sx={{ color: "#f92672" }}>
              background-color
            </Box>{" "}
            :{" "}
            <Box component="span" sx={{ color: "#a6e22e" }}>
              '{handleHex(red, green, blue)}'
            </Box>
            <br />
            <Box component="span" sx={{ color: "#f92672" }}>
              opacity
            </Box>{" "}
            :{" "}
            <Box component="span" sx={{ color: "#a6e22e" }}>
              '{alpha * 100}%'
            </Box>
          </Paper>
        </Tooltip>
        <Button sx={{ mt: 2 }} variant="contained" onClick={handleClose}>
          返回
        </Button>
      </DialogContent>
    </Dialog>
  );
}

export { ColorDialog, CopyDialog };
