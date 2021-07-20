import { Post } from './../../../../resources/interfaces/post';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit {
  file!: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: Post) { }

  ngOnInit(): void {
    if (this.data?.image) {
      const reader = new FileReader();
      reader.readAsDataURL(this.data?.image);
      reader.onload = () => {
        this.file = reader.result as string;
      }
    }
  }

}
