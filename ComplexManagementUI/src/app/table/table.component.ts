
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { StoreService } from '../services/store.service'; 
import { Router } from '@angular/router';
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  stores: any[] = [];
  displayedItems: any[] = [];
  storeForm!: FormGroup;
  isEditMode = false;
  currentEditingStoreId: number | null = null;
  currentPage = 1;
  itemsPerPage = 10;
  totalItems = 0;
  pages: number[] = [];

  searchTerm: string = ''; 
  searchResults: any[] | null = null;

  deleteSuccess: boolean = false;
  deleteMessage: string = '';


  constructor(private storeService: StoreService, private fb: FormBuilder,private router: Router) { }

  ngOnInit(): void {
    this.initializeForm();
    this.loadStores();
  }

  initializeForm(): void {
    this.storeForm = this.fb.group({
      name: [''],
    });
  }

  loadStores(): void {
    this.storeService.getStores().subscribe(
      (data) => {
        this.stores = data;
        this.totalItems = data.length;
        this.calculateTotalPages();
        this.setPage(this.currentPage);
      },
      (error) => console.error('Error fetching stores:', error)
    );
  }

  calculateTotalPages() {
    this.pages = [];
    const totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
    for (let i = 1; i <= totalPages; i++) {
      this.pages.push(i);
    }
  }

  setPage(page: number) {
    if (page < 1 || page > this.pages.length) return;

    this.currentPage = page;
    const startIndex = (page - 1) * this.itemsPerPage;
    const endIndex = Math.min(startIndex + this.itemsPerPage, this.totalItems);
    this.displayedItems = this.stores.slice(startIndex, endIndex);
  }

  searchStores(): void {
    if (this.searchTerm) {
      this.storeService.searchStores(this.searchTerm).subscribe(
        (data) => {
          this.searchResults = data;
        },
        (error) => {
          console.error('Error fetching search results:', error);
        }
      );
    }
  }

  deleteStore(storeId: number): void {
    this.storeService.deleteStore(storeId).subscribe(() => {
      this.stores = this.stores.filter(store => store.storeID !== storeId);
      this.deleteSuccess = true;
      this.deleteMessage = 'Store deleted successfully';
      this.loadStores();
      setTimeout(() => this.deleteSuccess = false, 3000); 

    });
  }

   navigateToEdit(storeId: number): void {
     this.router.navigate(['/edit-store', storeId]);
   }
  
}
