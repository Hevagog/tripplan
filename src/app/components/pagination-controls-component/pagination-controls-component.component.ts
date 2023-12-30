import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pagination-controls-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagination-controls-component.component.html',
  styleUrl: './pagination-controls-component.component.css'
})
export class PaginationControlsComponentComponent {
  @Output() pageChange = new EventEmitter<number>();
  @Input() totalItems: number | undefined;
  @Input() itemsPerPage: number | undefined;

  get pages() {
    if (this.totalItems && this.itemsPerPage) {
      const pageCount = Math.ceil(this.totalItems / this.itemsPerPage);
      return Array(pageCount).fill(0).map((x, i) => i + 1);
    }
    return [];
  }

  onPageChange(page: number) {
    this.pageChange.emit(page);
  }
}
