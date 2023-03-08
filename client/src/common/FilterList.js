// React
import * as React from 'react';
import {useContext} from "react";
// MUI
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Star from '@mui/icons-material/Star';
import {ListItem, Switch} from "@mui/material";
// source
import StoreContext from "./Store";
import {FilterType} from './Enums';

export default function NestedList() {
    const { store } = useContext(StoreContext);
    const [open, setOpen] = React.useState(true);
    const label = { inputProps: { 'aria-label': 'Switch demo' } };
    const onListClick = () => {
        setOpen(!open);
    };

    const onToggle = (e, filterType) => {
        (e.target.checked)? store.addFilter(filterType) : store.removeFilter(filterType)
    };

    return (
        <List
            sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
            component="nav"
            aria-labelledby="nested-list-subheader"
        >
            <ListItemButton onClick={onListClick} sx={{ pl: 2}}>
                <ListItemIcon>
                    <Star />
                </ListItemIcon>
                <ListItemText style={{position:"absolute", left:'48px'}} primary="Filter" primaryTypographyProps={{fontSize: store.sx.drawerList.mainFontSize}} />
                {open ? <ExpandLess style={{position:"absolute", left:'160px'}} /> : <ExpandMore style={{position:"absolute", left:'160px'}} />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItem sx={{ pl: 6 }}>
                        <ListItemText primary="Democrat" primaryTypographyProps={{fontSize: store.sx.drawerList.subFontSize}}/>
                        <Switch {...label} size="small" onClick={(e) => {onToggle(e, FilterType.DEMOCRAT)}}/>
                    </ListItem>
                    <ListItem sx={{ pl: 6 }}>
                        <ListItemText primary="Republican" primaryTypographyProps={{fontSize: store.sx.drawerList.subFontSize}}/>
                        <Switch {...label} size="small" onClick={(e) => {onToggle(e, FilterType.REPUBLICAN)}} />
                    </ListItem>
                    <ListItem sx={{ pl:6 }}>
                        <ListItemText primary="Incumbent" primaryTypographyProps={{fontSize: store.sx.drawerList.subFontSize}}/>
                        <Switch {...label} size="small" onClick={(e) => {onToggle(e, FilterType.INCUMBENT)}} />
                    </ListItem>
                    <ListItem sx={{ pl: 6 }}>
                        <ListItemText primary="Difference" primaryTypographyProps={{fontSize: store.sx.drawerList.subFontSize}}/>
                        <Switch {...label} disabled={true} size="small" onClick={(e) => {onToggle(e, FilterType.DIFFERENCE)}} />
                    </ListItem>
                </List>
            </Collapse>
        </List>
    );
}
