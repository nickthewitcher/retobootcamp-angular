import {Tarjetas} from './tarjetas.model';

export class Response {
  tarjetas: Tarjetas;
  cuotas: number[];
  dias_pagos: number[];
  tea: number[];

  constructor(tarjetas: Tarjetas, cuotas: number[], dias_pagos: number[], tea: number[]) {
    this.tarjetas = tarjetas;
    this.cuotas = cuotas;
    this.dias_pagos = dias_pagos;
    this.tea = tea;
  }
}
