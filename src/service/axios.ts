import Axios, {AxiosResponse} from "axios";
import {Show} from "../types/Show";

const client = Axios.create({
    baseURL: 'http://localhost:8080',
    //validateStatus: status => status >= 200 && status < 300 //mezi 200 - 299
})

export interface ShowsResponse {
    shows: Show[],
    lastYearPhotos: string[]
}

export const loadShowsRequest = async (): Promise<ShowsResponse> => {
    const {data} = await client.get<ShowsResponse>('/shows')
    return data
}