import React, { useState } from "react";
import {
  Drawer,
  IconButton,
  Box
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import ExtraNav from "./ExtraNav";


function DrawerComponent() {

  const [openDrawer, setOpenDrawer] = useState(false);
  return (
    <Box >
      <Drawer
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        style={{marginTop: "20px",width: "200%"}}
      >
      <ExtraNav open={openDrawer} setdrop={setOpenDrawer} />
      </Drawer>
      <IconButton onClick={() => setOpenDrawer(!openDrawer)}>
        <MenuIcon />
      </IconButton>
    </Box>
  );
}
export default DrawerComponent;