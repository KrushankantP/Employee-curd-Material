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
    this._empService.getEmployees();
  }

  onClear() {
    this._empService.form.reset();
    this._empService.initializeFormGroup();
  }
  onSubmit(){
    if(this._empService.form.valid){
      this._empService.insertEmployee(this._empService.form.value);
      this._empService.form.reset();
      this._empService.initializeFormGroup();
    }
  }
}
