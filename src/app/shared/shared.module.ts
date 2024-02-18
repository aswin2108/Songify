import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddSongComponent } from './sharedComponents/add-song/add-song.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DeleteSongComponent } from './sharedComponents/delete-song/delete-song.component';
import { MaterialModule } from '../material/material.module';
import { ConfirmBoxComponent } from './sharedComponents/confirm-box/confirm-box.component';
import { AlertBoxComponent } from './sharedComponents/alert-box/alert-box.component';
import { DeleteAllComponent } from './sharedComponents/delete-all/delete-all.component';
import { DurationPickerModule } from 'ngx-duration-picker';

@NgModule({
  declarations: [AddSongComponent, DeleteSongComponent, ConfirmBoxComponent, AlertBoxComponent, DeleteAllComponent],
  imports: [CommonModule, ReactiveFormsModule, MaterialModule,DurationPickerModule],
})
export class SharedModule {}
