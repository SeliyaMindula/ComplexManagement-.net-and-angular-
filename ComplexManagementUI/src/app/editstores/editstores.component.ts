import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { StoreService } from '../services/store.service';

@Component({
  selector: 'app-editstores',
  templateUrl: './editstores.component.html',
  styleUrls: ['./editstores.component.css']
})
export class EditstoresComponent implements OnInit {
  editStoreForm!: FormGroup;
  currentStoreId!: number;

  successMessage: string = '';
  errorMessage: string = '';
  storeForm!: FormGroup;


  constructor(
    private fb: FormBuilder, 
    private storeService: StoreService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.initializeForm();
    this.route.paramMap.subscribe(params => {
      const storeId = params.get('id');
      if (storeId !== null) {
        this.currentStoreId = +storeId;
        this.loadStoreData(this.currentStoreId);
      } else {
      }
    });
  }

  initializeForm(): void {
    this.editStoreForm = this.fb.group({
      storeID:[''],
      name: ['', Validators.required],
      category: this.fb.group({
        categoryID: [''],
        name: ['', Validators.required],
        description: ['']
      }),
      leaseAgreements: this.fb.array([]),
      maintenanceContracts: this.fb.array([])
    });
  }

  loadStoreData(storeId: number): void {
    this.storeService.getStoreById(storeId).subscribe(
      storeData => {
        this.editStoreForm.patchValue({
          storeID: storeData.storeID,
          name: storeData.name,
          category: storeData.category,
        });

        this.leaseAgreements.clear();
        this.maintenanceContracts.clear();

        storeData.leaseAgreements.forEach((lease: any) => {
          this.leaseAgreements.push(this.createLeaseFormGroup(lease));
        });

        storeData.maintenanceContracts.forEach((contract: any )=> {
          this.maintenanceContracts.push(this.createMaintenanceFormGroup(contract));
        });
      },
      error => console.error('Error fetching store data:', error)
    );
  }

  createLeaseFormGroup(leaseData: any): FormGroup {
    return this.fb.group({
      leaseID:[leaseData.leaseID],
      startDate: [leaseData.startDate],
      endDate: [leaseData.endDate],
      rent: [leaseData.rent],
      terms: [leaseData.terms],
      payments: this.fb.array(leaseData.payments.map((payment: any )=> this.createPaymentFormGroup(payment)))
    });
  }

  createPaymentFormGroup(paymentData: any): FormGroup {
    return this.fb.group({
      paymentID:[paymentData.paymentID],
      date: [paymentData.date],
      amount: [paymentData.amount],
      type: [paymentData.type],
      invoiceNumber: [paymentData.invoiceNumber]
    });
  }

  createMaintenanceFormGroup(contractData: any): FormGroup {
    return this.fb.group({
      contractID:[contractData.contractID],
      providerName: [contractData.providerName],
      startDate: [contractData.startDate],
      endDate: [contractData.endDate],
      cost: [contractData.cost],
      details: [contractData.details]
    });
  }

  get leaseAgreements(): FormArray {
    return this.editStoreForm.get('leaseAgreements') as FormArray;
  }

  get maintenanceContracts(): FormArray {
    return this.editStoreForm.get('maintenanceContracts') as FormArray;
  }

  getPayments(lease: AbstractControl): FormArray {
    return (lease as FormGroup).get('payments') as FormArray;
  }

  onSubmit(): void {
    if (this.editStoreForm.valid) {
      this.storeService.updateStore(this.currentStoreId, this.editStoreForm.value).subscribe(
        response => {
          this.successMessage = 'Store Update successfully';
          this.errorMessage = '';
          console.log('Store update successfully', response);
          this.storeForm.reset();
        },
        error => {
          this.errorMessage = 'Error while updating store';
          this.successMessage = '';
          console.error('Error while updating store:', error);
        }
      );
    } else {
      this.errorMessage = 'Form is invalid';
      this.successMessage = '';
      console.error('Form is invalid');
    }
  }


}