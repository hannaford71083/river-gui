import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { UpdateMode } from '../models/app-enums';
import { IUser } from '../models/app-interfaces';
import { GeneralService } from '../services/general.service';



export function ConfirmPasswordValidator(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
    let control = formGroup.controls[controlName];
    let matchingControl = formGroup.controls[matchingControlName]
    if (
      matchingControl.errors &&
      !matchingControl.errors.confirmPasswordValidator
    ) {
      return;
    }
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ confirmPasswordValidator: true });
    } else {
      matchingControl.setErrors(null);
    }
  };
}


@Component({
  selector: 'user-generic-form',
  templateUrl: './user-generic-form.component.html',
  styles:[`
    .example-form {
      min-width: 150px;
      max-width: 400px;
      width: 100%;
    }
    
    .example-full-width {
      width: 100%;
    }
  `]
})
export class UserGenericFormComponent implements OnInit {

  passwordFieldsVisible : boolean = false;
  updateMode : UpdateMode = UpdateMode.create;
  hidePassword : boolean = true;
  hideConfirmPassword : boolean = true;
  id : number | null = null; 

  fb = new FormBuilder();
  userForm = this.fb.group({
    title: [null, Validators.required],
    firstName: [null, Validators.required],
    lastName: [null, Validators.required],
    email: [null, [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
    role: [null, Validators.required],
    password: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(30)]],
    confirmPassword: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(30)]],
  },
  {
    validator: ConfirmPasswordValidator("password", "confirmPassword")
  });


  @Input() set initUserForm(user : IUser | null){
    if(user !== null){ 
      this.setupEditMode(user);
    }
    else{
      this.setupCreateMode();
    }
  }

  constructor(private generalService : GeneralService) { }

  ngOnInit(): void {
  }


  setupCreateMode(){
    this.updateMode = UpdateMode.create;
    this.showPasswordFields(true);
  }

  setupEditMode(user : IUser){
    this.updateMode = UpdateMode.edit;
    if(user){
      this.id = user.id;
      this.userForm = this.fb.group({
        title: [user.title, Validators.required],
        firstName: [user.firstName, Validators.required],
        lastName: [user.lastName, Validators.required],
        email: [user.email, [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
        role: [user.role, Validators.required],
      });
    }
  }

  showPasswordFields(show: boolean){
    this.passwordFieldsVisible = show;
  }

  back(){
    location.href = `#/user/list`;
  }

  getUpdateField(fg : FormGroup){
    let updatedFields : any = {};
    if(fg.controls.title.dirty){
      updatedFields.title = fg.controls.title.value;
    } 
    if(fg.controls.firstName.dirty){
      updatedFields.firstName = fg.controls.firstName.value;
    } 
    if(fg.controls.lastName.dirty){
      updatedFields.lastName = fg.controls.lastName.value;
    } 
    if(fg.controls.email.dirty){
      updatedFields.email = fg.controls.email.value;
    } 
    if(fg.controls.role.dirty){
      updatedFields.role = fg.controls.role.value;
    } 
    return updatedFields;
  }

  submit(){
    if(this.userForm.valid){
      if(this.updateMode == UpdateMode.create){
        this.generalService.createUser(this.userForm.value).subscribe({
          next: data => {
            if(data.message == "User created"){
              location.href = `#/user/list`;
            }
          },
          error: err => {} 
        });
      }
      else if(this.updateMode == UpdateMode.edit){
        if(this.id !== null){
          let updatedFields = this.getUpdateField(this.userForm);
          this.generalService.updateUser(this.id, updatedFields).subscribe({
            next: data => {
              if(data.message == "User updated"){
                location.href = `#/user/list`;
              }
            },
            error: err => {}
          });
        }
      }
    }
  }


}
