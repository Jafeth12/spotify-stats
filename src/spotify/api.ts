import type { SpotifyProfile } from '@auth/core/providers/spotify';
import * as interfaces from '../spotify/interfaces.ts';

const urlBase = 'https://api.spotify.com/v1';

const buildHeaders = (accessToken: string) => {
    return { 'Authorization': 'Bearer ' + accessToken };
}

const call = async (accessToken: string, endpoint: string, params = {}, body = {}) => {
    const url = new URL(urlBase + endpoint);
    const newParams = new URLSearchParams(params);

    console.log('calling: ' + url + '?' + newParams.toString());

    const data = await fetch(url + '?' + newParams.toString(), { headers: buildHeaders(accessToken) })
        .then((response) => response.json());

    return data;
}

//----------------

export const getProfile = async (accessToken: string) => {
    return await call(accessToken, '/me') as SpotifyProfile;
}

export const getTopItems = async (accessToken: string, type: interfaces.SpotifyItemType, timeRange: interfaces.SpotifyTimeRange) => {
    const endpoint = (type == interfaces.SpotifyItemType.artists) ? '/me/top/artists' : '/me/top/tracks';

    const params = {
        time_range: timeRange,
        offset: 0,
        limit: 50,
    } as interfaces.SpotifyTopItemParams; 

    return await call(accessToken, endpoint, params) as interfaces.SpotifyTopItems;
}

export const getRecentlyPlayed = async (accessToken: string) => {
    const params = {
        limit: 50,
        before: Date.now(),
    } as interfaces.SpotifyRecentlyPlayedParams; 

    return await call(accessToken, '/me/player/recently-played', params) as interfaces.SpotifyRecentlyPlayed;
}

export const getCurrentlyPlaying = async (accessToken: string) => {
    return await call(accessToken, '/me/player/currently-playing') as interfaces.SpotifyCurrentlyPlaying;
};
