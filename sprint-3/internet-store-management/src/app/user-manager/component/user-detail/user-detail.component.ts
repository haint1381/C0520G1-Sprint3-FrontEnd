import {Component, Inject, OnInit} from '@angular/core';
import {UserService} from '../../service/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {AngularFireStorage} from '@angular/fire/storage';
import {finalize} from 'rxjs/operators';
import {MessgerUserComponent} from '../messger-user/messger-user.component';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  public username;
  public userOfId;
  public fullName;
  public email;
  public password;
  public birthday;
  public image;
  public gender;
  selectedImage: any = null;
  url = this.image;
  id: string;
  file: string;
  public idMessage = 5;

  constructor(
    private dialogRef: MatDialogRef<UserDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UserService,
    private router: Router,
    private  dialog: MatDialog,
    private title: Title,
    @Inject(AngularFireStorage) private storage: AngularFireStorage
  ) {
  }

  ngOnInit(): void {
    this.userService.getImageDetailList();
    this.title.setTitle('User');
    this.userOfId = this.data.data1.idUser;
    this.username = this.data.data1.username;
    this.email = this.data.data1.email;
    this.fullName = this.data.data1.fullName;
    this.birthday = this.data.data1.birthday;
    this.image = this.data.data1.image;
    this.url = this.image;
    this.password = this.data.data1.password;
    if (this.data.data1.gender) {
      this.gender = 'Nam';
    } else {
      this.gender = 'Nữ';
    }
  }

  showPreview(event: any): void {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.url = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
    } else {
      this.url = this.image;
      this.selectedImage = null;
    }
  }

  save(): void {
    // const name = this.selectedImage.name;
    const name = this.username;
    const fileRef = this.storage.ref(name);
    this.storage.upload(name, this.selectedImage).snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe((url) => {
          this.url = url;
          this.userService.insertImageDetails(this.url);
          this.userService.updateAccountImage(this.userOfId, this.url).subscribe(data => {
            if (data == null) {
              this.openDialogMessage();
            }
          });
        });
      })
    ).subscribe();
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
