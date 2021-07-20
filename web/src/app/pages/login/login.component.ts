import { User } from './../../resources/interfaces/user';
import { UserService } from './../../resources/services/user.service';
import { Router } from '@angular/router';
import { RequestStatus } from './../../resources/enums/request-status';
import { SnackService } from './../../components/boss-snack/snack.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { GoogleLoginProvider, SocialAuthService, FacebookLoginProvider } from 'angularx-social-login';
import { Providers } from 'src/app/resources/enums/providers';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hide = true;
  form!: FormGroup;
  isLoading = false;

  private formSubmitAttempt = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private tokenStorageService: TokenStorageService,
    private userService: UserService,
    private socialAuthService: SocialAuthService,
    private snackService: SnackService
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  isFieldInvalid(field: string): boolean {
    return !!(
      (!this.form?.get(field)?.valid && this.form?.get(field)?.touched) ||
      (this.form?.get(field)?.untouched && this.formSubmitAttempt)
    );
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.isLoading = true;
      const user = {} as User;
      user.email = this.form.value.email;
      user.password = this.form.value.password;
      this.authService.authenticate(user)
        .subscribe(
          res => {
            this.tokenStorageService.saveToken(res.token);
            this.authService.login();
            this.isLoading = false;
          },
          (err: HttpErrorResponse) => {
            if (err.status === HttpStatusCode.Unauthorized) {
              this.snackService.openSnackBar('Usuário ou senha incorretos!', RequestStatus.Error)
            } if (err.status === HttpStatusCode.Forbidden) {
              this.snackService.openSnackBar('Usuário inativo!', RequestStatus.Error)
            }
            this.isLoading = false;
          });
    }
    this.formSubmitAttempt = true;
  }

  loginWithGoogle(): void {
    this.isLoading = true;
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID)
      .then(() => {
        this.socialAuthService.authState.subscribe(
          item => {
            if (item) {
              let user: User = {
                id: 0,
                email: item.email,
                name: item.name,
                active: true,
                roles: [],
                provider: Providers.GOOGLE
              };
              this.userService.createSocialuser(user).subscribe(
                res => {
                  this.tokenStorageService.saveToken(res.token);
                  this.authService.login();
                  this.isLoading = false;
                },
                () => this.handleError());
            }
          },
          () => this.handleError());
      }).catch(() => this.handleError());
  }

  loginWithFacebook(): void {
    this.isLoading = true;
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID)
      .then(() => {
        this.socialAuthService.authState.subscribe(
          item => {
            if (item) {
              let user: User = {
                id: 0,
                email: item.email,
                name: item.name,
                active: true,
                roles: [],
                provider: Providers.FACEBOOK
              };
              this.userService.createSocialuser(user).subscribe(
                res => {
                  this.tokenStorageService.saveToken(res.token);
                  this.authService.login();
                  this.isLoading = false;
                },
                () => this.handleError());
            }
          },
          () => this.handleError());
      }).catch(() => this.handleError());
  }

  handleError(): void {
    this.snackService.openSnackBar('Erro ao realizar login! Tente novamente!', RequestStatus.Error);
    this.isLoading = false;
  }
}
