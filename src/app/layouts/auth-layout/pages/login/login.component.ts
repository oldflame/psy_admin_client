import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthService } from "../../../../services/auth.service";
import { ToastService, TOAST_TYPE } from '../../../../services/toast.service';

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

  constructor(private authService: AuthService, private toastService: ToastService) {}

  ngOnInit() {}

  login() {
    this.authService
      .login(this.loginForm.value.email, this.loginForm.value.password)
      .subscribe((res: boolean) => {
        if (res) {
          this.toastService.showToast(`Welcome, ${this.authService.getAdminData().firstName}`, TOAST_TYPE.SUCCESS);
        }
      });
  }
}
