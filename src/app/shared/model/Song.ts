/** 
 *  'Songs' defines the fiels in one song present in the dataset
 * List of different property names
*/
export class Songs {
  id: string;
  songName: string;
  artistName: string;
  numberOfStreams: number;
  releaseYear: number;
  durationInSeconds: number;
  durationInMMSS: string;
}

/**
 * An extra field to check if the song has been selected for deletion or not
 */
export class SongDisplay extends Songs {
  isSelected: boolean;
}
