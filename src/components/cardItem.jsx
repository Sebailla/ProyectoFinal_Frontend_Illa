import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'
import { useNavigate } from 'react-router-dom';
import { useProductStore } from '../hooks/useProductStore';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { useAuthStore } from '../hooks/useAuthStore';


export const CardItem = (product) => {

    const { _id, title, description, price, stock, thumbnail, category, code } = product

    const { startViewProduct } = useProductStore()
    const navigate = useNavigate()

    const onClickCard = () => {
        navigate(`/product/${_id}`)
        startViewProduct({ _id, title, description, price, stock, thumbnail, category, code })
    }

    const { isAdmin } = useAuthStore()

    return (
        <Card sx={{ maxWidth: 345 }} className='cardProduct'>
            <CardHeader
                title={title}
                subheader={category}
                onClick={onClickCard}
            />
            <CardMedia
                component="img"
                height="194"
                image={thumbnail}
                alt="logo"
                onClick={onClickCard}
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {description}
                </Typography>
                <p className='price' onClick={onClickCard}><span>$</span> {price}</p>
            </CardContent>
            <CardActions>
                <div className='cardActionLeft'>
                    <Typography variant="body2" color="text.secondary">
                        Stock: <span>{stock}</span>
                    </Typography>
                </div>

                {/* <div className='cardActionRight'>
                    {
                        isAdmin &&
                        <>
                            <IconButton className='cardCart'>
                                <EditNoteIcon />
                            </IconButton>
                            <IconButton className='cardCart'>
                                <DeleteForeverIcon />
                            </IconButton>
                        </>
                    }
                    <IconButton className='cardCart'>
                        <ShoppingCartOutlinedIcon />
                    </IconButton>
                </div> */}


            </CardActions>
        </Card>
    )
}
