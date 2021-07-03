import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DataServiceService } from 'src/app/services/data-service.service';
import * as ClassicEditor from 'src/app/build/ckeditor';
import { LoaderService } from 'src/app/loader/loader.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-postmake',
  templateUrl: './postmake.component.html',
  styleUrls: ['./postmake.component.css']
})
export class PostmakeComponent implements OnInit {
  readonly:boolean=true;
  public Editor = ClassicEditor;
  cgVal:string="other";
  imageData:string; //temp save
  image:File;
  titleImage:boolean=true;
  uploadButton:boolean=true;
  Cg: any = ['Technology', 'Traditional', 'Economic', 'Other']
  changeCity(e) {
   console.log(e.target.value.toString().split(':')[1].trim());
    //this.postgroup.get('Category').setValue(e.target.value)
  }
  currentDate = new Date();
  postgroup = new FormGroup({
    Uid:new FormControl(localStorage.getItem('currentUser')),
    Title:new FormControl(''),
    Date:new FormControl(this.currentDate),
    Content:new FormControl(''),
    Category:new FormControl(''),
    Owner:new FormControl(localStorage.getItem('userName'))

  })


  constructor(
    public _dataService:DataServiceService,
    public router:Router,
    public loaderService:LoaderService,
    public toastr:ToastrService,
    public post:DataServiceService
  ) { }
  showSuccess(message:String) {
    this.toastr.warning(message.toString(), "Select Post Image");
   }
  onFileSelect(event : Event){
    this.uploadButton=false;
    const file = (event.target as HTMLInputElement).files[0];
    this.image=file
    const allowedFileTypes=["image/png", "image/jpeg", "image/jpg"];
    if(file && allowedFileTypes.includes(file.type)){
      const reader=new FileReader();
      reader.onload = () => {
        this.imageData=reader.result as string;
      }
      reader.readAsDataURL(file);
      this.titleImage=false;
    }
  }
  uploadImage(id){
    let fd=new FormData();
    if(this.image){
      fd.append("PostImage", this.image, this.image.name);

      this.post.postImage(id,fd).subscribe((res)=>{
        if(res['success']){

        }
      })
    }
console.log("fd" + fd);
this.uploadButton=true;
  }
  ngOnInit(): void {
  }
  submitPost(post){
    if(this.titleImage==false){
  //
    if(this.postgroup.get('Category').value=="" || this.postgroup.get('Category').value=="Choose your post Category" ){
      this.showSuccess("Please select Category");
    }else{
      console.log(post)
this._dataService.postPost(post).subscribe((res)=>{
  console.log(res);
  this.uploadImage(res._id);

    this.router.navigate(['special']);
    console.log(res);


});
    }
  }

  else{
this.showSuccess("Please select Post Main Image");
  }
  }
  public config={

	toolbar: {
		items: [
			'heading',

			'bold',
      'italic',

      'clipboard',
			'link',
			'bulletedList',
			'numberedList',
			'|',
			'outdent',
			'indent',
			'|',
			'uploadImage',
			'blockQuote',
			'insertTable',
			'mediaEmbed',
			'undo',
			'redo',

		],
    supportAllValues: true
	},



  image: {
    // Configure the available styles.

    // Configure the available image resize options.
    resizeOptions: [
        {
            name: 'resizeImage:original',
            label: 'Original',
            value: null
        },
        {
            name: 'resizeImage:50',
            label: '50%',
            value: '50'
        },
        {
            name: 'resizeImage:75',
            label: '75%',
            value: '75'
        }
    ],

    // You need to configure the image toolbar, too, so it shows the new style
    // buttons as well as the resize buttons.
    toolbar: [
        'imageStyle:alignLeft', 'imageStyle:alignCenter', 'imageStyle:alignRight',
        '|',
        'resizeImage',
        '|',
        'imageTextAlternative'
    ]
},

	// This value must be kept in sync with the language defined in webpack.config.js.
	language: 'en'
  };

}
