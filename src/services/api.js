import { createApi } from "@reduxjs/toolkit/query/react";
import { listings } from "../data/mockDb";

const LATENCY = 450;
const FAIL_RATE = 0.04;

function simulatedBaseQuery() {
  return async ({ url }) => {
    await new Promise((res) => setTimeout(res, LATENCY));
    if (Math.random() < FAIL_RATE) {
      return { error: { status: 503, data: "Couldn't reach the listings server. Try again." } };
    }
    try {
      return { data: resolve(url) };
    } catch (err) {
      return { error: { status: 400, data: err.message } };
    }
  };
}

function resolve(url) {
  const [path, query] = url.split("?");
  const params = new URLSearchParams(query || "");

  if (path === "/listings") {
    let result = [...listings];

    const purpose = params.get("purpose"); // "sale" | "rent" | "all"
    if (purpose === "sale") result = result.filter((l) => l.forSale);
    if (purpose === "rent") result = result.filter((l) => !l.forSale);

    const type = params.get("type");
    if (type && type !== "all") result = result.filter((l) => l.type === type);

    const neighborhood = params.get("neighborhood");
    if (neighborhood && neighborhood !== "all") {
      result = result.filter((l) => l.neighborhood === neighborhood);
    }

    const minBeds = params.get("minBeds");
    if (minBeds) result = result.filter((l) => l.bedrooms >= Number(minBeds));

    const maxPrice = params.get("maxPrice");
    if (maxPrice) result = result.filter((l) => l.price <= Number(maxPrice));

    const search = params.get("search");
    if (search) {
      const s = search.toLowerCase();
      result = result.filter(
        (l) =>
          l.title.toLowerCase().includes(s) ||
          l.neighborhood.toLowerCase().includes(s) ||
          l.address.toLowerCase().includes(s)
      );
    }

    const sort = params.get("sort");
    if (sort === "price-asc") result.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") result.sort((a, b) => b.price - a.price);
    if (sort === "newest") result.sort((a, b) => a.listedDaysAgo - b.listedDaysAgo);

    return result;
  }

  if (path.startsWith("/listings/")) {
    const id = Number(path.split("/")[2]);
    const listing = listings.find((l) => l.id === id);
    if (!listing) throw new Error("Listing not found");
    return listing;
  }

  throw new Error(`Unhandled mock route: GET ${path}`);
}

export const api = createApi({
  reducerPath: "api",
  baseQuery: simulatedBaseQuery(),
  endpoints: (builder) => ({
    getListings: builder.query({
      query: (filters = {}) => {
        const params = new URLSearchParams(filters).toString();
        return { url: `/listings?${params}` };
      },
    }),
    getListing: builder.query({
      query: (id) => ({ url: `/listings/${id}` }),
    }),
  }),
});

export const { useGetListingsQuery, useGetListingQuery } = api;
