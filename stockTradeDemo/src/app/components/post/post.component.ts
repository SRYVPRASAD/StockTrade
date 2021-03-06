import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators,FormControl } from '@angular/forms';
import { finalize } from "rxjs/operators";
import { AuthService } from "src/app/servives/auth.service";
import { AngularFireStorage } from '@angular/fire/storage';
import { PostService } from 'src/app/servives/post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  imgSrc : string = "assets/images/upload-1.png";
  selectedImage: any = null;
  isSubmitted: boolean;

  constructor(private formBuilder:FormBuilder , 
              private fdb:AngularFireStorage,
              private auth: AuthService,
              private postSer :PostService,) { }


  formTemplate = this.formBuilder.group({
    imageUrl :  ['',Validators.required],
    imgName  :  ['',Validators.required],
    cost     :  ['',Validators.required],
    category :  ['',Validators.required]
    });

  ngOnInit(): void {
  }

  showPreview(event:any){
    if(event.target.files && event.target.files[0]){
      const reader = new FileReader();
      reader.onload = (e: any) => this.imgSrc = e.target.result;
       reader.readAsDataURL(event.target.files[0]);
       this.selectedImage = event.target.files[0];
    }
    else {
     this.imgSrc = 'assets/images/upload-1.png';
     this.selectedImage = null;
   }
  }

   onSubmit(formValue) {   
    this.isSubmitted = true;
    if (this.formTemplate.valid) {
      var filePath = `post/${formValue.category}/${this.auth.currentUserId}/${this.selectedImage.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
      const fileRef = this.fdb.ref(filePath);
      this.fdb.upload(filePath, this.selectedImage).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
            formValue['imageUrl'] = url;
            this.postSer.insertImageDetails(formValue);
            this.resetForm();
          })
        })
      ).subscribe(); 
    }
  }

  get formControls() {
    return this.formTemplate.value;
  }

  resetForm() {
    this.formTemplate.reset();
    this.formTemplate.setValue({
      imageUrl :  '',
      imgName  :  '',
      cost     : '' ,
      category :''
    });
    this.imgSrc = 'assets/images/upload-1.png';
    this.selectedImage = null;
    this.isSubmitted = false;
  }

}
