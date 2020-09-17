import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../api.service';

import { User } from './../../user';

@Component({
  selector: 'app-allusers',
  templateUrl: './allusers.component.html',
  styleUrls: ['./allusers.component.css']
})
export class AllusersComponent implements OnInit {

  page = 1;
  pageSize = 4;
  collectionSize = 0;
  allusers: User[] = [];
  fetchedUsers: User[] = [];
  headers: any;

  constructor(private api: ApiService) {
    this.getAllUsers();
  }

  getAllUsers() {
    this.api.findUser('%20')
      .subscribe(resp => {
        const keys = resp.headers.keys();
        this.headers = keys.map(key =>
          `${key}: ${resp.headers.get(key)}`);
        for (const data of resp.body) {
          this.fetchedUsers.push(data);
        }
        this.collectionSize = this.fetchedUsers.length;
        this.refreshAllUsers();
      });
  }

  refreshAllUsers() {
    this.allusers  = this.fetchedUsers
      .map((user, i) => ({id: i + 1, ...user}))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  ngOnInit(): void {
  }

}
