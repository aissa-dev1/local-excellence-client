import { createStore, SetStoreFunction, Store } from "solid-js/store";

type Observer<T, K extends keyof T> = (newValue: T[K]) => void;

export abstract class BaseFeature<T extends Record<string, any>> {
  protected readonly initialState: T;
  protected readonly store: [Store<T>, SetStoreFunction<T>];
  private observers: { [K in keyof T]?: Observer<T, K>[] } = {};

  constructor(initialState: T) {
    this.initialState = initialState;
    this.store = createStore<T>(initialState);
  }

  update(state: Partial<T>) {
    this.store[1]((prev) => ({ ...prev, ...state }));
    this.notifyObservers(state);
  }

  reset() {
    this.store[1]({ ...this.initialState });
    this.notifyObservers(this.initialState);
  }

  state(): Readonly<T> {
    return this.store[0];
  }

  protected addObserver<K extends keyof T>(key: K, observer: Observer<T, K>) {
    if (!this.observers[key]) {
      this.observers[key] = [];
    }
    this.observers[key]!.push(observer);
  }

  protected removeObserver<K extends keyof T>(
    key: K,
    observer: Observer<T, K>
  ) {
    if (this.observers[key]) {
      this.observers[key] = this.observers[key]!.filter(
        (obs) => obs !== observer
      );
    }
  }

  private notifyObservers(state: Partial<T>) {
    for (const key in state) {
      if (this.observers[key as keyof T]) {
        this.observers[key as keyof T]!.forEach((observer) => {
          observer(state[key as keyof T]!);
        });
      }
    }
  }
}
