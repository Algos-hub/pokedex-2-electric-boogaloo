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
  const [region, setRegion] = useState<Array<obj>>([]);
  const [regionNumber, setRegionNumber] = useState<number>(1);
  const [pokemonId, setPokemonId] = useState<Array<number>>([]);
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

  const fetchData = useCallback(async () => {
    const response = await fetch(
      `https://pokeapi.co/api/v2/generation/${regionNumber}`
    );
    const data = await response.json();
    setRegion(data.pokemon_species);
    setPokemonId(
      data.pokemon_species
        .map((el: obj) => {
          return Number(
            el.url
              .replace("https://pokeapi.co/api/v2/pokemon-species/", "")
              .slice(0, -1)
          );
        })
        .sort((a: number, b: number) => a - b)
    );
  }, [regionNumber]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className={styles.container}>
      <Md3Tabs style={{ width: "100%", zIndex: 0 }}>
        <Md3SecondaryTab onClick={() => setRegionNumber(1)}>
          Kanto
        </Md3SecondaryTab>
        <Md3SecondaryTab onClick={() => setRegionNumber(2)}>
          Johto
        </Md3SecondaryTab>
        <Md3SecondaryTab onClick={() => setRegionNumber(3)}>
          Hoenn
        </Md3SecondaryTab>
        <Md3SecondaryTab onClick={() => setRegionNumber(4)}>
          Sinnoh
        </Md3SecondaryTab>
        <Md3SecondaryTab onClick={() => setRegionNumber(5)}>
          Unova
        </Md3SecondaryTab>
        <Md3SecondaryTab onClick={() => setRegionNumber(6)}>
          Kalos
        </Md3SecondaryTab>
        <Md3SecondaryTab onClick={() => setRegionNumber(7)}>
          Alola
        </Md3SecondaryTab>
        <Md3SecondaryTab onClick={() => setRegionNumber(8)}>
          Galar
        </Md3SecondaryTab>
        <Md3SecondaryTab onClick={() => setRegionNumber(9)}>
          Paldea
        </Md3SecondaryTab>
      </Md3Tabs>
      <div className={styles.pokemon}>
        {pokemonId.map((data, index) => {
          if (index < page * 20 && index >= (page - 1) * 20)
            return (
              <Card
                url={`https://pokeapi.co/api/v2/pokemon/${data}/`}
                key={index}
              />
            );
        })}
      </div>
      <div className={styles.pagination}>
        <Pagination
          count={Math.ceil(region.length / 20)}
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
          count={Math.ceil(region.length / 20)}
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
