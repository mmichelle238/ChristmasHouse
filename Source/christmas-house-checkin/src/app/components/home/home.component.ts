import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';

import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ApiService } from './../../api.service';
import { User } from './../../user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  page = 1;
  pageSize = 4;
  collectionSize = 0;
  allusers: User[] = null;
  fetchedUsers: User[] = [];
  headers: any;
  name: string;

  constructor(private api : ApiService, private route: ActivatedRoute, private router: Router) {
  }

  update(value: string) {
    this.name = value;
  }

  handleClick() {
    if(this.name == '') {
      this.allusers = null;
    } else {
      this.getCurrentUsers(this.name);
    }
  }

  getCurrentUsers(name: String) {
    this.api.findUser(name)
    .subscribe(resp => {
      const keys = resp.headers.keys();
        this.headers = keys.map(key =>
          `${key}: ${resp.headers.get(key)}`);
          this.fetchedUsers = [];
        for (const data of resp.body) {
          this.fetchedUsers.push(data);
        }
        this.collectionSize = this.fetchedUsers.length;
        this.refreshUsers();
  });  
  }

  refreshUsers() {
    this.allusers  = this.fetchedUsers
      .map((user, i) => ({id: i + 1, ...user}))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  handleCheckIn(user: User) {
    this.api.checkIn(user.email).subscribe(resp => {
      var x = document.getElementById("message");
      x.innerHTML = `${user.firstname} ${user.lastname} with the email ${user.email} checked in!`;
    });
  }

  isChecked(user: User) {
    const date: Date = user.checkin;
    const curDate: Date = new Date();
    return (date == null || curDate.getFullYear > date.getFullYear);
  }

  handleUpdate(email: string) {
    this.router.navigate(['/updateuser', { emailId: email }]);
  }

  ngOnInit(): void {
  }
}
