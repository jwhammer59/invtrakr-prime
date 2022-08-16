import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Dwelling } from 'src/app/models/Dwelling';
import { DwellingsService } from 'src/app/services/dwellings.service';

import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-dwelling-detail',
  templateUrl: './dwelling-detail.component.html',
  styleUrls: ['./dwelling-detail.component.css'],
})
export class DwellingDetailComponent implements OnInit {
  id: string = '';

  dwelling: Dwelling = {
    dwellingName: '',
    dwellingAddress1: '',
    dwellingAddress2: '',
    dwellingCity: '',
    dwellingState: '',
    dwellingZipcode: '',
  };

  constructor(
    private dwellingsService: DwellingsService,
    private route: ActivatedRoute,
    private primengConfig: PrimeNGConfig
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.primengConfig.ripple = true;
    this.dwellingsService.getDwelling(this.id).subscribe((dwelling) => {
      this.dwelling = dwelling;
    });
  }
}
