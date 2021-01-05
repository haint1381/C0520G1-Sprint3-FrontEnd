import { Component, OnInit } from '@angular/core';
import {MatDialogConfig, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-message-success',
  templateUrl: './message-success.component.html',
  styleUrls: ['./message-success.component.css']
})
export class MessageSuccessComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<MessageSuccessComponent>,
  ) { }

  ngOnInit(): void {
    const matDialogConfig: MatDialogConfig = new MatDialogConfig();
    matDialogConfig.position = {left: `35%`, top: `60px`};
    this.dialogRef.updatePosition(matDialogConfig.position);
  }

}
