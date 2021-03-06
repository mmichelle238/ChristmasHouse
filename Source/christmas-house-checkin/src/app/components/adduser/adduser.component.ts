import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';

import { ApiService } from './../../api.service';
import { User } from './../../user';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent implements OnInit {

  model: User = { } as User;

  constructor(private api : ApiService) { }

  onSubmit(form: NgForm) {
    var element = <HTMLInputElement> document.getElementById('defaultCheck1');
    var currentUser: User = form.value;

    this.api
     .addUser(currentUser)
     .subscribe(resp => {
        if(element.checked) {
          this.api.checkIn(currentUser.email).subscribe(resp => {
          });
        }
    });
  }

  ngOnInit(): void {
  }

}
