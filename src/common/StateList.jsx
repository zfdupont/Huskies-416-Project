import * as React from 'react';
import { useContext } from 'react'
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Star from '@mui/icons-material/Star';

import StoreContext from './Store';
import {StateType} from './GlobalVariables';

export default function NestedList() {
    const { mapStore } = useContext(StoreContext);
    const [open, setOpen] = React.useState(true);

    const handleClick = () => {
        setOpen(!open);
    };

    function onStateClick(stateType) {
        (mapStore.isStateMatch(stateType))? mapStore.unselectState() : mapStore.selectState(stateType);
    }

    return (
        <List
            sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
            component="nav"
            aria-labelledby="nested-list-subheader"
        >
            <ListItemButton onClick={handleClick} sx={{ pl: 2 }}>
                <ListItemIcon>
                    <Star />
                </ListItemIcon>
                <ListItemText style={{position:"absolute", left:'48px'}} primary="States" primaryTypographyProps={{fontSize: '14px'}} />
                {open ? <ExpandLess style={{position:"absolute", left:'160px'}} /> : <ExpandMore style={{position:"absolute", left:'160px'}} />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItemButton  selected={mapStore.isStateMatch(StateType.NEWYORK)} onClick={(e) => {onStateClick(StateType.NEWYORK)}} sx={{ pl: 6 }}>
                        <ListItemText primary="New York" primaryTypographyProps={{fontSize: '12px'}}  />
                    </ListItemButton>
                    <ListItemButton  selected={mapStore.isStateMatch(StateType.GEORGIA)} onClick={() => {onStateClick(StateType.GEORGIA)}} sx={{ pl: 6 }}>
                        <ListItemText primary="Georgia" primaryTypographyProps={{fontSize: '12px'}} />
                    </ListItemButton>
                    <ListItemButton  selected={mapStore.isStateMatch(StateType.ILLINOIS)} onClick={() => {onStateClick(StateType.ILLINOIS)}} sx={{ pl: 6 }}>
                        <ListItemText primary="Illinois" primaryTypographyProps={{fontSize: '12px'}} />
                    </ListItemButton>
                </List>
            </Collapse>
        </List>
    );
}
