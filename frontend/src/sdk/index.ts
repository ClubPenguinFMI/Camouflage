import { type Portfolio, GraphResponse } from "./interfaces";


const BASE_BACKEND_URL = `http://localhost:${import.meta.env.VITE_URL_PORT}`;

export const assets = {
  async getAssets(): Promise<Portfolio[]> {
    return Promise.resolve(
      await fetch(`${BASE_BACKEND_URL}/portfolio/precomputed`).then((res) => res.json())
    );
  },
};

export const graph = {
  async getGraphData(assets: Portfolio[]): Promise<GraphResponse> {
    return Promise.resolve(await fetch(`${BASE_BACKEND_URL}/graph`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(assets),
    }).then((res) => res.json()));
  },
};
