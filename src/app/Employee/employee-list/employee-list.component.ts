import { Component, OnInit } from '@angular/core';
import {EmployeeService} from "../../shared/employee.service";

@Component({
  selector: 'employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

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
      });
  }
}
