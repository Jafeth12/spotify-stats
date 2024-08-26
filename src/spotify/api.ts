import type { SpotifyProfile } from '@auth/core/providers/spotify';
import * as interfaces from '../spotify/interfaces.ts';

const urlBase = 'https://api.spotify.com/v1';

const buildHeaders = (accessToken: string) => {
    return { 'Authorization': 'Bearer ' + accessToken };
}

const call = async (endpoint: string, accessToken: string) => {
    const url = urlBase + endpoint;

    console.log('calling: ' + url);

    // TODO be able to change time_range (GET param)

    const data = await fetch(urlBase + endpoint, { headers: buildHeaders(accessToken) })
        .then((response) => response.json());

    return data;
}

//----------------

export const getProfile = async (accessToken: string) => {
    return await call('/me', accessToken) as SpotifyProfile;
}

export const getTopItems = async (accessToken: string, type: interfaces.SpotifyItemType) => {
    let endpoint = (type == interfaces.SpotifyItemType.artists) ? '/me/top/artists' : '/me/top/tracks';

    return await call(endpoint, accessToken) as interfaces.SpotifyTopItems;
}
