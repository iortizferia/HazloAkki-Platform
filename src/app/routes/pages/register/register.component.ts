import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../../core/settings/settings.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { AccountService } from '../../../core/http/account/account.service';
import { Account } from '../../../shared/models/account.model';
import { Router } from '@angular/router';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

    registerForm: FormGroup;
    passwordForm: FormGroup;
    mask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

    constructor(public settings: SettingsService, 
        fb: FormBuilder, private route:Router,
        private accountService: AccountService) {

        let password = new FormControl('', Validators.compose([Validators.required]));
        let certainPassword = new FormControl('', [Validators.required, CustomValidators.equalTo(password)]);

        this.passwordForm = fb.group({
            'password': password,
            'confirmPassword': certainPassword
        });

        this.registerForm = fb.group({
            'name': [null, Validators.required],
            'phone': [null],
            'lastname': [null, Validators.required],
            'email': [null, Validators.compose([Validators.required, CustomValidators.email])],
            'accountagreed': [null, Validators.required],
            'passwordGroup': this.passwordForm
        });
    }

    submitForm($ev, value: any) {
        $ev.preventDefault();
        for (let c in this.registerForm.controls) {
            this.registerForm.controls[c].markAsTouched();
        }
        for (let c in this.passwordForm.controls) {
            this.passwordForm.controls[c].markAsTouched();
        }

        if (this.registerForm.valid) {
            let newAccount = new Account()
            newAccount.nombre = value.name;
            newAccount.apellidos = value.lastname;
            newAccount.email = value.email;
            newAccount.password = value.passwordGroup.password;
            newAccount.telefono = value.phone.replace(/\D+/g, '');;
            newAccount.estatus = true;

            this.accountService.addAccount(newAccount).subscribe(
                account => {
                    console.log("Account was added successfully", account);
                    this.route.navigate(["login"]);
                }, error => {
                    console.error("Ooops! something was wrong", error);
                });
        }
    }

    ngOnInit() {
    }

}
