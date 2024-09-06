import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';
import { Context } from '../../Context';


export default function MediaCard() {
  const {countOfAssets, setCountOfAssets} = React.useContext(Context);
  useEffect(() => {
    const fetchCount = async () => {
      try {
        const response = await axios.get("http://localhost:5000/assetDetails");
        setCountOfAssets(response.data.length)
      } catch (error) {
        console.error("Error fetching the asset details", error);
      }
    };

    fetchCount();
  }, []);

  const navigate = useNavigate();
  const val = localStorage.getItem('count')==null?0:localStorage.getItem('count');
  return (
    <div className='card'>
    <div className='inncard'>
    <Card className='abc'>
      {/* <CardMedia
        sx={{ height: 140 }}
         image='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSA4tvfuY6oONwuGICt8cM3-uRsatsHeAnT1EJ4c_nCz1Zo1xdGydS_QuyLhukVktyXC-M&usqp=CAU'
        
      /> */}
      <div>
        <Typography className='textabc' gutterBottom variant="h4" component="div">
        {countOfAssets} 
        <Typography className= 'text-white ' gutterBottom variant="h6" component="div">
          total assets
        </Typography>
        <Typography className= 'text-white ' gutterBottom variant="h6" component="div">
          _______________
        </Typography>
        </Typography>
      </div>
      <CardContent>
      
      </CardContent>
      <CardActions className='cardshare'>
 
        <Button size="small" onClick={()=>navigate("/assetDetails")}>Learn More</Button>
      </CardActions>
    </Card>
    </div>
    <div className='inncard'>
    <Card className='abc'>
      {/* <CardMedia
        sx={{ height: 140 }}
         image='https://png.pngtree.com/thumb_back/fh260/background/20211110/pngtree-square-box-blue-abstract-background-image_915429.png'
      /> */}
      <div>
        <Typography className='textabc' gutterBottom variant="h4" component="div">
        103 
        <Typography className= 'text-white ' gutterBottom variant="h6" component="div">
          total licenses
        </Typography>
        <Typography className= 'text-white ' gutterBottom variant="h6" component="div">
          _______________
        </Typography>
        </Typography>
      </div>
      <CardContent></CardContent>
      <CardActions className='cardshare'>
 
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
    </div>
    <div className='inncard'>
    <Card className='abc' >
      {/* <CardMedia
        sx={{ height: 140 }}
         image='https://img.freepik.com/free-vector/gradient-futuristic-background-with-connection-concept_23-2149104857.jpg'
      /> */}
      <div>
        <Typography className='textabc' gutterBottom variant="h4" component="div">
        148 
        <Typography className= 'text-white ' gutterBottom variant="h6" component="div">
          total accessories
        </Typography>
        <Typography className= 'text-white ' gutterBottom variant="h6" component="div">
          _______________
        </Typography>
        </Typography>
      </div>
      <CardContent></CardContent>
      <CardActions className='cardshare'>
        
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
    </div>
    <div className='inncard'>
    <Card className='abc' >
      {/* <CardMedia
        sx={{ height: 140 }}
         image='https://t4.ftcdn.net/jpg/04/14/18/43/360_F_414184355_rYzi5ZmbLaq0c0P1fgz1hTfqOgSuvu7d.jpg'
      /> */}
      <div>
        <Typography className='textabc' gutterBottom variant="h4" component="div">
        98 
        <Typography className= 'text-white ' gutterBottom variant="h6" component="div">
          total consumables
        </Typography>
        <Typography className= 'text-white ' gutterBottom variant="h6" component="div">
          _______________
        </Typography>
        </Typography>

      </div>
      
      <CardContent></CardContent>
      <CardActions className='cardshare'>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
    </div>
    </div>
  );
}
