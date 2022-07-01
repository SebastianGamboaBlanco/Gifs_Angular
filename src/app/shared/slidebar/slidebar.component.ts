import { Component, OnInit } from '@angular/core';
import { GifsService } from 'src/app/gifs/services/gifs.service';

@Component({
  selector: 'app-slidebar',
  templateUrl: './slidebar.component.html',
})
export class SlidebarComponent {
  get historial(): string[] {
    return this.history.historial;
  }

  constructor(private history: GifsService) {}

  buscar(palabra: string) {
    this.history.buscarGifs(palabra);
  }
}
