import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { SongDisplay, Songs } from 'src/app/shared/model/Song';
import { songs as AllSongs } from '../../../../assets/songs';
import { cloneDeep } from 'lodash';

@Injectable({
  providedIn: 'root',
})
export class MusicDataService {
  searchDataSubject$: Subject<Filter> = new Subject<Filter>();
  displaySongs: Songs[];
  filteredSongs: Songs[];

  /**
   * Extracts any existing data, if present uses it
   * else sets the master data in the session storage
   */
  constructor() {
    const existingData = sessionStorage.getItem('displaySongs'); //Gets the stored item from session storage

    if (existingData === null) {
      this.displaySongs = cloneDeep(AllSongs); //cloning the data to preserve it
      console.log(this.displaySongs[0].durationInMMSS);
      
      this.convertDuration(this.displaySongs);
      this.saveData();
    } else this.displaySongs = JSON.parse(existingData);
    this.searchFormTrigger({ songName: '', artistName: '' });
  }

  /**
   * This form pushes data into the subject
   * @param searchData The search field data
   */
  searchFormTrigger(searchData: Filter): void {
    this.searchDataSubject$.next(searchData);
  }

  /**
   * Function to calculate the time in MM:SS from seconds
   * Uses '%' and '/' operators to calculate and adds 0 for formatting if needed
   * @param song The song whose seconds has to be changed
   */
  convertDurationOfElement(song: Songs): void {
    const MM = Math.floor(song.durationInSeconds / 60);
    const SS = song.durationInSeconds % 60;
    let MMSS;

    if (MM < 10) MMSS = '0' + MM.toString();
    else MMSS = MM.toString();

    MMSS += ':';

    //Adding extra 0 to maintain the format
    if (SS < 10) MMSS += '0' + SS.toString();
    else MMSS += SS.toString();

    song.durationInMMSS = MMSS;
  }

  /**
   * This function passes each song into the function for conversion
   * @param displaySongs Recieves all the songs whose duration format has to be changed
   */
  convertDuration(displaySongs: Songs[]): void {
    displaySongs.forEach((song) => {
      this.convertDurationOfElement(song);
    });
  }

  /**
   * Thsi function is to add the song in the table
   * @param data The song data to be added in the table
   */
  addSongEntry(data: Songs): void {
      this.convertDurationOfElement(data);
      this.displaySongs.unshift(data);
      this.saveData();
  }

  /**
   * Function to save or update the session storage with the new data
   */
  saveData(): void {
    sessionStorage.setItem('displaySongs', JSON.stringify(this.displaySongs));
  }

  /**
   * Gets the song name of the songs using the songID list.
   * @param deleteIdList The list containing ID's of songs to be deleted
   * @returns list having names of songs to be deleted
   */
  songNameFromId(deleteIdList: string[]): string[] {
    const deleteSongNameList: string[] = [];
    deleteIdList.forEach((deleteId) => {
      const found = this.displaySongs.findIndex((song) => deleteId === song.id);

      deleteSongNameList.push(this.displaySongs[found].songName);
    });
    return deleteSongNameList;
  }

  /**
   * Function which removes the data from the display songs array
   * @param deleteSongId Array of song ID's to be deleted
   */
  deleteMarkedSongs(deleteSongId: string[]): void {
    deleteSongId.forEach((songId) => {
      const found = this.displaySongs.findIndex((song) => songId === song.id);
      this.displaySongs.splice(found, 1);
    });
    this.saveData();
  }

  deleteAllSongs():void{
    this.displaySongs=[];
    this.saveData();

  }

  /**
   * This function generates the id for the new song
   * @returns id of the new song
   */
  generateSongId(): string {
    const idChars =
      'AB&!CDE%#F-G^@HI-J$KL-*M-N-OP!Q-R-ST-&^#UV-W-XYZab-c#-*d@efghijklm&-nopqr$^s*%tuv-wxyz@#0*1-234-*5678-9';
    let newId = '';
    for (let i = 0; i < 36; i++) {
      newId += idChars.charAt(Math.floor(Math.random() * idChars.length));
    }
    return newId;
  }

  /**
   * This function computes the filtered song list according to
   * song name and artist entry field data
   * @param filter Search bar data
   * @returns the filtered songs array
   */
  filterSongs(filter: Filter): Songs[] {
    this.filteredSongs = this.displaySongs.filter(
      (song) =>
        song.songName.toLowerCase().includes(filter.songName) &&
        song.artistName.toLowerCase().includes(filter.artistName)
    );
    return this.filteredSongs;
  }

  /**
   * Sorts the Song array in the needed type based on the recieved column
   * @param displaySongs songs to be be sorted
   * @param orderOn the column property on which the sorting should happen
   * @param type Type of sorting 0-ascending and 1-descending
   * @returns Sorted songs array in the required order
   */
  sortService(
    displaySongs: SongDisplay[],
    orderOn: string,
    type: number
  ): SongDisplay[] {
    switch (type) {
      case 0:
        return displaySongs.sort((a, b) => {
          if (typeof a[orderOn] === 'number') return a[orderOn] - b[orderOn];
          else return a[orderOn].localeCompare(b[orderOn]);
        });
      case 1:
        return displaySongs.sort((a, b) => {
          if (typeof a[orderOn] === 'number') return b[orderOn] - a[orderOn];
          else return b[orderOn].localeCompare(a[orderOn]);
        });
      default:
        return displaySongs;
    }
  }
}

//Structure for search data
export class Filter {
  songName: string;
  artistName: string;
}

//Structure for column data
export class Column {
  title: string;
  btnStatus: number;
  propertyName: string;
}
