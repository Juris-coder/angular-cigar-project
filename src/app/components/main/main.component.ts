import { Component, OnInit } from '@angular/core';
import { ICigarSearchResult } from 'src/app/utils/types';
import { ApiAssistantService } from 'src/app/utils/apiRequestClass';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  constructor(private ApiAssistantService: ApiAssistantService) {}
  data: ICigarSearchResult[] | undefined;

  async ngOnInit(): Promise<void> {
    this.ApiAssistantService.getCigars(1).subscribe(
      (cigars) => (this.data = cigars.cigars)
    );
  }
}
