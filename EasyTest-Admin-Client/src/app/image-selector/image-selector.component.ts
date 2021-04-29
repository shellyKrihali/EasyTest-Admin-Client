import {Component, OnInit} from '@angular/core';
import {Input} from '@angular/core';
import {ElementRef} from '@angular/core';
import {ViewChild} from '@angular/core';
import {Output} from '@angular/core';
import {EventEmitter} from '@angular/core';

@Component({
  selector: 'image-selector',
  templateUrl: './image-selector.component.html',
  styleUrls: ['./image-selector.component.scss']
})
export class ImageSelectorComponent implements OnInit {
  @Input() imageSrc: any = 'https://epicattorneymarketing.com/wp-content/uploads/2016/07/Headshot-Placeholder-1.png';//'https://epicattorneymarketing.com/wp-content/uploads/2016/07/Headshot-Placeholder-1.png';
  @Output() onfileChanged = new EventEmitter<any>();
  @ViewChild('myInput', {static: true})
  myInputVariable: ElementRef;
  private tempImage: any;

  constructor() {
  }

  ngOnInit() {
  }

  resetImage() {
    this.myInputVariable.nativeElement.value = '';
    this.imageSrc = 'https://epicattorneymarketing.com/wp-content/uploads/2016/07/Headshot-Placeholder-1.png';

  }

  onFileChange(event) {
    this.tempImage = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      const reader = new FileReader();
      reader.onload = e => this.imageSrc = reader.result;

      reader.readAsDataURL(file);

      this.onfileChanged.emit(this.tempImage);
    }

  }
}
