import { Injectable} from '@nestjs/common';
import {Languages} from "./helpers/consts";

@Injectable()
export class AppService {
  getHello(): string {
    return 'arabian wind'
  }

  getLanguages(): {[key: number]: string}{
    let index: number = 0
    const obj = {}
    for (let key in Languages) {
      obj[index] = key
      index ++
    }
    return obj
  }
}
