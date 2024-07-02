import SpotifyEmbed from './spotifyPlaylists';

const playlistSrcList = [
    "https://open.spotify.com/embed/playlist/1TcaPjKnxdS40HCnvc9aSM?utm_source=generator",
    "https://open.spotify.com/embed/playlist/2ZPOsZAOBTAztgbwNwWwi0?utm_source=generator",
    "https://open.spotify.com/embed/playlist/1KfOnEerYssbxmt4p23rYE?utm_source=generator",
    "https://open.spotify.com/embed/playlist/148ZzSwuXSXo112J5zqpK3?utm_source=generator",
];

export default function MusicRecommendation() {
    return (
        <SpotifyEmbed srcList={playlistSrcList}/>
    )
}
