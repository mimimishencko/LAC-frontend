import { Injectable } from '@angular/core';
import { Subject} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SnackBarService {


  public snackBarStatus: Subject<string> = new Subject<string>();

  constructor() { }
}
