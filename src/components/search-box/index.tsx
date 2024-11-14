"use client"

import "./search-box.css";
export default function SearchBox({ handleSearch }: {
  handleSearch(toSearch: string): void,
}
) {
  return (
    <div >
      <input data-testid="search-box"
        onChange={(e) => handleSearch(e.target.value)}
        className="searchbox"
        aria-label="Search for a planet in the Star Wars universe"
        autoComplete="off"
        inputMode="search"
        placeholder="Enter the planet name"
        type="search"
      />
    </div>
  );
}