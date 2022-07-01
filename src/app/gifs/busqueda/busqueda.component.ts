import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [],
})
export class BusquedaComponent implements OnInit {
  @ViewChild('txtBusqueda') txtBusqueda!: ElementRef<HTMLInputElement>;
  constructor(private gifs_service: GifsService) {}

  ngOnInit(): void {}

  buscar() {
    if (this.txtBusqueda.nativeElement.value.trim().length === 0) return;
    this.gifs_service.buscarGifs(this.txtBusqueda.nativeElement.value);
    this.txtBusqueda.nativeElement.value = '';
  }
}
