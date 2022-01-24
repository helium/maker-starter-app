import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { map } from 'lodash'

export type Hotspot = {
  name: string
  location: string
  address: string
  status: string
}

export const heliumApi = createApi({
  reducerPath: 'heliumApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.helium.io/v1' }),
  endpoints: (builder) => ({
    getHostspots: builder.query<Hotspot[], string>({
      query: (accountAddress) => ({
        url: `/accounts/${accountAddress}/hotspots`,
        method: 'GET',
      }),
      transformResponse: (response: { data: any }) => {
        return map(response?.data, (hotspot) => {
          return {
            name: hotspot.name?.replaceAll('-', ' '),
            location: hotspot.location,
            address: hotspot.address,
            status: hotspot.status?.online,
          }
        })
      },
    }),
  }),
})

export const { useGetHostspotsQuery } = heliumApi
