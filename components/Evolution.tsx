import React, { useCallback, useEffect, useState } from "react";
import styles from "@/styles/Evolution.module.css";
import EvolutionCard from "./EvolutionCard";

interface SubChain {
  evolution: number | SubChain[];
}

interface Chain {
  evolution1: number;
  evolution2: SubChain[][];
}

interface Url {
  url: string;
}

export default function Evolution(props: Url) {
  const str: string = props.url;
  const [chain, setChain] = useState<Chain>({
    evolution1: 0,
    evolution2: [[{ evolution: [{ evolution: 0 }] }]],
  });
  const [rows, setRows] = useState<number>(0);
  const [columns, setColums] = useState<number>(0);
  const [windowWidth, setWindowWidth] = useState<number>(1300);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);
  const fetchData = useCallback(async () => {
    const response = await fetch(str);
    const data = await response.json();
    setChain({
      evolution1: Number(
        data.chain.species.url
          .replace("https://pokeapi.co/api/v2/pokemon-species/", "")
          .slice(0, -1)
      ),
      evolution2: data.chain.evolves_to.map((el: any) => {
        return [
          {
            evolution: Number(
              el.species.url
                .replace("https://pokeapi.co/api/v2/pokemon-species/", "")
                .slice(0, -1)
            ),
          },
          {
            evolution:
              el.evolves_to.length <= 1 && el.evolves_to.length > 0
                ? Number(
                    el.evolves_to[0].species.url
                      .replace("https://pokeapi.co/api/v2/pokemon-species/", "")
                      .slice(0, -1)
                  )
                : [
                    ...el.evolves_to.map((element: any) => {
                      return {
                        evolution: Number(
                          element.species.url
                            .replace(
                              "https://pokeapi.co/api/v2/pokemon-species/",
                              ""
                            )
                            .slice(0, -1)
                        ),
                      };
                    }),
                  ],
          },
        ].filter(
          (e: any) => typeof e.evolution === "number" || e.evolution.length > 0
        );
      }),
    });
  }, [str]);

  const getRows = useCallback(() => {
    if (chain?.evolution2.length > 1 && chain?.evolution1 !== 133) {
      setRows(chain?.evolution2.length);
    } else if (
      chain?.evolution2[0] &&
      chain?.evolution2[0].length > 0 &&
      chain?.evolution1 !== 133
    ) {
      setRows(chain?.evolution2[0].length);
    } else {
      setRows(4);
    }
    if (chain?.evolution2.length === 0) {
      setColums(6);
    } else if (
      chain?.evolution2[0].length === 1 &&
      chain?.evolution1 !== 133 &&
      chain?.evolution1 !== 840
    ) {
      setColums(3);
    } else {
      setColums(2);
    }
  }, [chain?.evolution2, chain?.evolution1]);

  useEffect(() => {
    getRows();
  }, [getRows]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className={styles.grid}>
      <div
        className={styles.firstEvolution}
        style={
          windowWidth > 750
            ? {
                gridColumn: `1 / span  ${columns}`,
                gridRow: `1 / span ${rows}`,
              }
            : {
                gridColumn: `1 / span ${rows}`,
                gridRow: `1 / span  ${columns}`,
              }
        }
      >
        <EvolutionCard
          url={`https://pokeapi.co/api/v2/pokemon/${chain?.evolution1}`}
        />
      </div>
      {chain?.evolution1 === 133 ? (
        <div
          style={{
            display: "flex",
            gridColumn: windowWidth > 750 ? columns + 1 : `1 / span ${rows}`,

            gridRow: windowWidth > 750 ? `1 / span ${rows}` : columns + 1,
          }}
        >
          <svg
            className={styles.svg}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 320 512"
          >
            <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
          </svg>
        </div>
      ) : (
        ""
      )}
      {chain?.evolution2.map((element, index) => {
        return (
          <>
            {element.map((el, i) => {
              if (typeof el.evolution === "number") {
                function grid(): string {
                  if (chain?.evolution2.length > 3) {
                    return `${(index + 2) % 2 === 0 ? 4 : 6} / span 2`;
                  } else {
                    if (
                      chain?.evolution2[0][1] === undefined &&
                      chain?.evolution1 !== 133 &&
                      chain?.evolution1 !== 840
                    ) {
                      return `5 / span 3`;
                    }
                    return `${(i + 2) % 2 === 0 ? 4 : 7} / span 2`;
                  }
                }

                return (
                  <>
                    {chain?.evolution1 !== 133 ? (
                      <div
                        style={{
                          display: "flex",
                          gridColumn:
                            windowWidth > 750
                              ? i === 0
                                ? columns + 1
                                : columns + 4
                              : `${index + 1} / span ${
                                  chain?.evolution2.length > 1 ? 1 : rows
                                }`,
                          gridRow:
                            windowWidth > 750
                              ? `${index + 1} / span ${
                                  chain?.evolution2.length > 1 ? 1 : rows
                                }`
                              : i === 0
                              ? columns + 1
                              : columns + 4,
                        }}
                      >
                        <svg
                          className={styles.svg}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 320 512"
                        >
                          <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
                        </svg>
                      </div>
                    ) : (
                      ""
                    )}
                    <div
                      className={styles.secondEvolution}
                      style={
                        windowWidth > 750
                          ? {
                              gridColumn: `${grid()}`,
                              gridRow:
                                chain?.evolution2.length === 1
                                  ? `1/ span ${rows}`
                                  : "unset",
                            }
                          : {
                              gridColumn:
                                chain?.evolution2.length === 1
                                  ? `1/ span ${rows}`
                                  : "unset",
                              gridRow: `${grid()}`,
                            }
                      }
                      key={i}
                    >
                      <EvolutionCard
                        url={`https://pokeapi.co/api/v2/pokemon/${el?.evolution}`}
                      />
                    </div>
                  </>
                );
              } else {
                return el.evolution.map((e, k) => {
                  return (
                    <>
                      <div className={styles.svgLast}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 320 512"
                        >
                          <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
                        </svg>
                      </div>
                      <div className={styles.lastEvolution} key={k}>
                        <EvolutionCard
                          url={`https://pokeapi.co/api/v2/pokemon/${e?.evolution}`}
                        />
                      </div>
                    </>
                  );
                });
              }
            })}
          </>
        );
      })}
    </div>
  );
}
