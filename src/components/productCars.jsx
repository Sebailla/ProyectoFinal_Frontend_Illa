import { Grid } from '@mui/material';
import { useProductStore } from '../hooks/useProductStore';
import { CardItem } from './cardItem';

export const ProductCard = () => {

    const { products } = useProductStore()

    return (

        <div className='products'>
            <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }} >
                {   
                    products?.map(product => (
                        <Grid key={product._id} item xs={12} sm={4} md={4} >
                            <CardItem {...product} />
                        </Grid>
                    ))
                }
            </Grid>
        </div>



    );
}
