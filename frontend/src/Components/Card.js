import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, sliderClasses } from '@mui/material';
import audio from '../Icons/audio.png';

const ActionAreaCard = (props) => {
  return (
    <Card sx={{ maxWidth: 250 , background:'linear-gradient(to right bottom, #02386E , #00498D)' , marginRight:'1.5rem' , marginBottom:'0.5rem' }}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h6" component="div" style={{color:"white"}}>
            {props.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" style={{color:"white"}}>
            {props.description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}


export default ActionAreaCard;