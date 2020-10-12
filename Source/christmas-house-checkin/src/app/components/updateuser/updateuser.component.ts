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
  updatesuccess: boolean = false;

  constructor(private route: ActivatedRoute, private api : ApiService) { }

  ngOnInit(): void {
    this.emailId = this.route.snapshot.paramMap.get('emailId');
    console.log(this.emailId);

    if(this.emailId !== null) {
      this.getUser(this.emailId);
    }
  }

  onEmailSubmit(form: NgForm) {
    console.log(form.value);

    this.emailId = form.value;

    if(this.emailId !== null) {
      this.getUser(this.emailId);
    }

  }

  onSubmit(form: NgForm) {
    console.log(form.value);
    var updatedUser: User = form.value;

    console.log(this.emailId);
    this.api.updateUser(this.emailId, updatedUser)
    .subscribe({
      complete: ()=> {
        this.updatesuccess = true;
        console.log("Update successful");}
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
