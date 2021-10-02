import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  imageDetailList: AngularFireList<any>;

  constructor(private db: AngularFireDatabase) { }

  getImageDetailList() {
    this.imageDetailList = this.db.list('imageDetails');
  }

  insertImageDetails(imageDetails) {
    this.imageDetailList.push(imageDetails);
  }
}