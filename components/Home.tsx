import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import Card from "./Card";
import styles from "@/styles/Home.module.css";
import { useRouter } from "next/router";
import { usePathname, useSearchParams } from "next/navigation";
import Pagination from "@mui/material/Pagination";

interface obj {
  name: string;
  url: string;
}

export default function Home() {
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

  useEffect(() => {
    fetch(
      `https://pokeapi.co/api/v2/pokemon/?offset=${(page - 1) * 20}&limit=20`
    )
      .then((response) => response.json())
      .then((data) => {
        setPokemon(data.results);
      });
  }, [page]);
  return (
    <div className={styles.container}>
      <div className={styles.pokemon}>
        {pokemon.map((data, index) => {
          return <Card url={data.url} key={index} />;
        })}
      </div>
      <div className={styles.pagination}>
        <Pagination
          count={52}
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
          count={52}
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
