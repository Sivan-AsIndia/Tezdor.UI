import { Component, computed, input, output, signal } from '@angular/core';

export interface SearchDropdownItem {

  id: string;

  name: string;
}
@Component({
  selector: 'app-search-dropdown',
  imports: [],
  templateUrl: './search-dropdown.html',
  styleUrl: './search-dropdown.css',
})
export class SearchDropdownComponent {

  // =====================================================
  // INPUTS
  // =====================================================

  items =
    input<SearchDropdownItem[]>([]);

  placeholder =
    input('Select');

  selectedId =
    input<string | null>(null);

  disabled =
    input(false);

  invalid =
    input(false);

  // =====================================================
  // OUTPUTS
  // =====================================================

  selectedIdChange =
    output<string>();

  // =====================================================
  // STATE
  // =====================================================

  isOpen = signal(false);

  search = signal('');

  // =====================================================
  // FILTERED ITEMS
  // =====================================================

  filteredItems = computed(() => {

    const keyword =
      this.search()
        .trim()
        .toLowerCase();

    if (!keyword) {
      return this.items();
    }

    return this.items().filter(x =>
      x.name.toLowerCase()
        .includes(keyword)
    );
  });

  // =====================================================
  // SELECTED LABEL
  // =====================================================

  selectedLabel = computed(() => {

    const item =
      this.items().find(x =>
        x.id === this.selectedId()
      );

    return item?.name ||
      this.placeholder();
  });

  // =====================================================
  // TOGGLE
  // =====================================================

  toggleDropdown() {

    if (this.disabled()) {
      return;
    }

    this.isOpen.update(v => !v);

    if (!this.isOpen()) {
      this.search.set('');
    }
  }

  // =====================================================
  // SELECT
  // =====================================================

  selectItem(
    item: SearchDropdownItem
  ) {

    this.selectedIdChange.emit(item.id);

    this.isOpen.set(false);

    this.search.set('');
  }

  // =====================================================
  // CLOSE
  // =====================================================

  closeDropdown() {

    setTimeout(() => {

      this.isOpen.set(false);

    }, 150);
  }
}