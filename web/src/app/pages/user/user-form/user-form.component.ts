import { RequestStatus } from './../../../resources/enums/request-status';
import { SnackService } from './../../../components/boss-snack/snack.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { User } from 'src/app/resources/interfaces/user';
import { UserService } from 'src/app/resources/services/user.service';
import { map, filter, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { MatDialogRef } from '@angular/material/dialog';
import { Role } from 'src/app/resources/interfaces/role';
import { RolesService } from 'src/app/resources/services/roles.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  form!: FormGroup;

  user: User = {} as User;
  roles: Role[] = [];
  get email(): AbstractControl { return this.form.get('email')!; }
  private formSubmitAttempt = false;

  constructor(
    private userService: UserService,
    private rolesService: RolesService,
    private snackService: SnackService,
    private dialog: MatDialogRef<UserFormComponent>
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.loadRoles();
  }

  initForm(): void {
    this.form = new FormGroup({
      id: new FormControl({ value: this.user?.id, disabled: true }),
      email: new FormControl(this.user?.email, [Validators.required, Validators.email]),
      password: new FormControl(null),
      name: new FormControl(this.user?.name, Validators.required),
      roles: new FormControl(this.user?.roles, Validators.required),
      active: new FormControl(this.user?.active)
    });

    this.form.valueChanges.subscribe((formValue) =>
      Object.assign(this.user, formValue)
    );

    this.isEmailAvailableValidator();
  }

  loadRoles(): void {
    this.rolesService.getAll().subscribe((roles: Role[]) => this.roles = [...roles]);
  }

  isEmailAvailableValidator(): void {
    this.email.valueChanges.pipe(
      map(value => {
        this.email.markAsTouched();
        return value.trim();
      }),
      filter(value => !this.email.getError('required') && !this.email.getError('email') && !this.email.getError('minLength')),
      debounceTime(200),
      distinctUntilChanged(),
      switchMap(value => this.userService.isValidEmail(this.user.id, value)),
      map(res => { res ? this.email.setErrors(null) : this.email.setErrors({ emailTaken: true }); })
    ).subscribe();
  }

  onSubmit(): void {
    this.formSubmitAttempt = true;
    if (this.form.valid) {
      this.userService.save(this.user).subscribe(
        data => {
          this.dialog.close();
          this.snackService.openSnackBar('Salvo com sucesso!', RequestStatus.Success);
        },
        err => {
          this.snackService.openSnackBar('Erro ao salvar!', RequestStatus.Error);
        }
      );
    }
    this.formSubmitAttempt = false;
  }

  isFieldInvalid(field: string): boolean {
    return !!(
      (!this.form.get(field)?.valid && this.form.get(field)?.touched) ||
      (this.form.get(field)?.untouched && this.formSubmitAttempt)
    );
  }

  compareRoles(obj1: any, obj2: any): boolean {
    return obj1 && obj2 && obj1.id === obj2.id;
  }
}
