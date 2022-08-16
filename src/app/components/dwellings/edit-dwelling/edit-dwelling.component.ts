import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Dwelling } from 'src/app/models/Dwelling';
import { DwellingsService } from 'src/app/services/dwellings.service';

import { State } from 'src/app/models/State';
import { STATES } from 'src/app/data/state-data';

import { MessageService, PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-edit-dwelling',
  templateUrl: './edit-dwelling.component.html',
  styleUrls: ['./edit-dwelling.component.css'],
})
export class EditDwellingComponent implements OnInit {
  submitted: boolean = false;

  states: State[] = STATES;

  editDwellingForm!: FormGroup;
  id!: string;
  userRef: any;

  constructor(
    private dwellingsService: DwellingsService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private messageService: MessageService,
    private primengConfig: PrimeNGConfig
  ) {
    this.editDwellingForm = fb.group({
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
    this.id = this.route.snapshot.params['id'];

    this.dwellingsService.getDwelling(this.id).subscribe((res) => {
      this.userRef = res;
      this.editDwellingForm = this.fb.group({
        dwellingName: [this.userRef.dwellingName],
        dwellingAddress1: [this.userRef.dwellingAddress1],
        dwellingAddress2: [this.userRef.dwellingAddress2],
        dwellingCity: [this.userRef.dwellingCity],
        dwellingState: [this.userRef.dwellingState],
        dwellingZipcode: [this.userRef.dwellingZipcode],
      });
    });
  }

  onSubmit({ value, valid }: { value: Dwelling; valid: boolean }) {
    this.submitted = true;
    let tempID = this.id;

    if (!valid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Form Is Invalid',
        detail: 'Check form for errors!',
        life: 3000,
      });
    } else {
      this.dwellingsService.updateDwelling(value, tempID);
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Dwelling Updated!',
        life: 3000,
      });
      this.submitted = false;
      setTimeout(() => {
        this.router.navigate(['/dwellings']);
      }, 2000);
    }
  }
}
