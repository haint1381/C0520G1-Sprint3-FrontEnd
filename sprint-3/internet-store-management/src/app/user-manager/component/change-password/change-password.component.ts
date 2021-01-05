import {Component, Inject, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {UserService} from '../../service/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {MessgerUserComponent} from '../messger-user/messger-user.component';

// tslint:disable-next-line:typedef
function comparePassword(c: AbstractControl) {
  const v = c.value;
  const isNotEmpty = v.confirmPassword !== '';
  if (isNotEmpty) {
    return (v.newPassword === v.confirmPassword) ? null : {
      passwordNotMatch: true
    };
  }
}

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  public dataId;
  public formChangePassword: FormGroup;
  public idMessage = 4;

  constructor(
    private  dialog: MatDialog,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private activatedRouter: ActivatedRoute,
    private route: ActivatedRoute,
    private router: Router,
    private dialogRef: MatDialogRef<ChangePasswordComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private title: Title
  ) {
  }

  ngOnInit(): void {
    this.title.setTitle('User');
    this.formChangePassword = this.formBuilder.group({
      newPassword: ['', [Validators.required, Validators.pattern('^[a-z0-9]{6,30}$')]],
      confirmPassword: ['', [Validators.required]],
    }, {validator: comparePassword});
    this.dataId = this.data.dataC;
    this.userService.getByID(this.dataId).subscribe(getData => {
      this.formChangePassword.patchValue(getData);
    });
  }

  changePass(): void {
    if (this.formChangePassword.valid) {
      this.userService.changePassword(this.formChangePassword.value, this.dataId).subscribe(data => {
        this.dialogRef.close();
        this.openDialogMessage();
      }, error => {
        console.log(error);
      });
    }
  }

  openDialogMessage(): void {
    const timeout = 1800;
    const dialogRef = this.dialog.open(MessgerUserComponent, {
      width: '400px',
      height: '200px',
      data: {dataMessage: this.idMessage},
      disableClose: true
    });
    dialogRef.afterOpened().subscribe(_ => {
      setTimeout(() => {
        dialogRef.close();
      }, timeout);
    });
  }
}
