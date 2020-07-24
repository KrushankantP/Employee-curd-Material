import {Component, OnInit, ViewChild} from '@angular/core';
import {EmployeeService} from "../../shared/employee.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";

@Component({
  selector: 'employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  listData: MatTableDataSource<any>;
  displayedColumns: string[] =['fullName', 'email', 'mobile', 'city', 'actions']

  @ViewChild(MatSort) sort: MatSort;
    constructor(private _empService: EmployeeService) { }

  ngOnInit(): void {
    this._empService.getEmployees().subscribe(
      list => {
        let array = list.map(item => {
          return {
            $key: item.key,
            ...item.payload.val()
          };
        });
        this.listData = new MatTableDataSource(array);
        this.listData.sort = this.sort;
      });
  }
}
