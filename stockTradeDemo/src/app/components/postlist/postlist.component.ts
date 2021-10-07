import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/servives/post.service';

@Component({
  selector: 'app-postlist',
  templateUrl: './postlist.component.html',
  styleUrls: ['./postlist.component.css']
})
export class PostlistComponent implements OnInit {
  imageList: any[];
  rowIndexArray: any[];

  constructor(private postSer: PostService) { }

  ngOnInit() {
    this.postSer.imageDetailList.snapshotChanges().subscribe(
      list => {
        this.imageList = list.map(item => { return item.payload.val(); });
        this.rowIndexArray =  Array.from(Array(Math.ceil((this.imageList.length+1) / 3)).keys());
      }
    );
  }

  }


