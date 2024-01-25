/* eslint-disable @next/next/no-img-element */
import React, { useCallback, useEffect, useState } from "react";
import styles from "@/styles/Pokemon.module.css";
import colors from "@/styles/theme/colors.module.css";
import typography from "@/styles/theme/typography.module.css";
import { useRouter } from "next/router";
import Evolution from "./Evolution";

interface Species {
  evolution_chain: string;
  pokemon_data: string;
}

interface Pokemon {
  id: number;
  name: string;
  img: string;
  type1: string;
  type2: string;
}
interface Stats {
  hp: number;
  attack: number;
  defense: number;
  special_attack: number;
  special_defense: number;
  speed: number;
}
interface StatsSecondary {
  Abilities: string;
  Height: string;
  Weight: string;
}

export default function Pokemon() {
  const [id, setId] = useState<number>();
  const [speciesData, setSpeciesData] = useState<Species>();
  const [pokemonData, setPokemonData] = useState<Pokemon>();
  const [stats, setStats] = useState<Stats>({
    hp: 0,
    attack: 0,
    defense: 0,
    special_attack: 0,
    special_defense: 0,
    speed: 0,
  });
  const [statsSecondary, setStatsSecondary] = useState<StatsSecondary>({
    Abilities: "",
    Height: "",
    Weight: "",
  });
  const router = useRouter();

  const search = router.query;

  function correctStat(str: string | undefined): string {
    if (typeof str === "string") {
      if (str === "hp") {
        return str.toUpperCase().concat(":");
      }
      let temp = str.split("_");
      let result: string = "";
      for (let name of temp) {
        result += name[0].toUpperCase() + name.slice(1) + "_";
      }
      return result.split("_").join(" ").slice(0, -1).concat(":");
    } else return "";
  }

  function correctName(str: string | undefined): string {
    if (typeof str === "string") {
      let temp = str.split("-");
      let result: string = "";
      for (let name of temp) {
        result += name[0].toUpperCase() + name.slice(1) + "-";
      }
      if (result === "Ho-Oh-") return "Ho-Oh";
      if (result === "Farfetch-D-") return "Farfetch'd";
      if (result === "Porygon-2-") return "Porygon-2";
      if (result === "Porygon-Z-") return "Porygon-Z";
      if (result === "Mr-Mime-") return "Mr. Mime";
      if (result === "Wo-Chien-") return "Wo-Chien";
      if (result === "Chi-Yu-") return "Chi-Yu";
      if (result === "Chien-Pao-") return "Chien-Pao";
      if (result === "Ting-Lu-") return "Ting-Lu";
      return result.split("-").join(" ");
    } else return "";
  }

  const fetchData = useCallback(async () => {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon-species/${id}/`
    );
    const data = await response.json();
    setSpeciesData({
      evolution_chain: data.evolution_chain.url,
      pokemon_data: data.varieties[0].pokemon.url,
    });
    if (speciesData?.pokemon_data) {
      const res = await fetch(speciesData?.pokemon_data);
      const d = await res.json();
      setPokemonData({
        id: d.id,
        name: correctName(d.name),
        img: d.sprites.other.home.front_default,
        type1: d.types[0].type.name,
        type2: d.types[1]?.type.name,
      });
      setStats({
        hp: d.stats[0].base_stat,
        attack: d.stats[1].base_stat,
        defense: d.stats[2].base_stat,
        special_attack: d.stats[3].base_stat,
        special_defense: d.stats[4].base_stat,
        speed: d.stats[5].base_stat,
      });
      setStatsSecondary({
        Abilities: correctName(d.abilities[0].ability.name),
        Height: `${d.height * 10}cm`,
        Weight: `${d.weight / 10}kg`,
      });
    }
  }, [id, speciesData?.pokemon_data]);

  useEffect(() => {
    if (
      search.id &&
      !isNaN(Number(search.id)) &&
      Number(search.id) > 0 &&
      Number(search.id) < 1026
    ) {
      setId(Number(search.id));
      fetchData();
    }
  }, [search, fetchData]);

  return (
    <div className={`${styles.container} ${colors.primaryText}`}>
      <div className={`${colors.surfaceVariant} ${styles.card}`}>
        <img
          className={styles.img}
          src={pokemonData?.img}
          alt={pokemonData?.name}
        />
        <div className={`${colors.primaryContainer} ${styles.stats}`}>
          <div className={`${typography.headlineSmall} ${styles.title}`}>
            <div>
              {pokemonData?.name}
              <span className={`${typography.headlineSmall}`}>
                #
                {pokemonData?.id
                  ? String(pokemonData?.id).padStart(4, "0")
                  : ""}
              </span>
            </div>
          </div>
          {Object.entries(stats).map((el, i) => {
            return (
              <div
                key={i}
                className={`${typography.headlineSmall}`}
                style={{
                  gridRow: i + 2,
                  paddingLeft: 20,
                  paddingBottom: el[0] === "speed" ? 10 : 0,
                }}
              >
                {correctStat(el[0])}
                <div className={`${colors.textNeutral}`}>{el[1]}</div>
              </div>
            );
          })}
          {Object.entries(statsSecondary).map((el, i) => {
            return (
              <div
                key={i}
                className={`${typography.headlineSmall}`}
                style={{ gridColumn: 2, paddingLeft: 20 }}
              >
                {el[0]}: <div className={`${colors.textNeutral}`}>{el[1]}</div>
              </div>
            );
          })}
        </div>
        <div
          className={`${colors.secondaryContainer}`}
          style={{ gridColumn: "1 / span 2", borderRadius: "inherit" }}
        >
          <div
            className={typography.headlineMedium}
            style={{ textAlign: "center", marginTop: 30, marginBottom: 30 }}
          >
            Evolutions
          </div>
          <Evolution url={String(speciesData?.evolution_chain)} />
        </div>
      </div>
    </div>
  );
}
