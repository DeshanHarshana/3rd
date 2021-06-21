import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortDate'
})
export class SortDatePipe implements PipeTransform {

  transform(value: Array<any>, args?: any): any {
   return value.sort((a,b)=>{
      let x=a.Date;
      let y=b.Date;
      if(x>y){
        return -1;
      }
      else{
        return 1;
      }
      return 0;
    });
  }

}
