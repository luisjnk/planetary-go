"use client"

import { getPlanetsBy } from "@/src/queries/get-planet-by-id";
import { PlanetDescription } from "@/src/types/planet.type";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import SearchBox from "./search-box";
import PlanetItem from "./planet-item";
import Pagination from "./pagination";
import { debounce } from "@/src/utils/Utils";

import "./planet.css";
import PlanetListError from "./planet-list-error";
import Loading from "./loading";

export default function Planets() {
  // Initial state for planet data
  const initialPlanetData = { count: 0, next: "", previous: "", results: [] as PlanetDescription[] }

  const [pageId, setPageId] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [planetData, setPlanetData] = useState(initialPlanetData);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  // Fetch data using useQuery hook
  const { data, error: queryError } = useQuery({
    queryKey: ["planets", pageId, searchTerm],
    queryFn: () => getPlanetsBy({ pageId, searchTerm }),
  });

  useEffect(() => {
    if (data) {
      setPlanetData(data);
      setIsLoading(false);
    }

    if (queryError) {
      setError(queryError);
      setIsLoading(false);
    }

  }, [data, queryError]);

  // Pagination handler
  const handleNextPage = ({ nextPage }: { nextPage: number }) => {
    setPageId(nextPage);
  };

  const handleSearchByName = (name: string) => {
    setSearchTerm(name);
    setPageId(1); // Reset to first page on new search
  };

  //Retry use query
  const handleRetry = () => {
    setSearchTerm("");
    setPageId(1); // Reset to first page on new searchs
  };

  if (error) {
    return <PlanetListError message={error.message} handleRetry={handleRetry} data-testid="planet-list-error" />;
  }

  // Debounced search handler to avoid excessive API calls
  const debouncedSearchHandler = debounce(handleSearchByName, 500);

  return (
    <>
      <SearchBox handleSearch={debouncedSearchHandler} />
      {isLoading && <Loading />}
      {planetData && planetData.count === 0 && !isLoading && <PlanetListError handleRetry={handleRetry} message={"An intergalactic traveling problem has occurred"} />}
      <div>
        <ul className="planet-list">
          {planetData?.results.map((planet: PlanetDescription) => (<PlanetItem key={planet.name} planetDescription={planet} />))}
        </ul>
        {planetData && planetData.count > 10 && <Pagination
          listCount={planetData.count}
          currentPage={pageId}
          nextPage={handleNextPage}
        />}
      </div>
    </>
  );
}