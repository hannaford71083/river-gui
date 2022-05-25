import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IUser } from '../models/app-interfaces';
import { GeneralService } from '../services/general.service';
import { gsap } from 'gsap';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styles:[`
    table {
      width: 100%;
    }
  `]
})
export class UserListComponent implements OnInit {

  displayedColumns: string[] = ['title', 'firstName', 'lastName',  'email', 'role', 'icons'];
  users : IUser[] = [];

  constructor(private generalService : GeneralService, public dialog: MatDialog) { }

  ngOnInit(): void { }

  ngAfterViewInit() {
    let anime = gsap.timeline({defaults: { ease: "linear" }});
    this.updateUserList();
    anime.to(".fade-in", {  opacity: 1, duration: 0.5 }, "+=0.5");
  }

  updateUserList(){
    this.generalService.getUserList().subscribe({
      next: users => {
        this.users = users;
      },
      error: err => {} 
    });
  }

  editItem(id : number){
    location.href = `#/user/edit/${id}`;
  }

  deleteItem(user : any){
    this.dialog.open(DeleteUserDialog, {
      width: '400px',
      data: {
        name: `${user.firstName} ${user.lastName}`,
        id: user.id,
        callback: () => { this.updateUserList() }
      },
    });
  }

  createUser(){
    location.href = `#/user/create`;
  }

}

export interface IDeleteDialogData{
  name: string;
  id: number;
  callback: any;
}


@Component({
  selector: 'delete-dialog',
  templateUrl: 'delete-dialog.html',
})
export class DeleteUserDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: IDeleteDialogData, public dialogRef: MatDialogRef<DeleteUserDialog>, private generalService : GeneralService,) {}
  closeDialog(){
    this.dialogRef.close();
  }
  deleteItem(){
    this.generalService.deleteUser(this.data.id).subscribe({
      next: data => {
        this.data.callback();
        this.dialogRef.close();
      },
      error: err => {} 
    });
  }
}
