import { Component, OnInit } from '@angular/core';
import {EmployeeService} from "../../shared/employee.service";
import {DepartmentService} from "../../shared/department.service";
import {NotificationService} from "../../shared/notification.service";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit {

  constructor(public _empService: EmployeeService,
              public  _deptService: DepartmentService,
              private _notificationService: NotificationService,
              public _dialogRef: MatDialogRef<EmployeeFormComponent>) { }


  ngOnInit() {
    this._empService.getEmployees();
  }

  onClear() {
    this._empService.form.reset();
    this._empService.initializeFormGroup();

  }
  onSubmit(){
    if (this._empService.form.valid) {
      if (!this._empService.form.get('$key').value) {
      this._empService.insertEmployee(this._empService.form.value);
      }
      else{
      this._empService.updateEmployee(this._empService.form.value);
      this._empService.form.reset();
      this._empService.initializeFormGroup();
      this._notificationService.success(':: Submitted Successfully');
      this.onClose();
      }
    }
  }
  onClose(){
    this._empService.form.reset();
    this._empService.initializeFormGroup();
    this._dialogRef.close();
  }
}
