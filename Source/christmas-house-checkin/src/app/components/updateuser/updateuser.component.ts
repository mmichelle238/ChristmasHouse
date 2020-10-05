import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { NgForm } from '@angular/forms';

import { ApiService } from './../../api.service';
import { User } from './../../user';

@Component({
  selector: 'app-updateuser',
  templateUrl: './updateuser.component.html',
  styleUrls: ['./updateuser.component.css']
})
export class UpdateuserComponent implements OnInit {

  model: User = { } as User;
  emailId: string;
  emailExists: boolean = false;

  constructor(private route: ActivatedRoute, private api : ApiService) { }

  ngOnInit(): void {
    // this.emailId = this.route.snapshot.paramMap.get('emailId');
    // if(this.emailId === null) {
    //   this.emailId = window.prompt("What is the email of the user you want to update?", "Type Email Here");
    //   this.getUser(this.emailId);
    //}
    // this.checkEmailExists();
    //WHY DOESNT IT WORK
    //also include a confirm which says press cancel if you want ot add user instead
    //if cancel is ever pressed maybe go to add user instead?
  }

//   checkEmailExists() {
// /*     while(this.emailExists === false)  {
//       this.emailId = window.prompt("This email doesn't exist in the database, please try again!", "Type Email Here");
//       this.getUser(this.emailId);
//     } */
//   }


  onSubmit(form: NgForm) {
    var element = <HTMLInputElement> document.getElementById('defaultCheck1');
    let email : string = (<HTMLInputElement> document.getElementById('email')).value;
    this.api
     .updateUser(this.emailId, form.value)
     .subscribe(resp => {
        if(element.checked) {
          this.api.checkIn(email).subscribe(resp => {
          });  
        }
    });  
  }

  getUser(emailId: String) {
    this.api.findUser(emailId)
    .subscribe(resp => {
        this.emailExists = false;
        for (const data of resp.body) {
            this.model = data;
            this.emailExists = true;
        }
        console.log(this.model);
    });  
  }
}
