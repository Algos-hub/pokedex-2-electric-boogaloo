/* eslint-disable @next/next/no-img-element */
import React, { Dispatch, useCallback, useState } from "react";
import styles from "@/styles/Header.module.css";
import color from "@/styles/theme/colors.module.css";
import NavigationDrawer from "./NavigationDrawer";
import {
  Md3OutlinedTextField,
  Md3IconButton,
  Md3Icon,
  Md3TextButton,
  Md3FilledTonalIconButton,
} from "./material/Components";
import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";

interface Props {
  darkMode: boolean;
  setDarkMode: Dispatch<boolean>;
}

export default function Header(props: Props) {
  const [drawerState, setDrawerState] = React.useState(false);
  const [search, setSearch] = useState<string>("");
  const [searchBar, setSearchBar] = useState<boolean>(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  function toggleDrawer() {
    setDrawerState(!drawerState);
  }
  return (
    <header className={`${color.background} ${styles.header}`}>
      <div style={{ display: "flex", alignItems: "center", marginLeft: 15 }}>
        <Md3IconButton onClick={() => setDrawerState(true)}>
          <Md3Icon>menu</Md3Icon>
        </Md3IconButton>
        <NavigationDrawer
          toggleDrawer={toggleDrawer}
          drawerState={drawerState}
          darkMode={props.darkMode}
          setDarkMode={props.setDarkMode}
        />
        <Md3TextButton
          style={{ marginLeft: 10, height: 55 }}
          onClick={() => router.push("/")}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <img src="pokeball_logo.png" alt="Pokeball logo" height="40" />
            <h1 className={styles.name}>Pokedex</h1>
          </div>
        </Md3TextButton>
      </div>
      <div style={{ marginRight: 10 }}>
        <div className={styles.searchBarFull}>
          <Md3OutlinedTextField
            label="Search"
            style={{ marginInline: 10, width: "100%" }}
            placeholder="Name or Number"
            onInput={(e) => setSearch((e.target as HTMLTextAreaElement).value)}
            onKeyDown={(e) => {
              if (e.key === "Enter")
                router.push(
                  "/search" + "?" + createQueryString("search", search)
                );
            }}
          >
            <Md3IconButton
              slot="trailing-icon"
              onClick={() =>
                router.push(
                  "/search" + "?" + createQueryString("search", search)
                )
              }
            >
              <Md3Icon>search</Md3Icon>
            </Md3IconButton>
          </Md3OutlinedTextField>
        </div>
        <div
          className={`${color.background} ${styles.searchBar}`}
          style={{ right: searchBar ? 0 : "-100vw" }}
        >
          <Md3OutlinedTextField
            label="Search"
            style={{ marginInline: 10, width: "100%" }}
            placeholder="Name or Number"
            onInput={(e) => setSearch((e.target as HTMLTextAreaElement).value)}
            onKeyDown={(e) => {
              if (e.key === "Enter")
                router.push(
                  "/search" + "?" + createQueryString("search", search)
                );
            }}
          >
            <Md3IconButton
              slot="trailing-icon"
              onClick={() => setSearchBar(false)}
            >
              <Md3Icon>close</Md3Icon>
            </Md3IconButton>
            <Md3IconButton
              slot="leading-icon"
              onClick={() =>
                router.push(
                  "/search" + "?" + createQueryString("search", search)
                )
              }
            >
              <Md3Icon>search</Md3Icon>
            </Md3IconButton>
          </Md3OutlinedTextField>
        </div>
        <Md3FilledTonalIconButton
          className={styles.searchButton}
          style={{ borderRadius: 10 }}
          onClick={() => setSearchBar(true)}
        >
          <Md3Icon>search</Md3Icon>
        </Md3FilledTonalIconButton>
      </div>
    </header>
  );
}
