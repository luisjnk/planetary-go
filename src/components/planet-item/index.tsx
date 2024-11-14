"use client"

import { PlanetDescription } from "@/src/types/planet.type";
import "./planet-item.css";
export default function PlanetItem({ planetDescription }: { readonly planetDescription: PlanetDescription }) {

  const climateColors: { [key: string]: string } = {
    arid: "arid-desert",
    temperate: "temperate-forest",
    frigid: "frigid",
    hot: "hot",
    tropical: "tropical",
    musky: "musky",
    polluted: "polluted",
    unknown: "unknown",
  }

  const chosseClimateColor = (climate: string) => {
    if (climate === "") return climateColors.unknown
    const climateColor = climate.toLocaleLowerCase().split(",")[0]
    return climateColors[climateColor] || climateColors.unknown;
  }

  return (
    <li data-testid="planet-item" className={`${chosseClimateColor(planetDescription.climate ?? "")} flip-card`}>
      <div className="planet-item flip-card ">
        <div className="card flip-card-inner">
          <div className="content ">
            <div className="top">
              <div>
                <p>{planetDescription.name}</p>
              </div>
            </div>
            <div className="bottom ">
              <div>
                <p>Climate</p>
                <p >
                  {planetDescription.climate?.replaceAll(",", "") ?? ""}
                </p>
              </div>
              <div>
                <p>Population</p>
                <p >
                  {planetDescription.population}
                </p>
              </div>
            </div>
          </div>
          <div className="content flip-card-back">
            <div className="top">
              <div>
                <p>{planetDescription.name}</p>
              </div>
            </div>
            <div className="bottom-back-card">
              <div><b>Diameter:</b> {planetDescription.diameter}</div>
              <div><b>Gravity:</b> {planetDescription.gravity}</div>
              <div><b>Terrain:</b> {planetDescription.terrain}</div>
              <div><b>Surface water:</b> {planetDescription.surface_water}</div>
              <div><b>Population:</b> {planetDescription.population}</div>
            </div>
          </div>
        </div>
      </div>
    </li>

  );
}