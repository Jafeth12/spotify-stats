import { getSession } from 'auth-astro/server';
import type { SpotifyProfile } from '@auth/core/providers/spotify';

export const getProfile = async (session: any) => {
    const headers = { 'Authorization': 'Bearer ' + session.accessToken };

    const data = await fetch('https://api.spotify.com/v1/me', { headers })
        .then((response) => response.json());

    return data as SpotifyProfile;
}
