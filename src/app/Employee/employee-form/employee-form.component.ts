import { Component, OnInit } from '@angular/core';
import {EmployeeService} from "../../shared/employee.service";

@Component({
  selector: 'employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit {

  constructor(public _empService: EmployeeService) { }

  departments = [
    { id: 1, value: 'IT' },
    { id: 2, value: 'HR' },
    { id: 3, value: 'ACCT' }
    ];



  ngOnInit() {
  }

  onClear() {
    this._empService.form.reset();
    this._empService.initializeFormGroup();
  }

}
