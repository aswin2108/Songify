import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MusicDataService } from '../../services/music-data/music-data.service';
import { ConfirmBoxComponent } from '../confirm-box/confirm-box.component';

@Component({
  selector: 'app-delete-song',
  templateUrl: './delete-song.component.html',
  styleUrls: ['./delete-song.component.scss'],
})
export class DeleteSongComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { deleteSongName: string[]; deleteSongId: string[] },
    public dialogRef: MatDialogRef<DeleteSongComponent>,
    private songService: MusicDataService,
    public dialog: MatDialog
  ) {}
  onNoClick(): void {
    this.dialogRef.close(false);
  }

  openConfirmDialog(
  ): void {
    const dialogRef = this.dialog.open(ConfirmBoxComponent, {
      
    });

    //Recieves a boolean value to determine if a delete operation has occoured or not through result
    dialogRef.afterClosed().subscribe((result) => {
      //If deletion occours make the delete list empty
      if (result) {
        this.deleteSelectedSongs();
      }
    });
  }


  /**
   * Function to delete the song
   */
  deleteSelectedSongs(): void {
    // const decision = confirm(
    //   ''
    // );

    //If user confirms the delete then delete it
    this.dialogRef.close(true);
  }
}
