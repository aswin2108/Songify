import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-all',
  templateUrl: './delete-all.component.html',
  styleUrls: ['./delete-all.component.scss']
})
export class DeleteAllComponent {
  
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { deleteSongName: string[]; deleteSongId: string[] },
    public dialogRef: MatDialogRef<DeleteAllComponent>,
  ) {}

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  proceedToDeleteAll():void{
    this.dialogRef.close(true);
  }
  

}
