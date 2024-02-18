import { TestBed } from '@angular/core/testing';

import { MusicDataService } from './music-data.service';
import { Songs } from '../../model/Song';

const musicData = [
  {
    id: '171a95ee-d777-4c3c-b8fa-89ab55ebbd36',
    songName:
      'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est.',
    artistName: 'Norbie Stoves',
    numberOfStreams: 1458,
    releaseYear: 1994,
    durationInSeconds: 180,
    durationInMMSS:''
  },
  {
    id: '50bf47ab-06c0-4ef8-82f7-9234c09c6df3',
    songName: 'Proin interdum mauris non ligula pellentesque ultrices.',
    artistName: 'Krishna Airdrie',
    numberOfStreams: 4744,
    releaseYear: 1990,
    durationInSeconds: 68,
    durationInMMSS:''
  },
  {
    id: '97125520-332d-4e2d-8e32-6c827597583e',
    songName: 'In blandit ultrices enim.',
    artistName: 'Liana Moakson',
    numberOfStreams: 3922,
    releaseYear: 2010,
    durationInSeconds: 299,
    durationInMMSS:''
  },
  {
    id: '05e40698-2252-4d1f-afda-5492c119a5bf',
    songName:
      'Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue.',
    artistName: 'Sidnee Gwilym',
    numberOfStreams: 3799,
    releaseYear: 2013,
    durationInSeconds: 454,
    durationInMMSS:''
  },
  {
    id: 'bdbc6a0b-c27c-4474-8f31-cfe98e057d16',
    songName: 'Aliquam erat volutpat.',
    artistName: 'Salomi Kemson',
    numberOfStreams: 2687,
    releaseYear: 1993,
    durationInSeconds: 120,
    durationInMMSS:''
  },
  {
    id: '3cbb52e0-dc75-481d-8b2f-f7759a9aaa4e',
    songName: 'Duis mattis egestas metus.',
    artistName: 'Ximenes Munnis',
    numberOfStreams: 3828,
    releaseYear: 1986,
    durationInSeconds: 60,
    durationInMMSS:''
  },
  {
    id: 'f35a2af3-98d5-4dfb-84dc-e40c829d5dd4',
    songName: 'Morbi non quam nec dui luctus rutrum.',
    artistName: 'Aubine Stoyell',
    numberOfStreams: 3241,
    releaseYear: 2001,
    durationInSeconds: 160,
    durationInMMSS:''
  },
  {
    id: '14654d7a-dbba-44af-90ab-ee8bf59e0e90',
    songName: 'Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam.',
    artistName: 'Elset Scutter',
    numberOfStreams: 4252,
    releaseYear: 2002,
    durationInSeconds: 75,
    durationInMMSS:''
  },
  {
    id: 'fdaed0e0-393e-4244-89fc-a076ff208641',
    songName: 'Nulla ut erat id mauris vulputate elementum.',
    artistName: 'Dario Grinyakin',
    numberOfStreams: 4437,
    releaseYear: 1991,
    durationInSeconds: 328,
    durationInMMSS:''
  },
  {
    id: '0417c764-6fdd-4f75-b4aa-6e8b575799aa',
    songName: 'Etiam faucibus cursus urna.',
    artistName: 'Gretal Quinnette',
    numberOfStreams: 304,
    releaseYear: 2009,
    durationInSeconds: 63,
    durationInMMSS:''
  },
  {
    id: '68f46b09-3dfc-48e5-b05b-43cdefe667d0',
    songName: 'Nunc purus.',
    artistName: 'Zorina Biasini',
    numberOfStreams: 1638,
    releaseYear: 2009,
    durationInSeconds: 360,
    durationInMMSS:''
  },
  {
    id: 'eeb4479f-9793-431b-b123-4369968feda0',
    songName: 'Nulla facilisi.',
    artistName: 'Silas Stapylton',
    numberOfStreams: 3509,
    releaseYear: 2006,
    durationInSeconds: 81,
    durationInMMSS:''
  },
  {
    id: 'cf4b61d8-1635-4c5b-8d96-9a9e24a81c06',
    songName:
      'Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci.',
    artistName: 'Corbet Pattinson',
    numberOfStreams: 196,
    releaseYear: 2010,
    durationInSeconds: 428,
    durationInMMSS:''
  },
  {
    id: '4033adc4-7700-468a-947c-e532d48eb112',
    songName: 'Maecenas ut massa quis augue luctus tincidunt.',
    artistName: 'Genevra Clare',
    numberOfStreams: 4524,
    releaseYear: 2008,
    durationInSeconds: 467,
    durationInMMSS:''
  },
];

fdescribe('MusicServiceService', () => {
  let service: MusicDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MusicDataService);
  });

  it('should created the service', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize displaySongs property',()=>{
    expect(service.displaySongs).toBeDefined();
  });

  it('should convert seconds to MM:SS format', ()=>{
    expect(service.displaySongs[0].durationInMMSS).toBeDefined();
  });

  it('should pass correct data into the subject',()=>{
    const searchDataSubject$=service.searchDataSubject$;
    class Filter{
      songName:string;
      artistName:string;
    }
    const searchData: Filter={songName:'SongName', artistName:'ArtistName'};

    service.searchFormTrigger(searchData);
    searchDataSubject$.subscribe((data:Filter)=>{
      expect(data).toEqual(searchData);
    })
  });

  it('searchTrigger should return void',()=>{
    class Filter{
      songName:string;
      artistName:string;
    }
    const searchData: Filter={songName:'SongName', artistName:'ArtistName'};

    const result=service.searchFormTrigger(searchData);
    expect(result).toBeUndefined();
  });

  it('duration should be converted correctly',()=>{
    const songDetail:Songs=musicData[0];
    const result=service.convertDurationOfElement(songDetail);
    expect(songDetail.durationInMMSS).toBe('03:00');
    expect(result).toBeUndefined();
  });

  it('convertDuration should convert duration to correct format',()=>{
    const result=service.convertDuration(musicData);

    musicData.forEach((song)=>{
      expect(song.durationInMMSS).toMatch('[0-9][0-9]:[0-9][0-9]'); 
    });

    expect(result).toBeUndefined();
  });

  it('entry made using addSong',()=>{
    spyOn(service,'convertDurationOfElement').and.callThrough();
    spyOn(service,'saveData');

    const result = service.addSongEntry(musicData[0]);

    expect(service.convertDurationOfElement).toHaveBeenCalledWith(musicData[0]);
    expect(service.displaySongs).toContain(musicData[0]);
    expect(service.saveData).toHaveBeenCalled();
    expect(result).toBeUndefined();
  });

  it('stored song data to session storage',()=>{
    const sessionSpy=spyOn(sessionStorage,'setItem');

    service.displaySongs=musicData;

    const result=service.saveData();
    expect(sessionSpy).toHaveBeenCalledWith('displaySongs', JSON.stringify(musicData));
    expect(result).toBeUndefined;
  });


});
