import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { User, Users } from 'src/app/common/user/user';
import { UserApiService } from 'src/app/common/user/user-api.service';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit, OnDestroy {

    passwordStrength: string = "";
    passwordStrengthColor: string = "";
    passwordNoCapitalized: string = "";
    passwordNoNumber: string = "";
    passwordNoMatch: string = "";


    formSignUp: FormGroup = this.fb.group({
        // note : les regex de morts de veulent pas fonctionner putain jpp
        email: ['', Validators.required],
        lastName: ['', Validators.required],
        firstName: ['', Validators.required],
        userName: ['', Validators.required],
        password: ['', Validators.required],
        passwordConfirm: ['', Validators.required]
    });

    users: Users = [];
    private subscriptions: Subscription[] = [];
    userToCreate: User;


    constructor(private fb: FormBuilder, private userApi: UserApiService) { }

    ngOnInit(): void { }

    ngOnDestroy(): void {
        this.subscriptions.forEach(element => {
            element.unsubscribe();
        });
    }

    submit() {
        if (this.passwordNoCapitalized == "" && this.passwordNoNumber == "" && this.passwordNoMatch == "") {
            this.userToCreate = this.formSignUp.value;
            this.createUser(this.userToCreate);
            // puis, rediriger vers la page des calendriers
        }

    }

    updatePasswordStrength() {
        const password: string = this.formSignUp.controls['password'].value;
        if (password == "") {
            this.passwordStrength = "";
            this.passwordStrengthColor = "";
        }
        else if (password.length < 5) {
            this.passwordStrength = " Faible";
            this.passwordStrengthColor = "red";
        }
        else if (password.length >= 5 && password.length < 10) {
            this.passwordStrength = " Moyen";
            this.passwordStrengthColor = "orange";
        }
        else {
            this.passwordStrength = " Fort";
            this.passwordStrengthColor = "green";
        }
    }

    checkPassword() {
        const passwordValidationNumbers = new RegExp("([0-9]{2})");
        const passwordValidationCapitalized = new RegExp("([A-Z])");
        const password: string = this.formSignUp.controls['password'].value;

        this.passwordNoNumber = "";
        this.passwordNoCapitalized = "";

        if (!passwordValidationNumbers.test(password))
            this.passwordNoNumber = "Le mot de passe doit au moins contenir deux nombres";

        if (!passwordValidationCapitalized.test(password))
            this.passwordNoCapitalized = "Le mot de passe doit au moins une majuscule";
    }

    checkPasswordMatch() {
        const password: string = this.formSignUp.controls['password'].value;
        const passwordConfirm: string = this.formSignUp.controls['passwordConfirm'].value;

        this.passwordNoMatch = (password == passwordConfirm) ? "" : "Les mots de passes doivent correspondre";
    }

    createUser(user: User) {
        this.subscriptions.push(
            this.userApi.create(user)
                .subscribe(user => this.users.push(user))
        );
    }

    generateUser() {
        if (!environment.production) {
            let mock_lastName = Math.random().toString(36).substring(2, 5) + Math.random().toString(36).substring(2, 5);
            let mock_firstName = Math.random().toString(36).substring(2, 5) + Math.random().toString(36).substring(2, 5);
            let mock_password = Math.random().toString(36).substring(2, 5) + Math.random().toString(36).substring(2, 5);
            this.formSignUp.setValue({
                email: mock_firstName + '_' + mock_lastName + '@gmail.com',
                lastName: mock_lastName,
                firstName: mock_firstName,
                userName: mock_firstName.substring(1, 4) + mock_lastName.substring(1, 4),
                password: mock_password,
                passwordConfirm: mock_password
            });
        }
    }

}
