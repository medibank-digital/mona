import { ReactiveController, LitElement } from 'lit';
import { createUUID } from './UniqueId';

export class UniqueSlotController implements ReactiveController {
  host: LitElement;

  private __uniqueSlotId = createUUID();

  constructor(host: LitElement) {
    this.host = host;
    host.addController(this);
  }

  getSlotIdentifier(index: number) {
    return `${this.__uniqueSlotId}${index}`;
  }

  onSlotChange(_event: Event) {
    Array.from(this.host.children).forEach((child, index) => {
      if (!child.slot) {
        child.setAttribute('slot', this.getSlotIdentifier(index));
      }
    });
  }

  hostConnected() {
    Array.from(this.host.children).forEach((child, index) => {
      if (!child.slot) {
        child.setAttribute('slot', this.getSlotIdentifier(index));
      }
    });
  }
}
