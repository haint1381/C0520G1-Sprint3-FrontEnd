import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ComputerService} from '../../service/computer.service';
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-computer-delete',
  templateUrl: './computer-delete.component.html',
  styleUrls: ['./computer-delete.component.css']
})
export class ComputerDeleteComponent implements OnInit {
  public computerName;
  public idComputer;
  constructor(
    public dialogRef: MatDialogRef<ComputerDeleteComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    public computerService: ComputerService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.idComputer = this.data.fullName.idComputer;
    this.computerName = this.data.fullName.computerName;
  }
  deleteComment(): void {
    this.computerService.deleteComputer(this.idComputer).subscribe(data => {
      this.dialogRef.close();
      this.toastr.success('Xóa máy thành công!', 'Thành công!');
    });
  }
}
