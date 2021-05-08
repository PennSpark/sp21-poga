import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import grey from '@material-ui/core/colors/grey';

// import tileData from './tileData';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  title: {
    color: grey[50],
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
}));

const tileData = [
  {
    img: "https://www.yogajournal.com/wp-content/uploads/2007/08/mountainhp2_292_37362_cmyk.jpg?crop=535:301&width=1070&enable=upscale",
    title: 'Tadasana',
    author: 'author',
  },
  {
     img: "https://media1.popsugar-assets.com/files/thumbor/HRIqxmAtFnIt6b4rykky1UGsBPA/fit-in/1024x1024/filters:format_auto-!!-:strip_icc-!!-/2015/08/18/908/n/1922729/4ff941bd_boat-3300-flip/i/Boat.jpg",
     title: 'Boat',
     author: 'author',
   },
   {
    img: "https://media1.popsugar-assets.com/files/thumbor/uDOCE6FcYv8wOzCDJg4toWBcAFc/fit-in/1024x1024/filters:format_auto-!!-:strip_icc-!!-/2015/08/18/908/n/1922729/25eb4948_Sage_865/i/Side-Plank.jpg",
    title: 'Side Plank',
    author: 'author',
  },
  {
    img: "https://media1.popsugar-assets.com/files/thumbor/HRIqxmAtFnIt6b4rykky1UGsBPA/fit-in/1024x1024/filters:format_auto-!!-:strip_icc-!!-/2015/08/18/908/n/1922729/4ff941bd_boat-3300-flip/i/Boat.jpg",
    title: 'Boat',
    author: 'author',
  },
 ];

// TODO: make the like functionality work here (if we want, we could also just keep it likes only in session?)
export default function ImageTable() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <GridList className={classes.gridList} cols={2.5}>
        {tileData.map((tile) => (
          <GridListTile key={tile.img}>
            <img src={tile.img} alt={tile.title} />
            <GridListTileBar
              title={tile.title}
              classes={{
                root: classes.titleBar,
                title: classes.title,
              }}
              actionIcon={
                <IconButton aria-label={`star ${tile.title}`}>
                  <FavoriteBorderIcon className={classes.title} />
                </IconButton>
              }
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}