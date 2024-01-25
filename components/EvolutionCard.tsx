/* eslint-disable @next/next/no-img-element */
import React, { useCallback, useEffect, useState } from "react";
import colors from "@/styles/theme/colors.module.css";
import styles from "@/styles/EvolutionCard.module.css";
import typography from "@/styles/theme/typography.module.css";
import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";

interface Pokemon {
  id: number;
  name: string;
  img: string;
  type1: string;
  type2: string;
}

interface Types {
  type1: string;
  type2: string;
}

interface Data {
  url: string;
}

export default function EvolutionCard(props: Data) {
  const [poke, setPoke] = useState<Pokemon>();
  const [types, setTypes] = useState<Types>();
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
  const url: string = props.url;
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

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((d) => {
        setPoke({
          id: d.id,
          name: correctName(d.name),
          img: d.sprites.other.home.front_default,
          type1: d.types[0].type.name,
          type2: d.types[1]?.type.name,
        });
        setTypes({
          type1: styles[`${poke?.type1}`],
          type2: styles[`${poke?.type2}`],
        });
      });
  }, [url, poke?.type1, poke?.type2]);
  if (poke?.id && poke?.id < 1026) {
    return (
      <div
        className={`${styles.card} ${colors.surfaceVariant}`}
        onClick={() =>
          router.push(
            "/pokemon" + "?" + createQueryString("id", poke.id.toString())
          )
        }
      >
        <img
          className={`${styles.img} ${colors.inverseOnSurface}`}
          src={poke?.img}
          alt={poke?.name}
        />
        <div className={`${styles.content} ${colors.textNeutral}`}>
          <div className={`${styles.types} ${typography.bodyMedium}`}>
            <div className={`${types?.type1} ${styles.box}`}>
              {correctName(poke?.type1)}
            </div>
            {poke?.type2 ? (
              <div className={`${types?.type2} ${styles.box}`}>
                {correctName(poke?.type2)}
              </div>
            ) : (
              ""
            )}
          </div>
          <div className={typography.headlineSmall}>
            <div className={styles.name}>{poke?.name}</div>
          </div>
          <div className={typography.bodyMedium}>
            <div className={styles.id}>
              #{String(poke?.id).padStart(4, "0")}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
