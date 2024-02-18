import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-box',
  templateUrl: './confirm-box.component.html',
  styleUrls: ['./confirm-box.component.scss']
})
export class ConfirmBoxComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { deleteSongName: string[]; deleteSongId: string[] },
    public dialogRef: MatDialogRef<ConfirmBoxComponent>,
  ) {}

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  proceedDelete():void{
    this.dialogRef.close(true);
  }
}
