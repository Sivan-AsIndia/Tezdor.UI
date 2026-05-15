import { Component, computed, DestroyRef, ElementRef, inject, input, output, Renderer2, signal } from '@angular/core';

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


  constructor() {

  const removeListener =

    this.renderer.listen(

      'document',

      'click',

      (event: MouseEvent) => {

        const clickedInside =

          this.elementRef
            .nativeElement
            .contains(event.target);

        if (!clickedInside) {

          this.isOpen.set(false);

        }

      }

    );

  this.destroyRef.onDestroy(() => {

    removeListener();

  });

}

  private readonly elementRef =
  inject(ElementRef);
  private readonly renderer =
  inject(Renderer2);

private readonly destroyRef =
  inject(DestroyRef);

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



  selectedIdChange =
    output<string>();



  isOpen = signal(false);

  search = signal('');


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



  toggleDropdown() {

    if (this.disabled()) {
      return;
    }

    this.isOpen.update(v => !v);

    if (!this.isOpen()) {
      this.search.set('');
    }
  }


  selectItem(
    item: SearchDropdownItem
  ) {

    this.selectedIdChange.emit(item.id);

    this.isOpen.set(false);

    this.search.set('');
  }


  closeDropdown() {

    setTimeout(() => {

      this.isOpen.set(false);

    }, 150);
  }
}