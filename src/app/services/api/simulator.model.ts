import {Response} from './response';

export class Simulator {
  code: number;
  response: Response;

  constructor(code: number, response: Response) {
    this.code = code;
    this.response = response;
  }
}
