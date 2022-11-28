import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from "@angular/core";
import { Subscription } from "rxjs";
import { StoreService } from "src/app/services/store.service";

@Component({
  selector: "app-products-header",
  templateUrl: `./products-header.component.html`,
})
export class ProductsHeaderComponent implements OnInit, OnDestroy {
  // Sortowanie po typie
  @Output() showType = new EventEmitter<string>();
  @Output() sortChange = new EventEmitter<string>();
  @Output() clearFiltersEvent = new EventEmitter<string>();

  typesSubscription: Subscription | undefined;
  types: Array<string> | undefined;
  // types = ["MTB", "szosa"];
  /////////////////////////

  sort = "desc";
  constructor(private storeService: StoreService) {}

  ngOnInit(): void {
    this.typesSubscription = this.storeService
      .getAllTypes()
      .subscribe((response: Array<string>) => {
        this.types = response;
      });
  }

  // Sortowanie po typie
  onShowType(type: string): void {
    this.showType.next(type);
  }

  onSortUpdated(newSort: string): void {
    this.sort = newSort;
    this.sortChange.emit(newSort);
  }

  onClearFilters():void{
    this.clearFiltersEvent.emit();
  }

  ngOnDestroy(): void {
    if (this.typesSubscription) {
      this.typesSubscription.unsubscribe();
    }
  }
}
