import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Songs } from '../../model/Song';
import { MusicDataService } from '../../services/music-data/music-data.service';

@Component({
  selector: 'app-add-song',
  templateUrl: './add-song.component.html',
  styleUrls: ['./add-song.component.scss'],
})
export class AddSongComponent implements OnInit {
  addForm: FormGroup;
  newSong: Songs;
  myDuration:string|number;


  constructor(
    public dialogRef: MatDialogRef<AddSongComponent>,
    private fb: FormBuilder,
    private songService: MusicDataService
  ) {}

  ngOnInit(): void {
    this.initializeAddSongForm();
    this.newSong={
      songName:'',
      artistName:'',
      id:'',
      numberOfStreams:0,
      releaseYear:0,
      durationInSeconds:0,
      durationInMMSS:''
    }
  }

  /**
   * Function initialize the add song form and to add validators
   */
  initializeAddSongForm(): void {
    this.addForm = this.fb.group({
      id: this.fb.control(
        this.songService.generateSongId(),
        Validators.required
      ),
      songName: this.fb.control('', [
        Validators.required,
        Validators.pattern('^[A-Za-zs]{1,}[.]{0,1}[A-Za-zs]{0,}$'),
      ]),
      artistName: this.fb.control('', [
        Validators.required,
        Validators.pattern('^[A-Za-zs]{1,}[.]{0,1}[A-Za-zs]{0,}$'),
      ]),
      numberOfStreams: this.fb.control('', [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
      ]),
      releaseYear: this.fb.control('', Validators.required),
      durationInSeconds: this.fb.control('',Validators.required),
    }) as FormGroup & Songs;
    this.valueChanges();
  }

  /**
   * Function to subscribe to the add form
   */
  valueChanges(): void {
    this.addForm.valueChanges.subscribe((newData: Songs) => {
      this.newSong = newData;

      const numberVariable: number = this.myDuration as number;
      this.newSong.durationInSeconds=numberVariable;

      const year=new Date(this.addForm.get('releaseYear').value);
      this.newSong.releaseYear=year.getFullYear();
    });
  }

  onOutputSeconds(durationValue:string | number):void{
    this.myDuration=durationValue;
  }

  /**
   * Function to add song into the list
   */
  submitAddSong(): void {
    this.newSong.artistName=this.newSong.artistName.replace(/\./g, ' ');
    this.newSong.songName=this.newSong.songName.replace(/\./g, ' ');
    this.dialogRef.close(this.newSong);
  }

  /**
   * Toclose the dialog box
   */
  onNoClick(): void {
    this.dialogRef.close();
  }
}
