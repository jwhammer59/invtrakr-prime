import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Dwelling } from 'src/app/models/Dwelling';
import { DwellingsService } from 'src/app/services/dwellings.service';

import { State } from 'src/app/models/State';
import { STATES } from 'src/app/data/state-data';

import { MessageService, PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-add-dwelling',
  templateUrl: './add-dwelling.component.html',
  styleUrls: ['./add-dwelling.component.css'],
})
export class AddDwellingComponent implements OnInit {
  states: State[] = STATES;

  submitted: boolean = false;

  addDwellingForm!: FormGroup;

  constructor(
    private dwellingsService: DwellingsService,
    private fb: FormBuilder,
    private router: Router,
    private messageService: MessageService,
    private primengConfig: PrimeNGConfig
  ) {
    this.addDwellingForm = fb.group({
      dwellingName: ['', Validators.required],
      dwellingAddress1: ['', Validators.required],
      dwellingAddress2: '',
      dwellingCity: ['', Validators.required],
      dwellingState: ['', Validators.required],
      dwellingZipcode: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
  }

  onSubmit({ value, valid }: { value: Dwelling; valid: boolean }) {
    this.submitted = true;
    if (!valid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Form Is Invalid',
        detail: 'Check form for errors!',
        life: 3000,
      });
    } else {
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Dwelling Added!',
        life: 3000,
      });
      this.dwellingsService.addDwelling(value);
      this.submitted = false;
      setTimeout(() => {
        this.router.navigate(['/dwellings']);
      }, 2000);
    }
  }
}
