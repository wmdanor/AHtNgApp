import {Subscription} from "rxjs";

export function unsubscribeArray(array: Subscription[]) {
  array.forEach(el => el.unsubscribe());
}
