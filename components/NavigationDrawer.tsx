import React, { Dispatch } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import {
  Md3IconButton,
  Md3Icon,
  Md3OutlinedButton,
  Md3TextButton,
} from "./material/Components";
import { useRouter } from "next/router";

interface Props {
  toggleDrawer(): void;
  drawerState: boolean;
  darkMode: boolean;
  setDarkMode: Dispatch<boolean>;
}

export default function NavigationDrawer(props: Props) {
  const router = useRouter();
  const toggleTheme = () => {
    const theme = localStorage.getItem("theme");
    if (theme) {
      localStorage.setItem("theme", theme === "dark" ? "light" : "dark");
    } else {
      localStorage.setItem("theme", "dark");
    }
    props.setDarkMode(!props.darkMode);
  };

  function closeDrawer() {
    props.toggleDrawer();
  }
  const toggleDrawer = () => (event: any) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    closeDrawer();
  };

  const drawerBox = (
    <Box
      sx={{
        width: 320,
        height: 1,
        display: "flex",
        flexDirection: "column",
      }}
      role="presentation"
      onClick={toggleDrawer()}
      onKeyDown={toggleDrawer()}
    >
      <Md3IconButton
        style={{ margin: "8px 0 8px 12px", height: 48, width: 48 }}
      >
        <Md3Icon>menu_open</Md3Icon>
      </Md3IconButton>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: 8,
        }}
      >
        <Md3TextButton
          style={{ height: 55, width: "90%" }}
          onClick={() => router.push("/regions")}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <Md3Icon>travel_explore</Md3Icon>
            <h1 style={{ marginLeft: 10 }}>Regions</h1>
          </div>
        </Md3TextButton>
        <Md3TextButton
          style={{ height: 55, width: "90%" }}
          onClick={() => router.push("/types")}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <Md3Icon>filter_list</Md3Icon>
            <h1 style={{ marginLeft: 10 }}>Types</h1>
          </div>
        </Md3TextButton>
      </div>
      <div
        style={{
          height: "max-content",
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-end",
          flex: 1,
          marginBottom: 12,
        }}
      >
        <Md3OutlinedButton onClick={toggleTheme}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              paddingInline: 20,
              height: 48,
            }}
          >
            <Md3Icon style={{ marginRight: 10 }}>
              {props.darkMode ? "light_mode" : "dark_mode"}
            </Md3Icon>
            Switch to {props.darkMode ? "light" : "dark"} mode
          </div>
        </Md3OutlinedButton>
      </div>
    </Box>
  );
  return (
    <div>
      <React.Fragment key="left">
        <Drawer
          PaperProps={{
            style: {
              width: 320,
              backgroundColor: "var(--md-sys-color-surface-variant)",
              borderRadius: "0px 16px 16px 0px",
            },
          }}
          anchor="left"
          open={props.drawerState}
          onClose={toggleDrawer()}
          style={{ zIndex: "999999" }}
        >
          {drawerBox}
        </Drawer>
      </React.Fragment>
    </div>
  );
}
