import { Component, OnInit } from '@angular/core';
import { FormBuilder, AbstractControl, FormGroup, FormArray ,Validators } from '@angular/forms';
import { StoreService } from '../services/store.service';

@Component({
  selector: 'app-stores',
  templateUrl: './stores.component.html',
  styleUrls: ['./stores.component.css']
})
export class StoresComponent implements OnInit {
  storeForm!: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private storeService: StoreService) { }

  ngOnInit(): void {
    this.storeForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]], 
      category: this.fb.group({
        name: ['',[Validators.required]],
        description: ['',[Validators.required]]
      }),
      leaseAgreements: this.fb.array([this.createLeaseAgreement()]),
      maintenanceContracts: this.fb.array([this.createMaintenanceContract()])
    });
  }
  createLeaseAgreement(): FormGroup {
    return this.fb.group({
      startDate: ['',[Validators.required]],
      endDate: ['',[Validators.required]],
      rent: ['',[Validators.required]],
      terms: ['',[Validators.required]],
      payments: this.fb.array([this.createPayment()])
    });
  }

  createPayment(): FormGroup {
    return this.fb.group({
      date: ['',[Validators.required]],
      amount: ['',[Validators.required]],
      type: ['',[Validators.required]],
      invoiceNumber: ['',[Validators.required]]
    });
  }

  createMaintenanceContract(): FormGroup {
    return this.fb.group({
      providerName: ['',[Validators.required]],
      startDate: ['',[Validators.required]],
      endDate: ['',[Validators.required]],
      cost: ['',[Validators.required]],
      details: ['',[Validators.required]]
    });
  }

  get leaseAgreements(): FormArray {
    return this.storeForm.get('leaseAgreements') as FormArray;
  }

  get maintenanceContracts(): FormArray {
    return this.storeForm.get('maintenanceContracts') as FormArray;
  }
  
  getPayments(lease: AbstractControl): FormArray {
    return (lease as FormGroup).get('payments') as FormArray;
  }

  
  onSubmit() {
    if (this.storeForm.valid) {
      this.storeService.addStore(this.storeForm.value).subscribe(
        response => {
          this.successMessage = 'Store added successfully';
          this.errorMessage = '';
          console.log('Store added successfully', response);
          this.storeForm.reset();
        },
        error => {
          this.errorMessage = 'Error while adding store';
          this.successMessage = '';
          console.error('Error while adding store:', error);
        }
      );
    } else {
      this.errorMessage = 'Form is invalid';
      this.successMessage = '';
      console.error('Form is invalid');
    }
  }
}
