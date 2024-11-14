type PlanetParams = {
  searchTerm: string;
  pageId: number;
};

const baseURL = 'https://swapi.dev/api/planets/';

export async function getPlanetsBy({ searchTerm, pageId }: PlanetParams) {
  try {
    const planetsURL = createGetPlanetsURL({ searchTerm, pageId });
    const res = await fetch(planetsURL);
    return res.json();
  } catch (error) {
    console.log(error);
    throw error;
  }
}


export function createGetPlanetsURL({ searchTerm, pageId }: PlanetParams) {
  if (searchTerm !== "" && searchTerm) {
    return `${baseURL}?search=${searchTerm}&page=${pageId}`;
  } else {
    return `${baseURL}?page=${pageId}`;
  }
}
