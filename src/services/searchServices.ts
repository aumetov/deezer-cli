import Endpoints from '../endpoints/endpoints';
import { Http2ServerResponse } from 'http2';
import { ServerResponse } from 'http';
import { Track } from '../models/trackModel';
const https = require('https');
const chalk = require('chalk');

interface IDeezerSearchService {
    findArtist(names: string[]): Promise<number>;
    findTopByArtis(artistId: number): void;
}

export default class DeezerSearchService implements IDeezerSearchService {
    findArtist = async (names: string[]) => {
         let artistId: number = await new Promise((resolve, reject) => {
            https.get(Endpoints.deezer.findArtist(names.join('%20')), (resp: ServerResponse) => {
                let data = '';
                resp.on("data", (chunk: Buffer) => {
                    data += chunk;
                })
        
                resp.on("end", () => {
                    const artistData = JSON.parse(data);
                    if (artistData.data.length) {
                        console.log(chalk.cyan(`search result for ${names.join(' ')}: \n`))
                        resolve(JSON.parse(data).data[0].id);
                    } else {
                        console.log(chalk.red('Artist not found'));
                        resolve(0);
                    }
                })
            });
        });
        return artistId;
    }

    findTopByArtis = (artistId: number) => {
        https.get(Endpoints.deezer.getTopByArtistId(artistId), (resp: ServerResponse) => {
            let data = '';
            resp.on("data", (chunk: Buffer) => {
                data += chunk;
            })
    
            resp.on("end", () => {
                const songs = JSON.parse(data).data;
                songs.map((song: Track.TrackModel) => {
                    console.log(chalk.green(`${song.title_short} - ${song.link}`));
                })
            })
        });
    }
}