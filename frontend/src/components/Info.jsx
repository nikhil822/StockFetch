import React from 'react'
import Box from "@mui/material/Box";
import {
    Button,
    Card,
    CardActions,
    CardContent,
    Stack,
    Typography,
  } from "@mui/material";
const Info = ({key,data, handleState}) => {
  // console.log(key)
  return (
    <div>
        <Box sx={{ margin: 3, boxShadow:"#2E3B55" }} gridColumn="span 3">
          <Card>
            <CardContent>
              <Typography variant="h5">2023-05-24</Typography>
              <Typography sx={{ fontSize: 16 }}> Open:{data.open}</Typography>
              <Typography sx={{ fontSize: 16 }}> High{data.high} </Typography>
              <Typography sx={{ fontSize: 16 }}> Low{data.low}</Typography>
              <Typography sx={{ fontSize: 16 }}> Close{data.close}</Typography>
              <Typography sx={{ fontSize: 16 }}>
                Adjusted close:{data['adjusted close']}
              </Typography>
              <Typography sx={{ fontSize: 16 }}> Volume:{data.volume}</Typography>
              <Typography sx={{ fontSize: 16 }}>
            
                Dividend amount:{data['dividend amount']}
              </Typography>
              <Typography sx={{ fontSize: 16 }}>
                
                Split coefficient:{data['split coefficient']}
              </Typography>
            </CardContent>
            <CardActions sx={{display:'flex', justifyContent:"space-between"}}>
              <Stack
              direction="row" 
              spacing={1}
               
              >
                <Button sx={{backgroundColor:"#2E3B55", color:"#ffff"}}>Email</Button>
                <Button sx={{backgroundColor:"#2E3B55", color:"#ffff"} }  >WhatsApp</Button>
              </Stack>
            </CardActions>
          </Card>
        </Box>
    </div>
  )
}

export default Info