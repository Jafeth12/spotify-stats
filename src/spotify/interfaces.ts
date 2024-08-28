import type { SpotifyImage } from '@auth/core/providers/spotify';

export enum SpotifyTimeRange {
    long_term = 'long_term',
    medium_term = 'medium_term',
    short_term = 'short_term'
}

export interface SpotifyTopItemParams {
    time_range: SpotifyTimeRange;
    limit: number;
    offset: number;
};

export interface SpotifySimplifiedArtist {
    id: string;
    name: string;
    type: string;
    href: string;
    uri: string;
    external_urls: {
        spotify: string;
    };
}

export interface SpotifyAlbum {
    album_type: string;
    total_tracks: number;
    available_markets: string[];
    href: string;
    id: string;
    images: SpotifyImage[];
    name: string;
    release_date: string;
    release_date_precision: string;
    type: string;
    uri: string;
    artists: SpotifySimplifiedArtist[];
    restriction: {
        reason: string;
    };
    external_urls: {
        spotify: string;
    };
};

export interface SpotifyArtist {
    name: string;
    type: string;
    popularity: number;
    href: string;
    uri: string;
    images: SpotifyImage[];
    genres: string[];
    followers: {
        href: string;
        total: number;
    };
    external_urls: {
        spotify: string;
    };
};

export interface SpotifyTrack {
    name: string;
    popularity: number;
    href: string;
    uri: string;
    type: string;
    album: SpotifyAlbum;
    images: SpotifyImage[];
    available_markets: string[];
    disc_number: number;
    duration_ms: number;
    explicit: boolean;
    id: string;
    is_playable: boolean;
    preview_url: string;
    track_number: number;
    is_local: boolean;
    restrictions: {
        reason: string;
    };
    external_ids: {
        isrc: string;
        ean: string;
        upc: string;
    };
    external_urls: {
        spotify: string;
    };

};

export enum SpotifyItemType {
    artists = "artists",
    tracks = "tracks"
};

export type SpotifyItem = SpotifyArtist | SpotifyTrack;

export interface SpotifyTopItems {
    href: string;
    limit: number;
    next: string;
    offset: string;
    previous: string;
    total: number;
    items: SpotifyItem[];
};
