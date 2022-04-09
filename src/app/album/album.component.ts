import { Component, OnInit, Output, EventEmitter  } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MusicDataService } from '../music-data.service'
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit {

  @Output() btnClicked = new EventEmitter();
  album : any;
  private liveSub: any;
  
  constructor( private snackBar: MatSnackBar, private route: ActivatedRoute, private data: MusicDataService) { }
  addToFavorites(trackID: any){
    this.data.addToFavorites(trackID).subscribe( 
      (success) => this.snackBar.open("Adding to Favorites...", "Done", { duration: 1500 }),
      (error) => this.snackBar.open("Unable to add song to Favorites", "Done", { duration: 1500 })
    );
  }
  ngOnInit(): void {
    this.liveSub = this.data.getAlbumById(this.route.snapshot.params['id']).subscribe(data => this.album = data);  
  }
  ngOnDestroy(){
    this.liveSub.unsubscribe();
  }

}
