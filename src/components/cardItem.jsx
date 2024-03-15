import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'

export const CardItem = ({_id, title, description, price, stock, thumbnail, category }) => {

    return (
        <Card sx={{ maxWidth: 345 }} className='cardProduct'>
            <CardHeader
                title={title}
                subheader={category}
            />
            <CardMedia
                component="img"
                height="194"
                image={thumbnail}
                alt="logo"
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {description}
                </Typography>
                <p className='price'><span>$</span> {price}</p>
            </CardContent>
            <CardActions>
                <IconButton>
                    <FavoriteIcon />
                </IconButton>
                <Typography variant="body2" color="text.secondary">
                    Stock: <span>{stock}</span>
                </Typography>
                <IconButton className='cardCart'>
                    <ShoppingCartOutlinedIcon />
                </IconButton>
            </CardActions>
        </Card>
    )
}
