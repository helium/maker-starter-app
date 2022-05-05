import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { chain } from "lodash";
import { Config } from "react-native-config";

export type Hotspot = {
  lng: number;
  lat: number;
  status: string;
  payer: string;
  owner: string;
  name: string;
  isLocationSet: boolean;
  locationName: string | undefined;
  geocode: {
    shortStreet: string;
    shortState: string;
    shortCountry: string;
    shortCity: string;
    longStreet: string;
    longState: string;
    longCountry: string;
    longCity: string;
    cityId: string;
  };
  gain: number | undefined;
  elevation: number;
  address: string;
};

export const heliumApi = createApi({
  reducerPath: "heliumApi",
  baseQuery: fetchBaseQuery({ baseUrl: Config.HELIUM_API_URL }),
  endpoints: (builder) => ({
    getHostspots: builder.query<Hotspot[], string>({
      query: (accountAddress) => ({
        url: `/accounts/${accountAddress}/hotspots`,
        method: "GET",
      }),
      transformResponse: (response: { data: any }) => {
        return chain(response?.data)
          .filter((hotspot) => hotspot.payer && hotspot.payer === Config.FREEDOMFI_MAKER_ID)
          .map((hotspot) => {
            const isLocationSet = !!hotspot.location;

            const locationName = isLocationSet
              ? `${hotspot.geocode?.long_street}, ${hotspot.geocode?.short_city} ${hotspot.geocode?.short_country}`
              : undefined;

            const gain = hotspot.gain ? hotspot.gain / 10 : undefined;

            return {
              lng: hotspot.lng,
              lat: hotspot.lat,
              status: hotspot.status?.online,
              payer: hotspot.payer,
              owner: hotspot.owner,
              name: hotspot.name?.replaceAll("-", " "),
              isLocationSet,
              locationName,
              geocode: {
                shortStreet: hotspot.geocode?.short_street,
                shortState: hotspot.geocode?.short_state,
                shortCountry: hotspot.geocode?.short_country,
                shortCity: hotspot.geocode?.short_city,
                longStreet: hotspot.geocode?.long_street,
                longState: hotspot.geocode?.long_state,
                longCountry: hotspot.geocode?.long_country,
                longCity: hotspot.geocode?.long_city,
                cityId: hotspot.geocode?.city_id,
              },
              gain,
              elevation: hotspot.elevation,
              address: hotspot.address,
            };
          })
          .value();
      },
    }),
  }),
});

export const { useGetHostspotsQuery } = heliumApi;
