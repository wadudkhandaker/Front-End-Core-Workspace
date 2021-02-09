import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ecap-photo-uploader',
  templateUrl: './photo-uploader.component.html',
  styleUrls: ['./photo-uploader.component.scss']
})

export class PhotoUploaderComponent implements OnInit {
  title: string
  constructor() { }

  ngOnInit(): void {
    this.title = 'photo-uploader';
  }
}
