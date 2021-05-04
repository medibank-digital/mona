import { LitElement, ReactiveController } from 'lit';
import { SpreadData } from './LitHelper';

export class SpreadController implements ReactiveController {
  host: LitElement;

  constructor(host: LitElement) {
    this.host = host;
    host.addController(this);
  }

  buildSpreadAttributesIgnoring(ignoring: string[]): SpreadData {
    const spreadAttributeNames = this.host
      .getAttributeNames()
      .filter((attribute) => !ignoring.includes(attribute));

    const spreadAttributes = spreadAttributeNames.reduce(
      (attributes, name) => ({
        ...attributes,
        [name]: this.host.getAttribute(name),
      }),
      {},
    );

    return spreadAttributes;
  }

  // eslint-disable-next-line class-methods-use-this
  hostUpdate() {}
}
