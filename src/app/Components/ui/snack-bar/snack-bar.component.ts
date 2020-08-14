import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {SnackBarService} from './snack-bar.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-snack-bar',
  templateUrl: './snack-bar.component.html',
  styleUrls: ['./snack-bar.component.scss']
})
export class SnackBarComponent implements OnInit {

  private delay = 5000;
  private snackBarSubscription: Subscription;
  constructor(private snackBar: MatSnackBar, public snackBarService: SnackBarService) { }

  ngOnInit() {
    this.snackBarSubscription = this.snackBarService.snackBarStatus.subscribe(message => {
      this.snackBar.open(message, null, {
        duration: this.delay
      });
    });
  }

}
