import {Component, OnInit} from '@angular/core';
import {RequestServiceService} from '../../service/request-service.service';

@Component({
  selector: 'app-request-service',
  templateUrl: './request-service.component.html',
  styleUrls: ['./request-service.component.css']
})
export class RequestServiceComponent implements OnInit {

  constructor(
    private request: RequestServiceService
  ) {
  }

  ngOnInit(): void {
  }

}
