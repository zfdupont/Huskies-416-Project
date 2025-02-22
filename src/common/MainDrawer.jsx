import * as React from 'react';
import PropTypes from 'prop-types';
import { useContext } from 'react';
// MUI
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
// Custom
import DrawerLists from "./DrawerLists";
import ResetButtonGroup from "../TabPanels/mapPanel/ResetButtonGroup";
import StoreContext from './Store';
import {TabType} from "./GlobalVariables";

const drawerWidth = 200;

function ResponsiveDrawer(props) {
    const { pageStore } = useContext(StoreContext);

    const drawer = (
        <div>
            <div style={{
                position:'absolute',
                backgroundImage: `url(${process.env.PUBLIC_URL + '/Huskies3.png'})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                width:'130px',
                height:'50px',
                top: '10px',
                left:'20px',
                zIndex: 100,
              }}>
            </div>
            <Toolbar />
            <Divider />
            <DrawerLists/>
            <Divider />
            {pageStore.isTabMatch(TabType.MAP) && <ResetButtonGroup/>}
        </div>
    );

    return (
        <Box sx={{ display: 'flex' }}>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >

                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': {
                            boxSizing: 'border-box',
                            width: drawerWidth,
                        },
                        zIndex:0,

                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
        </Box>
    );
}

ResponsiveDrawer.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

export default ResponsiveDrawer;
