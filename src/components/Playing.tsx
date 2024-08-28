import * as spotifyInterfaces from '../spotify/interfaces';
import { getCurrentlyPlaying } from '../spotify/api';
import { useEffect, useState } from 'react';

interface PlayingProps {
    session: any;
};

const Playing = (props: PlayingProps) => {
   const [currentlyPlaying, setCurrentlyPlaying] = useState<spotifyInterfaces.SpotifyCurrentlyPlaying | null>(null);

    useEffect(() => {
        const interval = setInterval(() => {
            getCurrentlyPlaying(props.session.accessToken)
                .then((data) => setCurrentlyPlaying(data));
        }, 3500);

        return () => clearInterval(interval);
    }, []);

    const formatDuration = (duration_ms: number) => {
        const minutes = Math.floor(duration_ms / 60000);
        const seconds = ((duration_ms % 60000) / 1000).toFixed(0);

        return minutes + ':' + (parseInt(seconds) < 10 ? '0' : '') + seconds;
    }

    return (
        <div className="text-white">
            { 
                (currentlyPlaying?.is_playing ) && (currentlyPlaying?.currently_playing_type === spotifyInterfaces.SpotifyPlayingType.track) ? 
                    <div className='flex justify-between gap-6 fixed bottom-0 right-0 p-6 bg-gray-800 bg-opacity-80 rounded-tl-lg mr-10 mb-10'>
                        <a href={currentlyPlaying?.item.external_urls.spotify} target='_blank' rel='noreferrer'>
                            <img src={currentlyPlaying?.item.album.images[2].url} alt={currentlyPlaying?.item.album.name} width={64} height={64} className='rounded-full transition ease-in hover:grayscale'/>
                        </a>

                        <div className='align-center text-center mt-2'>
                            <div className='flex justify-between gap-2'>
                                <h1 className='font-bold'>{currentlyPlaying?.item.name}</h1>
                                <h2 className='text-gray-400 text-sm'>[{formatDuration(currentlyPlaying?.progress_ms)} / {formatDuration(currentlyPlaying?.item.duration_ms)}]</h2>
                            </div>
                            <h2 className='text-gray-200 text-sm'>{currentlyPlaying?.item.artists.map((artist) => artist.name).join(', ')}</h2>
                            <h2 className='text-gray-400 text-sm'>[ {currentlyPlaying?.item.album.name} ]</h2>
                        </div>
                    </div>
                    :
                    <span />
            }
        </div>
    );
}

export default Playing;
