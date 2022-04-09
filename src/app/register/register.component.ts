import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import RegisterUser from '../RegisterUser';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public user:RegisterUser = new RegisterUser();
  public warning:string = "";
  public success: boolean = false;
  public loading: boolean = false;

  constructor(private auth:AuthService) { }

  ngOnInit(): void {
  }
  onSubmit(f: NgForm): void {
    console.log("ggg");
    if (this.user.userName.length > 0 && this.user.password.length > 0 && this.user.password2.length > 0 ){
      this.loading = true;
      this.auth.register(this.user).subscribe((success) => {
          this.success =true;
          this.loading = false;
          this.warning = "";

        },
        (err) => {
          this.warning = err.error.message;
          this.loading = false;
        }
      );
  
    } 
}

}
