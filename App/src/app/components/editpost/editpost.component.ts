import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataServiceService } from 'src/app/services/data-service.service';
import * as ClassicEditor from 'src/app/build/ckeditor';
import { LoaderService } from 'src/app/loader/loader.service';
@Component({
  selector: 'app-editpost',
  templateUrl: './editpost.component.html',
  styleUrls: ['./editpost.component.css']
})
export class EditpostComponent implements OnInit {
  public Editor = ClassicEditor;
  postgroup = new FormGroup({
    Title:new FormControl(''),
    Content:new FormControl('')
  })
  constructor(
    public _dataService:DataServiceService,
    public route:ActivatedRoute,
    public router:Router,
    public loaderService:LoaderService
  ) { }

  ngOnInit(): void {
    this._dataService.getPost(this.route.snapshot.params.id).subscribe(res=>{
      this.postgroup.get('Title').setValue(res.Title);
      this.postgroup.get('Content').setValue(res.Content);
    });
  }
  submitPost(editValue){
this._dataService.updatePost(this.route.snapshot.params.id, editValue).subscribe(res=>{
  console.log(res);
  this.router.navigate(['special'])
})
  }

  public config={

    toolbar: {
      items: [
        'heading',
        '|',
        'bold',
        'italic',
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
        'redo'

      ],
      toolbar: [
        'imageStyle:alignLeft', 'imageStyle:alignCenter', 'imageStyle:alignRight',
        '|',
        'resizeImage',
        '|',
        'imageTextAlternative'
      ]
    },
    image: {
      // Configure the available styles.
      styles: [
          'alignLeft', 'alignCenter', 'alignRight'
      ],

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
