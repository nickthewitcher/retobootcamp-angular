import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../services/api/api.service';
import {Simulator, Tarjetas} from '../../services';
import {HttpParams} from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public dataSimulator: Simulator;
  public submitted = false;
  public listaTipoTarjetas: string[] = [];
  tipoTarjeta = '';
  dni: number;
  monto: number;
  cuotas: number;
  tasa: number;
  diapago: number;
  listaCuotas: number[] = [];
  listaTasas: number[] = [];
  listaDiaPagos: number[] = [];

  cuota: number;
  moneda: string;
  primeraCuota: string;
  estado: string;


  constructor(public apiService: ApiService) {
    this.loadSimulator();

  }

  ngOnInit(): void {
  }

  public loadSimulator(): void {
    this.apiService.getSimulator().subscribe((data) => {
      this.dataSimulator = data;
      console.log(this.dataSimulator);

      this.listaTipoTarjetas[0] = this.dataSimulator.response.tarjetas.clasica;
      this.listaTipoTarjetas[1] = this.dataSimulator.response.tarjetas.oro;
      this.listaTipoTarjetas[2] = this.dataSimulator.response.tarjetas.black;
      this.listaCuotas = this.dataSimulator.response.cuotas;
      this.listaDiaPagos = this.dataSimulator.response.dias_pagos;
      this.listaTasas = this.dataSimulator.response.tea;

    });
  }


  onSubmitted(): void {

  }

  resetFormulario(): void {

  }

  enviarDatos(): void {
  console.log('datos a enviar');
  console.log(this.dni);
  console.log(this.monto);
  console.log(this.cuotas);
  console.log(this.tasa);
  console.log(this.diapago);

  const payload = new HttpParams()
      .set('dni', this.dni + '')
      .set('tarjeta', this.tipoTarjeta + '')
      .set('monto', this.monto + '')
      .set('cuotas', this.cuotas + '')
      .set('tea', this.tasa + '')
      .set('dia_pago', this.diapago + '');


  this.apiService.postSimulator(payload)
      .subscribe(
        response => {
          console.log('post data');
          console.log(response);

          this.cuota = response.response.cuota;
          this.primeraCuota = response.response.primeraCuota;
          this.estado = response.response.estado;
          this.moneda = response.response.moneda;
          this.submitted = true;
        },
        error => {
          console.log(error);
        });




  }

  volverAPrincipal(): void {
    this.submitted = false;
    /*this.dni = '';
    this.tipoTarjeta = '';*/

  }
}
