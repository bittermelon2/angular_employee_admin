import { Component } from '@angular/core';
import { FormControl, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { EmployeeWrapper } from '../../models/EmployeeWrapper.type';
import {EmployeeResp} from '../../models/EmployeeResp.type'
import { EmployeesService } from '../employees.service'
import { NzMessageService } from 'ng-zorro-antd/message';

const PHONE_NUMBER_REGEXP=/^\d{3}\d{3}\d{4}$/;

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent {
  
  employeeList: EmployeeWrapper[] =[]
  employeeEditForm!:UntypedFormGroup;
  editEmployeeId!:number

  curPage:number=1;
  pageSize:number=5;
  total:number=0;

  isLoading:boolean= false
  isShowEmpModal = false;

  mode = 'date';
  size: 'large' | 'small' | 'default' = 'default'

  constructor(private employeesService: EmployeesService, private message: NzMessageService,
    private fb: UntypedFormBuilder){}

  ngOnInit(): void {
    this.fetchData()

    this.employeeEditForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      gender: ['1', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.pattern(PHONE_NUMBER_REGEXP)],
      join_date: ['', this.joinDateValidate]
   })
  }
  joinDateValidate(control: FormControl){
    const selectedDate = +control.value
    //console.log(selectedDate)
    const curDate = +new Date()
    if(selectedDate>curDate){
       return {date:true}
    }
    return null
 }

  fetchData(){
    //console.log(this.curPage);
    this.isLoading = true
    this.employeesService.fetchData(this.curPage, this.pageSize).subscribe((res:any)=>{
        
        this.employeeList = res.data
        //console.log(this.listOfData);
        this.total = res.meta.pagination.total;
        this.isLoading = false
   })
  }

  trackByEmpId(index: number, employee: EmployeeWrapper){
     return  employee.id
  }

  handleDelete(id:number){
    //console.log('confirm to del', id)
    this.employeesService.delEmployee(id).subscribe((res:any)=>{
        //console.log(res)
        //defect is that there are only 4 rows 
       this.employeeList = this.employeeList.filter((emp:any)=>emp.id!==id)
        // this.fetchData()
    })
  }

  handleDelCancel(){
    console.log('confirm to cancel')
    this.message.info('Cancel Deletion')
  }


  showEditEmpModal(id:number): void {
    console.log("showEditEmpModal ", id)
    this.isShowEmpModal = true;

    this.editEmployeeId = id
    this.employeesService.getEmployeeById<EmployeeResp>(id).subscribe((res:any)=>{
       //console.log( typeof res.data)
        const emp:any =res.data

        //popluate form (Edit form) with employee info
        const {join_date}=emp.attributes
        console.log('join_Date', join_date, ">>>", join_date, " ", typeof join_date)

        if(join_date){
          const arr = join_date.split("-");//2023-08-07
          //Month is 0-11, Date is 1-31
          const date = new Date(arr[0]*1, arr[1]*1-1, arr[2]*1)
          console.log('before poplulate', date )
          const params = {...emp.attributes, join_date:date }
          this.employeeEditForm.patchValue(params)
        } else{
          //if join_date is null, set today's date 
          const params = {...emp.attributes, join_date:null }
          this.employeeEditForm.patchValue(params)
        }
       
    })

  }

   //confirm edit employee
  handleEditEmpOk(): void {

    Object.keys(this.employeeEditForm.controls).forEach( (key:any) =>{
      this.employeeEditForm.controls[ key ].markAsDirty();
      this.employeeEditForm.controls[key].updateValueAndValidity();
    })
    
    if(!this.employeeEditForm.valid){
      return;
    }

    this.employeesService.updateEmployee(this.employeeEditForm.value, this.editEmployeeId)
    .subscribe((res:any)=>{
       console.log('new data',res.data);
       //close modal
       this.isShowEmpModal = false;

       //update data in list
       const index = this.employeeList.findIndex( (emp:any)=>emp.id===res.data.id)
       this.employeeList[index] = res.data
        console.log('updated data',  this.employeeList[index])
        //add message
        this.message.info('Update is successful')

        this.resetEmployee()
    })
  }
   //Cancel edit employee
  handleEditEmpCancel(): void {
    this.isShowEmpModal = false;
    this.resetEmployee()
   
  }
  resetEmployee(){
    const employeeEditForm = this.employeeEditForm
    employeeEditForm.reset({
      gender: '1'
    });
    for (const key in employeeEditForm.controls) {
      if (employeeEditForm.controls.hasOwnProperty(key)) {
        //change to original state
        employeeEditForm.controls[key].markAsPristine();
        employeeEditForm.controls[key].updateValueAndValidity();
      }
    }
  }



  
}
