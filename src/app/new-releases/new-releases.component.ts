import { Component, OnInit } from '@angular/core';
import { MusicDataService } from '../music-data.service'
@Component({
  selector: 'app-new-releases',
  templateUrl: './new-releases.component.html',
  styleUrls: ['./new-releases.component.css']
})
export class NewReleasesComponent implements OnInit {

  releases : any;
  private liveSub: any;
  constructor(private data: MusicDataService) { }

  ngOnInit(): void {
    this.liveSub = this.data.getNewReleases().subscribe(data =>  this.releases = data);
  }

  ngOnDestroy(){
    this.liveSub.unsubscribe();
  }
}
