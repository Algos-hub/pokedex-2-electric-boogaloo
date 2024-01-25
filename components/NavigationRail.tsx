/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/no-page-custom-font */
/* eslint-disable @next/next/google-font-display */
import React, { Dispatch, useCallback, useState } from "react";
import styles from "@/styles/NavigationRail.module.css";
import colors from "@/styles/theme/colors.module.css";
import {
  Md3OutlinedTextField,
  Md3IconButton,
  Md3Icon,
  Md3FilledTonalIconButton,
  Md3TextButton,
  Md3OutlinedButton,
} from "./material/Components";
import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";

interface Props {
  darkMode: boolean;
  setDarkMode: Dispatch<boolean>;
}

export default function NavigationRail(props: Props) {
  const [search, setSearch] = useState<string>("");
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

  const toggleTheme = () => {
    const theme = localStorage.getItem("theme");
    if (theme) {
      localStorage.setItem("theme", theme === "dark" ? "light" : "dark");
    } else {
      localStorage.setItem("theme", "dark");
    }
    props.setDarkMode(!props.darkMode);
  };

  return (
    <div className={`${colors.surfaceVariant} ${styles.rail}`}>
      <link
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        rel="stylesheet"
      />

      <div className={styles.navigation}>
        <div>
          <Md3FilledTonalIconButton
            className={styles.searchButton}
            style={{ borderRadius: 10 }}
          >
            <Md3Icon>search</Md3Icon>
          </Md3FilledTonalIconButton>
          <Md3OutlinedTextField
            className={styles.searchBar}
            label="Search"
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

        <Md3TextButton style={{ height: 55 }} onClick={() => router.push("/")}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <img src="pokeball_logo.png" alt="Pokeball logo" height="40" />
            <h1 className={styles.name}>Pokedex</h1>
          </div>
        </Md3TextButton>
        <Md3TextButton
          style={{ height: 55 }}
          onClick={() => router.push("/regions")}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <Md3Icon>travel_explore</Md3Icon>
            <h1 className={styles.name}>Regions</h1>
          </div>
        </Md3TextButton>
        <Md3TextButton
          style={{ height: 55 }}
          onClick={() => router.push("/types")}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <Md3Icon>filter_list</Md3Icon>
            <h1 className={styles.name}>Types</h1>
          </div>
        </Md3TextButton>
      </div>
      <div className={styles.darkBotton}>
        <Md3OutlinedButton onClick={toggleTheme}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              height: 52,
              width: "100%",
            }}
          >
            <Md3Icon>{props.darkMode ? "light_mode" : "dark_mode"}</Md3Icon>
            <span className={styles.name}>
              Switch to {props.darkMode ? "light" : "dark"} mode
            </span>
          </div>
        </Md3OutlinedButton>
      </div>
    </div>
  );
}
