import {Component, Inject, OnInit} from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-messger-asset',
  templateUrl: './messger-asset.component.html',
  styleUrls: ['./messger-asset.component.css']
})
export class MessgerAssetComponent implements OnInit {
  public messageNotification;

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<MessgerAssetComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private title: Title
  ) {
  }
  ngOnInit(): void {
    this.title.setTitle('Asset');
    this.messageNotification = this.data.dataMessage;
    const matDialogConfig: MatDialogConfig = new MatDialogConfig();
    matDialogConfig.position = {left: `40%`, top: `60px`};
    this.dialogRef.updatePosition(matDialogConfig.position);
  }
}
