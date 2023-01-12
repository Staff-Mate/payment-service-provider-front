import {Pageable} from "./pageable";
import {PageSort} from "./pageSort";

export class Page<T> {
  content: Array<T> = []
  empty: boolean = false;
  first: boolean = true;
  last: boolean = false;
  number: number = 0;
  numberOfElements: number = 0;
  totalElements: number = 0;
  totalPages: number = 0;
  size: number = 0;
  pageable: Pageable = new Pageable();
  sort: PageSort = new PageSort();

  constructor() {
  }
}
