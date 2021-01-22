import { useContext } from 'react'
import { Grid, GridList } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import CartContext from '../../utils/CartContext'
import CatagoryCard from './CatagoryCard'
import OrderForm from './OrderForm'
import MenuItemTile from './MenuItemTile'

const useStyles = makeStyles((theme) => ({
 root: {
  flexGrow: 1,
  backgroundColor: 'rgb(245, 242, 230)',
  justifyContent: 'center',
 },
 gridList: {
  flexGrow: 1,
  overflow: 'hidden',
  // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
  transform: 'translateZ(0)',
 },
 title: {
  color: theme.palette.primary.light,
 },
 titleBar: {
  background:
   'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  // backgroundColor: "black"
 },
 control: {
  padding: theme.spacing(2),
 },
 tileBack: {
  backgroundColor: 'rgb(245, 242, 230)'
 },

}))

const MenuGrid = () => {
 const classes = useStyles()
 const {
  food,
  navFood,
  foodsByCatagory,
  catagory,
  catagories,
  editFood,
  handleSelectFood,
  handleChangeCatagory,
 } = useContext(CartContext)

 const renderMenu = () => {
  if (editFood !== '' || food !== '') {
   return <OrderForm />
  }
  if (catagory === '') {
   return catagories.map((cata, i) => {
    return (
     <>
      <Grid key={i} item>
       <CatagoryCard
        name={cata.name}
        image={cata.iamge}
        title={cata.name}
        click={() => handleChangeCatagory(i)}
       />
      </Grid>
     </>
    )
   })
  }
  if (navFood === '') {
   return (
    <GridList className={classes.gridList}>
     {foodsByCatagory.map((food, i) => (
      <MenuItemTile
       key={i}
       name={food.name}
       image={food.image}
       title={food.name}
       lowest={food.lowestPrice}
       highest={food.highestPrice}
       click={() => handleSelectFood(food._id)}
      />
     ))}
    </GridList>
   )
  }
  return <OrderForm />
 }
 return (
  <Grid container className={classes.root} xs={12}>
   {renderMenu()}
  </Grid>
 )
}

export default MenuGrid