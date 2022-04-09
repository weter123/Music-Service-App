import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MusicDataService } from '../music-data.service'
@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {

  results : any;
  searchQuery :string = "";
  private liveSub: any;
  constructor( private route: ActivatedRoute, private data: MusicDataService) { }

  ngOnInit(): void {
    
    this.searchQuery =this.route.snapshot.queryParams['q'];
    this.liveSub = this.data.searchArtists(this.searchQuery).subscribe(data => this.results = data.artists.items.filter((e)=> e.images.length  > 0));
  }
  ngOnDestroy(){
    this.liveSub.unsubscribe();
  }

}
