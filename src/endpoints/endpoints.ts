const base = (rest: string) => `https://api.deezer.com/${rest}`;

export default class Endpoints {
    static deezer = class {
        static findArtist = (artist: string) => base(`search/artist?q=${artist}&limit=1`);
        static getTopByArtistId = (artistId: number) => base(`artist/${artistId}/top`)
    };
}
