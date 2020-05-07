import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ToastService, TOAST_TYPE } from "../../../../services/toast.service";
import { AuthService } from "../../../../services/auth.service";
import { Router } from "@angular/router";
import { GENDER } from "../../../../constants";

@Component({
  selector: "register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit {
  registrationForm: FormGroup = new FormGroup({
    firstName: new FormControl("", [Validators.required]),
    lastName: new FormControl("", [Validators.required]),
    email: new FormControl("", [Validators.required, Validators.email]),
    mobile: new FormControl("", [
      Validators.required,
      // Validators.pattern("/^d{10}$/"),
    ]),
    password: new FormControl("", [
      Validators.required,
      Validators.minLength(8),
    ]),
    retypePassword: new FormControl("", [
      Validators.required,
      Validators.minLength(8),
    ]),
    gender: new FormControl("", [Validators.required]),
  });

  genderTypes = [
    {
      value: GENDER.FEMALE,
      viewValue: "Female",
    },
    {
      value: GENDER.MALE,
      viewValue: "Male",
    },
    {
      value: GENDER.OTHERS,
      viewValue: "Others",
    },
  ];

  constructor(
    private toastService: ToastService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {}

  matchPasswords() {
    if (this.registrationForm.invalid) {
      if (
        this.registrationForm.value.password !=
        this.registrationForm.value.retypePassword
      ) {
        this.toastService.showToast(
          "Passwords do not match!",
          TOAST_TYPE.DANGER
        );
        return false;
      }
    }
    return true;
  }

  registerAdmin() {
    if (!this.matchPasswords()) {
      return false;
    }

    this.authService
      .register(this.registrationForm.value)
      .subscribe((res: boolean) => {
        if (res) {
          this.toastService.showToast(
            "Registration successful. Awaiting account verification!",
            TOAST_TYPE.SUCCESS
          );
          this.router.navigate(["/login"]);
        } else {
          this.toastService.showToast(
            "Registration failed. Try again!",
            TOAST_TYPE.DANGER
          );
        }
      });
  }
}
