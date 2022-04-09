import { Component, OnInit } from '@angular/core';
import { MusicDataService } from '../music-data.service'
@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {
  favorites : Array<any> =[];
  private liveSub: any;
  removeFromFavorites(id :any){
    this.liveSub = this.data.removeFromFavorites(id).subscribe(data => this.favorites = data.tracks);
  }
  constructor(private data: MusicDataService) { }

  ngOnInit(): void {
    this.liveSub = this.data.getFavorites().subscribe(data =>  this.favorites = data.tracks);
  }
  ngOnDestroy(){
    this.liveSub.unsubscribe();
  }

}
