import { Component } from '@angular/core';
import { FormControl, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, ValidationErrors, Validators } from '@angular/forms';
import { EmployeesService } from '../employees.service'
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router'

// phone number format
const PHONE_NUMBER_REGEXP=/^\d{3}\d{3}\d{4}$/;

@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.css']
})
export class EmployeeAddComponent {
  employeeAddForm!: UntypedFormGroup;
  mode = 'date';
  size: 'large' | 'small' | 'default' = 'default'

  constructor(private fb: UntypedFormBuilder, private employeeService: EmployeesService, 
    private message: NzMessageService, private router: Router) {}

  ngOnInit(): void {
    this.employeeAddForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      gender: ['1', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.pattern(PHONE_NUMBER_REGEXP)],
      join_date: ['', this.joinDateValidate]
   });
    
  }
  //customerized validator
  joinDateValidate(control: FormControl){
     const selectedDate = +control.value
     //console.log(selectedDate)
     const curDate = +new Date()
     if(selectedDate>curDate){
        return {date:true}
     }
     return null
  }
  submitForm(event:any): void {
    //add by me
    event.preventDefault();
    const employeeAddForm = this.employeeAddForm;
    const { controls } = employeeAddForm
    Object.keys(controls).forEach( (key:any)=>{
       employeeAddForm.controls[ key ].markAsDirty();
       employeeAddForm.controls[key].updateValueAndValidity();
    })
    console.log('submit', employeeAddForm.value);
    if(!this.employeeAddForm.valid){
       return
    }

    //send request to add employee
    //console.log('submit', employeeAddForm.value);
    const {phone, join_date} = employeeAddForm.value

    let params =  {...employeeAddForm.value}
    if(!phone){
      delete params.phone; 
    }
    if(!join_date){
      delete params.join_date
    }

    console.log('params>>>', params)
    this.employeeService.addEmployee(params).subscribe((res:any)=>{
        //console.log(res)
        this.message.create('success', 'Employee is added successful');
        this.resetEmployee();
        this.router.navigate(['/home/employee/'])
    })
  }

  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.resetEmployee()
  }

  resetEmployee(){
    const employeeAddForm = this.employeeAddForm
    employeeAddForm.reset({
      gender: '1'
    });
    for (const key in employeeAddForm.controls) {
      if (employeeAddForm.controls.hasOwnProperty(key)) {
        //change to original state
        employeeAddForm.controls[key].markAsPristine();
        employeeAddForm.controls[key].updateValueAndValidity();
      }
    }
  }



}
