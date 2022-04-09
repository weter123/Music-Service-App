import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MusicDataService } from '../music-data.service'
@Component({
  selector: 'app-artist-discography',
  templateUrl: './artist-discography.component.html',
  styleUrls: ['./artist-discography.component.css']
})
export class ArtistDiscographyComponent implements OnInit {

  albums : any;
  artist: any;
  private liveSub: any;
  constructor(private route: ActivatedRoute, private data: MusicDataService ) { }
  
  ngOnInit(): void {
    this.liveSub = this.data.getArtistById(this.route.snapshot.params['id']).subscribe(data => this.artist = data);
    this.liveSub = this.data.getAlbumsByArtistId(this.route.snapshot.params['id']).subscribe(data=> this.albums = data.items);
  }

  ngOnDestroy(){
    this.liveSub.unsubscribe();
  }

}
