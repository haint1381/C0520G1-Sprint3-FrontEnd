import { Component, OnInit } from '@angular/core';
import {MatDialogConfig, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-message-buy-hour',
  templateUrl: './message-buy-hour.component.html',
  styleUrls: ['./message-buy-hour.component.css']
})
export class MessageBuyHourComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<MessageBuyHourComponent>,
  ) { }

  ngOnInit(): void {
    const matDialogConfig: MatDialogConfig = new MatDialogConfig();
    matDialogConfig.position = {left: `35%`, top: `60px`};
    this.dialogRef.updatePosition(matDialogConfig.position);
  }

}
