import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import Card from "./Card";
import styles from "@/styles/Home.module.css";
import { useRouter } from "next/router";
import { usePathname, useSearchParams } from "next/navigation";
import Pagination from "@mui/material/Pagination";
import { Md3SecondaryTab, Md3Tabs } from "./material/Components";

interface obj {
  name: string;
  url: string;
}

export default function Home() {
  const [types, setTypes] = useState<Array<obj>>([]);
  const [typeNumber, setTypeNumber] = useState<number>(1);
  const [pokemon, setPokemon] = useState<Array<obj>>([]);
  const [page, setPage] = useState<number>(1);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );
  function correctName(str: string | undefined): string {
    if (typeof str === "string") {
      let temp = str.split("-");
      let result: string = "";
      for (let name of temp) {
        result += name[0].toUpperCase() + name.slice(1) + "-";
      }
      return result.split("-").join(" ").slice(0, -1);
    } else return "";
  }

  const handleChange = (event: ChangeEvent<unknown>, value: number): void => {
    setPage(value);
    router.push(pathname + "?" + createQueryString("page", value.toString()));
  };

  const search = router.query;
  useEffect(() => {
    if (
      search.page &&
      !isNaN(Number(search.page)) &&
      Number(search.page) > 1 &&
      Number(search.page) < 53
    ) {
      setPage(Number(search.page));
    }
  }, [search]);

  //   const fetchData = useCallback(async () => {
  //     const response = await fetch(`https://pokeapi.co/api/v2/type`);
  //     const data = await response.json();
  //     setTypes(data.results);
  //     // const res = await fetch(types[typeNumber].url);
  //     // const d = await res.json();
  //     // setPokemon(
  //     //   d.pokemon.map((el: any) => {
  //     //     return el.pokemon;
  //     //   })
  //     // );
  //   }, []);
  const fetchData = useCallback(async () => {
    const response = await fetch(`https://pokeapi.co/api/v2/type`);
    const data = await response.json();
    setTypes(data.results);
    const res = await fetch(`https://pokeapi.co/api/v2/type/${typeNumber}/`);
    const d = await res.json();
    console.log(d);

    setPokemon(
      d.pokemon.map((el: any) => {
        return el.pokemon;
      })
    );
  }, [typeNumber]);

  console.log(types);
  console.log(typeNumber);
  console.log(pokemon);
  console.log(pokemon.length);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className={styles.container}>
      <Md3Tabs style={{ width: "100%", zIndex: 0 }}>
        {types.map((el, i) => {
          return (
            <Md3SecondaryTab
              key={i}
              onClick={() => {
                setTypeNumber(i + 1);
              }}
            >
              <div style={{ width: 50, textAlign: "center" }}>
                {correctName(el.name)}
              </div>
            </Md3SecondaryTab>
          );
        })}
      </Md3Tabs>
      <div className={styles.pokemon}>
        {pokemon.map((data, index) => {
          if (index < page * 20 && index >= (page - 1) * 20)
            return <Card url={data.url} key={index} />;
        })}
      </div>
      <div className={styles.pagination}>
        <Pagination
          count={Math.round(pokemon.length / 20)}
          defaultPage={1}
          boundaryCount={2}
          page={page}
          showFirstButton
          showLastButton
          onChange={handleChange}
        />
      </div>
      <div className={styles.paginationSmall}>
        <Pagination
          count={Math.round(pokemon.length / 20)}
          defaultPage={1}
          boundaryCount={0}
          page={page}
          showFirstButton
          siblingCount={0}
          showLastButton
          onChange={handleChange}
        />
      </div>
    </div>
  );
}
