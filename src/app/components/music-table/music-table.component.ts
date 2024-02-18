import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { SongDisplay, Songs } from 'src/app/shared/model/Song';
import * as cloneDeep from 'lodash/cloneDeep';
import {
  Column,
  MusicDataService,
} from 'src/app/shared/services/music-data/music-data.service';
import { AddSongComponent } from 'src/app/shared/sharedComponents/add-song/add-song.component';
import { MatDialog } from '@angular/material/dialog';
import { DeleteSongComponent } from 'src/app/shared/sharedComponents/delete-song/delete-song.component';
import { AlertBoxComponent } from 'src/app/shared/sharedComponents/alert-box/alert-box.component';
import { DeleteAllComponent } from 'src/app/shared/sharedComponents/delete-all/delete-all.component';

@Component({
  selector: 'app-music-table',
  templateUrl: './music-table.component.html',
  styleUrls: ['./music-table.component.scss'],
})
export class MusicTableComponent implements OnInit, OnChanges {
  //Recieving filteredSongs from app component
  @Input() filteredSongs: Songs[] = [];
  @Output() dataManipulatedEmitter = new EventEmitter<boolean>();

  durationInSecStatus = true; //Decides the format of duration field in the table

  displaySongs: SongDisplay[] = []; //Stores songs displayed on the table at any point of time
  deleteIdList: string[] = []; //Stores the ID of songs to be deleted

  /**
   * Opens the add song dialog where a new song details can be filled and added.
   * @param enterAnimationDuration Time to open the dialog box
   * @param exitAnimationDuration Time to close the dialog box
   */
  openAddDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    const dialogRef = this.dialog.open(AddSongComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
    });

    dialogRef.afterClosed().subscribe((newSong) => {
      if (newSong!==undefined) {
        this.musicService.addSongEntry(newSong);
        this.resetAllSortBts('');
        this.dataManipulatedEmitter.emit(true);
      }
      console.log('The dialog was closed');
    });
  }

  /**
   * Opens a delete dialog box where song names will be lsted and delete button will delete the entries
   * @param enterAnimationDuration Time to open the dialog box
   * @param exitAnimationDuration Time to close the dialog box
   */
  openDeleteDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    let deleteSongList: string[] = []; //Stores songNames to be deleted
    deleteSongList = this.musicService.songNameFromId(this.deleteIdList);

    enterAnimationDuration;

    const dialogRef = this.dialog.open(DeleteSongComponent, {
      data: { deleteSongName: deleteSongList, deleteSongId: this.deleteIdList },
      enterAnimationDuration,
      exitAnimationDuration,
    });

    //Recieves a boolean value to determine if a delete operation has occoured or not through result
    dialogRef.afterClosed().subscribe((result) => {
      //If deletion occours make the delete list empty
      if (result) {
        this.musicService.deleteMarkedSongs(this.deleteIdList);
        this.resetAllSortBts('');
        this.dataManipulatedEmitter.emit(true);
        (deleteSongList = []), (this.deleteIdList = []);
      }
    });
  }


  openAlertDialog(
  ): void {
    const dialogRef = this.dialog.open(AlertBoxComponent, {
    });

    dialogRef.afterClosed().subscribe(() => {
      
      console.log('The dialog was closed');
    });
  }

  openDeleteAllDialog(
    ): void {
      const dialogRef = this.dialog.open(DeleteAllComponent, {
      });
  
      dialogRef.afterClosed().subscribe((result) => {
        if(result){
          this.musicService.deleteAllSongs();
          this.resetAllSortBts('');
          this.deleteIdList = [];
          this.dataManipulatedEmitter.emit(true);
        }
        console.log('The dialog was closed');
      });
    }

  // paginator related variables
  pageSize = 10;
  totalLength = 0;
  pageIndex = 0;

  /**
   * Table column data
   * Title - displayed in the table
   * btnStatus - currently displayed sorting button
   * propertyName - field name in which this column is stores in the modal
   */
  tableColumns: Column[] = [
    {
      title: 'Song Name',
      btnStatus: 0,
      propertyName: 'songName',
    },
    {
      title: 'Artist Name',
      btnStatus: 0,
      propertyName: 'artistName',
    },
    {
      title: 'Number Of Streams',
      btnStatus: 0,
      propertyName: 'numberOfStreams',
    },
    {
      title: 'Release Year',
      btnStatus: 0,
      propertyName: 'releaseYear',
    },
    {
      title: 'Duration',
      btnStatus: 0,
      propertyName: 'durationInSeconds',
    },
    {
      title: 'Delete',
      btnStatus: 0,
      propertyName: '',
    },
  ];

  constructor(
    private musicService: MusicDataService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.totalLength = this.filteredSongs.length;
    this.pageIndex = 0;
    this.populateSongs();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.totalLength = changes['filteredSongs'].currentValue.length;
    this.pageIndex = 0;
    this.populateSongs();
  }

  /**
   * This function recalculates the paginator values and calls function to populate the table
   * @param e page change event from mat-paginator
   */
  handlePageEvent(e: PageEvent): void {
    this.totalLength = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.resetAllSortBts('');
    this.populateSongs();
  }

  /**
   * This function takes in the marked/unmarked songs and accordingly removes and pushes into lists.
   * This function also gives alert to the user when more than 5 items have been marked.
   * @param song The song whose check mark field has been clicked
   * @param event The check mark click event
   */
  toggleSelection(song: SongDisplay, event: Event): void {
    const isSelected = (<HTMLInputElement>event.target).checked;

    //If the song is just now selected we have to insert it into the delete list,
    //else remove it from the delete list
    if (isSelected) {
      this.deleteIdList.push(song.id);
      //If length is more than 5 alert the user
      if (this.deleteIdList.length > 5) {
        this.openAlertDialog();
      }
    } else {
      const index = this.deleteIdList.indexOf(song.id);
      if (index !== -1) {
        this.deleteIdList.splice(index, 1); // Remove one element starting from the specified index
      }
    }
  }

  /**
   * This function updates the displaySongs array to update the table
   * It helps to maintain the check mark status during searching and page changes
   */
  populateSongs(): void {
    const start=this.pageSize * this.pageIndex;
    let end=(this.pageIndex + 1) * this.pageSize;
    if(end>this.filteredSongs.length){
      end=this.filteredSongs.length;
    }
    const resultArr = this.filteredSongs.slice(
      start, end
    );
    this.displaySongs = cloneDeep(resultArr);
    this.deleteIdList.forEach((deleteId) => {
      let found = -1;
      found = this.displaySongs.findIndex((song) => deleteId === song.id);
      //If this song present in delete list then mark the check box
      if (found != -1) {
        this.displaySongs[found].isSelected = true;
      }
    });
  }

  /**
   * This function resets the rest of the columns sorting buttons to unsorted state
   * Uses for loop to iterate through the columns and sets the button state to 0
   * @param propertyName the column propertyName of whose sorting button is clicked
   */
  resetAllSortBts(propertyName: string): void {
    this.tableColumns.forEach((column) => {
      if (column.propertyName !== propertyName) {
        column.btnStatus = 0;
      }
    });
  }

  /**
   * This function changes the button to other sort types and calls the reset function
   * @param currentColumn The column of whose sorting button has been clicked
   */
  resetBtnCycle(currentColumn: Column): void {
    currentColumn.btnStatus += 1;
    this.resetAllSortBts(currentColumn.propertyName);
  }

  /**
   * Sorts the songs according to the column, sort order passed and returns the sorted array of songs
   *
   * @param currentColumn Column data on which sorting function is called
   * @param type The type defines the sort type: '0' for ascending, '1' for desc, '2' for unsorted
   */
  sortInOrder(currentColumn: Column, type: number): void {
    this.resetBtnCycle(currentColumn);
    // 2 means to sort in unsorted order so call the populate function which has the unsorted data
    // else call the sort function from services
    if (type === 2) {
      this.populateSongs();
    } else
      this.displaySongs = this.musicService.sortService(
        this.displaySongs,
        currentColumn.propertyName,
        type
      );
  }
}
