import * as React from 'react';
import {useState, useContext, useEffect, useCallback} from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Star from '@mui/icons-material/Star';
import StoreContext from './Store';
import {PlanTitleType, PlanType} from "./GlobalVariables";

export default function NestedList() {
    const { mapStore, callbacks } = useContext(StoreContext);
    const [open, setOpen] = useState(true);
    const [filters, setFilters]= useState({
        [PlanType.S0001]: false,
        [PlanType.S0002]: false,
        [PlanType.S0003]: false,
        [PlanType.S0004]: false,
        [PlanType.S0005]: false,
    })

    useEffect(() => {
        callbacks.addOnResetState(resetStateFilter);
    }, [])

    const resetStateFilter = useCallback(() => {
        resetFilters();
    }, [])

    function resetFilters() {
        setFilters(() => ({
            [PlanType.S0001]: false,
            [PlanType.S0002]: false,
            [PlanType.S0003]: false,
            [PlanType.S0004]: false,
            [PlanType.S0005]: false,
        }))
    }

    const handleClick = () => {
        setOpen(!open);
    };

    let listTitle = "Plan Filter";
    let planButtons = createPlanButtons();

    function createPlanButtons()
    {
        let planButtons = [];
        for (const key in PlanType)
        {
            if (PlanType[key] === PlanType.Y2022) continue;
            let planType = PlanType[key];
            planButtons.push(
                <ListItemButton key={planType} selected={filters[planType]} sx={{ pl: 6 }} onClick={() => onPlanButtonClick(planType)}>
                    <ListItemText primary={PlanTitleType[planType]} primaryTypographyProps={{fontSize: "12px"}}  />
                </ListItemButton>
            )
        }
        return planButtons;
    }

    function onPlanButtonClick(planType){
        if (!filters[planType]) {
            mapStore.addPlanFilter(planType);
            setFilters((prev) => ({...prev, [planType]: true}));
        }
        else {
            mapStore.removePlanFilter(planType);
            setFilters((prev) => ({...prev, [planType]: false}));
        }
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
                <ListItemText style={{position:"absolute", left:'48px'}}  primary={listTitle} primaryTypographyProps={{fontSize: "14px"}} />
                {open ? <ExpandLess style={{position:"absolute", left:'160px'}} /> : <ExpandMore style={{position:"absolute", left:'160px'}} />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {planButtons}
                </List>
            </Collapse>
        </List>
    );
}
