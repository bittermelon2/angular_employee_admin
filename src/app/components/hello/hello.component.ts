import { Component } from '@angular/core';


@Component({
  selector: 'app-hello',
  templateUrl: './hello.component.html',
  styleUrls: ['./hello.component.css']
})
export class HelloComponent {
  listOfData: any[] = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park'
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park'
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park'
    }
  ];

  currentPageDataChange(){
    console.log('currentPageDataChange')
    console.log(this.listOfData)
  }

  addData(){
    console.log('addData')
    this.listOfData.push({
      key: '4',
      name: 'Mary',
      age: 12,
      address: 'Mary Address'
    })
  }

}
