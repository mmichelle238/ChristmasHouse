import { Component, OnInit } from '@angular/core';
import { GridDataResult, DataStateChangeEvent } from '@progress/kendo-angular-grid';
import { process, State } from '@progress/kendo-data-query';
import { ExcelExportData } from '@progress/kendo-angular-excel-export';

import { ApiService } from './../../api.service';
import { User } from './../../user';

@Component({
  selector: 'app-allusers',
  templateUrl: './allusers.component.html',
  styleUrls: ['./allusers.component.css']
})
export class AllusersComponent implements OnInit {

  public gridView: GridDataResult;

  public state: State = {
    skip: 0,
    take: 5,

    // Initial filter descriptor
    filter: {
      logic: 'and',
      filters: [{ field: 'firstname', operator: 'contains', value: '' }]
    }
  };

  fetchedUsers: User[] = [];

  constructor(private api: ApiService) {
    this.allData = this.allData.bind(this);
    this.getAllUsers();
  }

  getAllUsers() {
    this.api.findUser('%20')
      .subscribe(resp => {
        for (const data of resp.body) {
          this.fetchedUsers.push(data);
        }
        this.loadItems();
      });
  }

  ngOnInit(): void {
  }

  public dataStateChange(state: DataStateChangeEvent): void {
    this.state = state;
    this.gridView = process(this.fetchedUsers, this.state);
  }

  public allData(): ExcelExportData {
    const result: ExcelExportData =  {
        data: process(this.fetchedUsers, { sort: [{ field: 'lastname', dir: 'asc' }] }).data,
    };

    return result;
  }

  private loadItems(): void {
    this.gridView = process(this.fetchedUsers, this.state);
  }
}