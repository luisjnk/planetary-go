"use client"

import "./planet-list-error.css";
export default function PlanetListError({ handleRetry, message }: {
  handleRetry(): void,
  readonly message: string,
}
) {
  return (
    <div data-testid="planet-list-error" className="not-found">
      <div className="container">
        <div className="center-xy">
          <p>
            {message}
          </p>
          <button className="not-found-button" onClick={handleRetry}>Retry</button>

        </div>
      </div>

    </div>
  );
}

