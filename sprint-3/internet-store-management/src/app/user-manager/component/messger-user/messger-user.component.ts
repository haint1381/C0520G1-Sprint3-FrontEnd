import {Component, Inject, OnInit} from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-messger-asset',
  templateUrl: './messger-user.component.html',
  styleUrls: ['./messger-user.component.css']
})
export class MessgerUserComponent implements OnInit {
  public messageNotification;

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<MessgerUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private title: Title
  ) {
  }
  ngOnInit(): void {
    this.title.setTitle('Asset');
    this.messageNotification = this.data.dataMessage;
    const matDialogConfig: MatDialogConfig = new MatDialogConfig();
    matDialogConfig.position = {left: `35%`, top: `60px`};
    this.dialogRef.updatePosition(matDialogConfig.position);
  }
}
