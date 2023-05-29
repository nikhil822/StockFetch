import React, { useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { Stack, TextField, Grid } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import SendMessages from "./sendMessages";
import "./dashboard.css";
import { useState } from "react";
import axios from "axios";

const dashboard = () => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [stock, setStock] = useState({});
  const [openE, setOpenE] = useState(false);
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [price, setPrice] = useState("");
  const [openW, setOpenW] = useState(false);

  const url =
    `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=IBM&apikey=${import.meta.env.API}`;

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const response = await fetch(url);
        const result = await response.json();
        setStock(result["Time Series (Daily)"]);
      } catch (error) {
        console.error(error);
      }
    };
    fetchInfo();
  }, []);

  const handleSend = () => {
    axios.post(`http://localhost:8080/api/mail/sendemail`, {
            email: email,
            date: date,
            price: price,
        }).then((res) => {
            console.log({email, date, price})
            console.log("Mail Sent Successfully")
        }).catch((err) => {
            console.log(err.response.data.error)
        })
  }


  const handleClickOpenE = (date, price) => {
    setDate(date);
    setPrice(price);
    setOpenE(true);
  };

  const handleCloseE = () => {
    setOpenE(false);
  };

  const handleClickOpenW = (date, price) => {
    setOpenW(true);
  };

  const handleCloseW = () => {
    setOpenW(false);
  };

  return (
    <Stack>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to='/dashboard' style={{textDecoration: 'none', color: 'white'}}>DASHBOARD</Link>
            </Typography>
            <Button
              color="inherit"
              onClick={() => {
                localStorage.removeItem("auth");
                navigate('/')
              }}
            >
              Logout
            </Button>
          </Toolbar>
        </AppBar>
      </Box>

      <Grid
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        marginTop={"20px"}
      >
        {stock &&
          Object.entries(stock).map(([key, value]) => {
            return (
              <Grid key={key} item xs={3}>
                <Card sx={{ minWidth: 275 }}>
                  <CardContent>
                    <Typography variant="h5" component="div">
                      {key.split("-").reverse().join("-")}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                      Rs {value["1. open"]}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" onClick={() => handleClickOpenE(key.split("-").reverse().join("-"), value["1. open"])}>
                      Email
                    </Button>
                    <Button size="small" onClick={handleClickOpenW}>Whatsapp</Button>
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
      </Grid>
      <Dialog open={openE} onClose={handleCloseE}>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => { handleCloseE(); handleSend(); }}>
            Send
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openW} onClose={handleCloseW}>
        <SendMessages />
      </Dialog>
    </Stack>
  );
};

export default dashboard;