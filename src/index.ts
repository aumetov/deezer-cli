import DeezerSearchService from "./services/searchServices"
const deezerSearchService = new DeezerSearchService();

export const getTop = async (names: string[]) => {
    const artistId = await deezerSearchService.findArtist(names);

    if (artistId !== 0) {
        deezerSearchService.findTopByArtis(artistId);
    }
}