import {makeStyles} from "@material-ui/core/styles/index";

const drawerWidth = 320;

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    display: 'flex',
  },
  left: {
    width: drawerWidth,
  },
  menuContent: {
    padding: theme.spacing(2),
  },
  map: {
    position: 'relative',
    flex: 1,
  },
  fab: {
    position: 'absolute',
    top: theme.spacing(2),
    left: theme.spacing(2),
  },
  menuButton: {
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: 0,
  },
}));

export default useStyles;
