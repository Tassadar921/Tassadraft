import { Injectable } from '@angular/core';
import Card from '../../types/Card';

@Injectable({
  providedIn: 'root'
})
export class UndoService {
  public undoStack: Card[] = [];

  constructor() {}

  public add(card: Card): void {
    this.undoStack.push(card);
  }

  public remove(card: Card): void {
    const index = this.undoStack.indexOf(card);
    if (index > -1) {
      this.undoStack.splice(index, 1);
    }
  }

  public undo(): Card {
    return <Card>this.undoStack.pop();
  }

  public clear(): void {
    this.undoStack = [];
  }
}
