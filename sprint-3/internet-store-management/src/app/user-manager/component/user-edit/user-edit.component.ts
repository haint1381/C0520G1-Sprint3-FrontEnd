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
    return (v.password === v.confirmPassword) ? null : {
      passwordNotMatch: true
    };
  }
}

// tslint:disable-next-line:typedef
export function checkNameUser(name = []) {
  return (a: AbstractControl) => {
    return (name.includes(a.value) ? {invalidName: true} : null);
  };
}

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  public dataId;
  public formEdit: FormGroup;
  // public asset = new Asset();
  public idMessage = 2;
  public valueGender;
  public userList;
  public listUserName = [];
  maxDate = new Date();
  minDate = new Date(1920, 0, 1);

  constructor(
    private  dialog: MatDialog,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private activatedRouter: ActivatedRoute,
    private route: ActivatedRoute,
    private router: Router,
    private dialogRef: MatDialogRef<UserEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private title: Title
  ) {
  }

  ngOnInit(): void {
    this.title.setTitle('User');
    this.formEdit = this.formBuilder.group({
      // idUser: [''],
      username: ['', [Validators.required, Validators.pattern('^[a-z0-9]{3,30}$'), checkNameUser(this.listUserName)]],
      // password: ['', [Validators.required, Validators.pattern('^[a-z0-9]{6,30}$')]],
      // confirmPassword: [''],
      fullName: ['', [Validators.required, Validators.maxLength(30), Validators.pattern(/^[a-zA-Zà-ỹÀ-Ỹ\s]{1,30}$/)]],
      email: ['', [Validators.required, Validators.pattern(/^[a-z][a-z0-9_\.]{3,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$/)]],
      gender: ['', [Validators.required]],
      money: ['0'],
      birthday: ['', [Validators.required]]
    });
    this.dataId = this.data.dataC;
    this.valueGender = this.data.dataD;
    console.log(this.valueGender);
    this.userService.getByID(this.dataId).subscribe(getData => {
      this.formEdit.patchValue(getData);
    });
    this.userService.getAll().subscribe(data => {
      this.userList = data;
      this.getAllUserName();
    });
  }

  edit(): void {
    if (this.formEdit.valid) {
      console.log(this.formEdit.value);
      this.userService.edit(this.formEdit.value, this.dataId).subscribe(data => {
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

  // tslint:disable-next-line:typedef
  valueGenderClick(value: boolean) {
    this.formEdit.value.gender = value;
  }

  getAllUserName(): void {
    if (!this.userList.isEmpty) {
      for (const user of this.userList) {
        this.listUserName.push(user.username);
      }
    }
  }
}
