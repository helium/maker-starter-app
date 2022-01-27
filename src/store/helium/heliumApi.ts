import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { chain } from 'lodash'
import Config from 'react-native-config'

export type Hotspot = {
  name: string
  location: string
  address: string
  status: string
}

export const heliumApi = createApi({
  reducerPath: 'heliumApi',
  baseQuery: fetchBaseQuery({ baseUrl: Config.HELIUM_API_URL }),
  endpoints: (builder) => ({
    getHostspots: builder.query<Hotspot[], string>({
      query: (accountAddress) => ({
        url: `/accounts/${accountAddress}/hotspots`,
        method: 'GET',
      }),
      transformResponse: (response: { data: any }) => {
        return (
          chain(response?.data)
            // .filter((hotspot)=> hotspot.payer && hotspot.payer === Config.FREEDOMFI_MAKER_ID)
            .map((hotspot) => {
              return {
                name: hotspot.name?.replaceAll('-', ' '),
                location: hotspot.location,
                address: hotspot.address,
                status: hotspot.status?.online,
              }
            })
            .value()
        )
      },
    }),
  }),
})

export const { useGetHostspotsQuery } = heliumApi
