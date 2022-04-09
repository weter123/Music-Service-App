import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { SpotifyTokenService } from './spotify-token.service';
import { environment } from './../environments/environment';


import { mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MusicDataService {
  //favoritesList : Array<any> = [];
  constructor(private spotifyToken: SpotifyTokenService, private http: HttpClient) { }  

  getNewReleases(): Observable<SpotifyApi.ListOfNewReleasesResponse> {
      return this.spotifyToken.getBearerToken().pipe(mergeMap(token=>{
        return this.http.get<SpotifyApi.ListOfNewReleasesResponse>("https://api.spotify.com/v1/browse/new-releases", { headers: { "Authorization": `Bearer ${token}` } });
      }));
  }

  getArtistById(id: any) : Observable<SpotifyApi.SingleArtistResponse> {
    return this.spotifyToken.getBearerToken().pipe(mergeMap(token=>{
      return this.http.get<SpotifyApi.SingleArtistResponse>(`https://api.spotify.com/v1/artists/${id}`, { headers: { "Authorization": `Bearer ${token}` } });
    }));
  }  
  getAlbumsByArtistId(id: any):Observable<SpotifyApi.ArtistsAlbumsResponse> {
    return this.spotifyToken.getBearerToken().pipe(mergeMap(token=>{
      return this.http.get<SpotifyApi.ArtistsAlbumsResponse>(`https://api.spotify.com/v1/artists/${id}/albums?include_groups=album%2Csingle&limit=50`, { headers: { "Authorization": `Bearer ${token}` } });
    }));
  }  
  getAlbumById(id: any): Observable<SpotifyApi.SingleAlbumResponse> {
    return this.spotifyToken.getBearerToken().pipe(mergeMap(token=>{
      return this.http.get<SpotifyApi.SingleAlbumResponse>(`https://api.spotify.com/v1/albums/${id}`, { headers: { "Authorization": `Bearer ${token}` } });
    }));
  }  
  searchArtists(searchString: any) : Observable<SpotifyApi.ArtistSearchResponse> {
    return this.spotifyToken.getBearerToken().pipe(mergeMap(token=>{
      return this.http.get<SpotifyApi.ArtistSearchResponse>(`https://api.spotify.com/v1/search/?q=${searchString}&type=artist&&limit=50`, { headers: { "Authorization": `Bearer ${token}` } });
    }));
  }
  addToFavorites(id:string): Observable<[String]> {
    // TODO: make a PUT request to environment.userAPIBase/favourites/:id to add id to favourites
    console.log(id);
    return this.http.put<[String]>(`${environment.userAPIBase}/favorites/${id}`, id);
  }
  
  removeFromFavorites(id:string): Observable<any> {
    return this.http.delete<[String]>(`${environment.userAPIBase}/favorites/${id}`).pipe(mergeMap(favouritesArray => {
      // TODO: Perform the same tasks as the original getFavourites() method, only using "favouritesArray" from above, instead of this.favouritesList
      // NOTE: for the empty array, you will need to use o=>o.next({tracks: []}) instead of o=>{o.next([])}
      let index = favouritesArray.indexOf(id);
      if (index > -1) {
        favouritesArray.splice(index, 1); 
      }
      return this.getFavorites();
    }));
  }
  
  getFavorites(): Observable<any> {
    return this.http.get<[String]>(`${environment.userAPIBase}/favorites/`).pipe(mergeMap(favouritesArray => {
      // TODO: Perform the same tasks as the original getFavorites() method, only using "favouritesArray" from above, instead of this.favouritesList
      // NOTE: for the empty array, you will need to use o=>o.next({tracks: []}) instead of o=>{o.next([])}
      if(favouritesArray.length > 0){
        let items = favouritesArray;
        return this.spotifyToken.getBearerToken().pipe(mergeMap(token=>{
          return this.http.get<any>(`https://api.spotify.com/v1/tracks?ids=${items}`, { headers: { "Authorization": `Bearer ${token}` } });
        }));
      }else{
        return new Observable(o=>o.next({tracks: []}));
      }
     
    }));
  }

  /*

  addToFavorites(id:any){
    if(!id || this.favoritesList.length >=50){
      return false;
    }
    else{
      this.favoritesList.push(id);
      return true;
    }
  }

  removeFromFavorites(id:any) : Observable<any>{
    let index = this.favoritesList.indexOf(id);
    if (index > -1) {
      this.favoritesList.splice(index, 1); 
    }
    return this.getFavorites();
  }

  getFavorites(): Observable<any> {
    if(this.favoritesList.length > 0){
      let items = this.favoritesList.join();
      return this.spotifyToken.getBearerToken().pipe(mergeMap(token=>{
        return this.http.get<any>(`https://api.spotify.com/v1/tracks?ids=${items}`, { headers: { "Authorization": `Bearer ${token}` } });
      }));
    }else{
      return new Observable(o=>{o.next([])});
    }
  }
  */
}