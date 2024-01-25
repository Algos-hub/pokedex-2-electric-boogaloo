import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import Card from "./Card";
import styles from "@/styles/Home.module.css";
import { useRouter } from "next/router";
import { usePathname, useSearchParams } from "next/navigation";
import Pagination from "@mui/material/Pagination";

interface Obj {
  name: string;
  url: string;
}

export default function Home() {
  const [pokemon, setPokemon] = useState<Array<Obj>>([]);
  const [page, setPage] = useState<number>(1);
  const [pokemonSearch, setPokemonSearch] = useState<string>("");
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
    if (search.search) {
      setPokemonSearch(search.search.toString());
    }
  }, [search, pokemonSearch]);

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/?limit=1025`)
      .then((response) => response.json())
      .then((data) => {
        setPokemon(
          isNaN(Number(pokemonSearch))
            ? data.results.filter((r: Obj) => r.name.includes(pokemonSearch))
            : data.results.filter((r: Obj) =>
                r.url
                  .replace("https://pokeapi.co/api/v2/pokemon", "")
                  .includes(pokemonSearch)
              )
        );
      });
  }, [page, pokemonSearch]);
  return (
    <div className={styles.container}>
      <div className={styles.pokemon}>
        {pokemon.map((data, index) => {
          if (index < page * 20 && index >= (page - 1) * 20)
            return <Card url={data.url} key={index} />;
        })}
      </div>
      <div className={styles.pagination}>
        <Pagination
          count={Math.ceil(pokemon.length / 20)}
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
          count={Math.ceil(pokemon.length / 20)}
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
