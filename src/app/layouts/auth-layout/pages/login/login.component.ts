import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthService } from "../../../../services/auth.service";
import { ToastService, TOAST_TYPE } from "../../../../services/toast.service";
import { Router } from "@angular/router";
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: "login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  showPassword = false;
  loginForm: FormGroup = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [
      Validators.required,
      Validators.minLength(8),
    ]),
  });

  isLoginLoading = false;

  constructor(
    private authService: AuthService,
    private toastService: ToastService,
    private router: Router
  ) {}

  ngOnInit() {}

  login() {
    this.isLoginLoading = true;
    this.authService
      .login(this.loginForm.value.email, this.loginForm.value.password)
      .subscribe(
        (res: boolean) => {
          this.isLoginLoading = false;

          if (res) {
            this.toastService.showToast(
              `Welcome, ${this.authService.getAdminData().firstName}`,
              TOAST_TYPE.SUCCESS
            );
            this.router.navigate(["/overview"]);
          } else {
            this.toastService.showToast(
              "Login failed. Try again!",
              TOAST_TYPE.DANGER
            );
          }
        },
        (err: HttpErrorResponse) => {
          this.isLoginLoading = false;
          this.toastService.showToast(err.error.msg, TOAST_TYPE.DANGER);
        }
      );
  }
}
