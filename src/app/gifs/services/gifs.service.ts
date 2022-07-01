import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gifs, SearchGifsResponse } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  public data: Gifs[] = [];
  private _historial: string[] = [];
  private apiKey: string = 'LFaDq0C7YeR6GZzX0fpaSUZQhprUFh0w';
  private endPoint: string = 'https://api.giphy.com/v1/gifs';

  constructor(private http: HttpClient) {
    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    this.data = JSON.parse(localStorage.getItem('data')!) || [];
    // if (localStorage.getItem('historial')) {
    //   this._historial = JSON.parse(localStorage.getItem('historial')!);
    // }
  }

  get historial(): string[] {
    return [...this._historial];
  }

  buscarGifs(termino: string): void {
    const palabra = termino.toLowerCase();
    if (!this._historial.includes(palabra)) {
      this._historial.unshift(palabra);
      this._historial = this._historial.slice(0, 10);
      localStorage.setItem('historial', JSON.stringify(this._historial));
    }
    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '9')
      .set('q', palabra);
    this.http
      .get<SearchGifsResponse>(`${this.endPoint}/search`, { params })
      .subscribe((resp: SearchGifsResponse) => {
        this.data = resp.data;
        localStorage.setItem('data', JSON.stringify(this.data));
      });
  }
}
