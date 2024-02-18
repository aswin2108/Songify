import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-alert-box',
  templateUrl: './alert-box.component.html',
  styleUrls: ['./alert-box.component.scss']
})
export class AlertBoxComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { deleteSongName: string[]; deleteSongId: string[] },
    public dialogRef: MatDialogRef<AlertBoxComponent>,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
