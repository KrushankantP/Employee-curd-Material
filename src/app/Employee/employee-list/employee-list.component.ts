import {Component, OnInit, ViewChild} from '@angular/core';
import {EmployeeService} from "../../shared/employee.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {DepartmentService} from "../../shared/department.service";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {EmployeeFormComponent} from "../employee-form/employee-form.component";
import {NotificationService} from "../../shared/notification.service";
import {DialogService} from "../../shared/dialog.service";

@Component({
  selector: 'employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['fullName', 'email', 'mobile', 'city', 'departmentName', 'actions']
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;

  constructor(private _empService: EmployeeService,
              private _deptService: DepartmentService,
              private _dialog: MatDialog,
              private _notificationService:  NotificationService,
              private _dialogService: DialogService) { }

  ngOnInit(): void {
    this._empService.getEmployees().subscribe(
      list => {
        let array = list.map(item => {
          // to display departmentName from department node(collection) based on $key
          let departmentName = this._deptService.getDepartmentName(item.payload.val()['department']);
          return {
            $key: item.key,
            //Added name here.
            departmentName,
            ...item.payload.val()
          };
        });
        this.listData = new MatTableDataSource(array);
        this.listData.sort = this.sort;
        this.listData.paginator = this.paginator;
        this.listData.filterPredicate = (data, filter)=>{
          // this will only allow search by included columns in "displayedColumns" Array Property.
          return this.displayedColumns.some(ele=>{
            return ele != 'actions' && data[ele].toLowerCase().indexOf(filter) != -1;
          });
        };
      });
  }

  onSearchClear() {
    this.searchKey="";
    this.applyFilter();

  }

  applyFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }

  onCreate() {
    this._empService.initializeFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this._dialog.open(EmployeeFormComponent,dialogConfig);
  }

  onEdit(row){
    this._empService.populateForm(row); // this will populate the data to the form.
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this._dialog.open(EmployeeFormComponent,dialogConfig);
  }
  onDelete($key){
    // if(confirm('Are you sure to delete this record ?')){
    //   this._empService.deleteEmployee($key);
    //   this._notificationService.warn('! Deleted successfully');
    //}
    this._dialogService.openConfirmDialog('Are you sure to Delete this record?')
  }
}
