import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-violation-report',
  templateUrl: './violation-report.component.html',
  styleUrls: ['./violation-report.component.css']
})
export class ViolationReportComponent implements OnInit {
  reports:any[]= [];
  constructor() { }

  ngOnInit(): void {
  }

}
