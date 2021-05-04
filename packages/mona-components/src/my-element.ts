import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { TailwindStylesController } from './utils/TailwindStylesController';
import { spread } from './utils/LitHelper';
import { SpreadController } from './utils/SpreadController';

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement('my-element')
export class MyElement extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
        border: solid 1px yellow;
        padding: 16px;
        max-width: 800px;
      }
    `,
  ];

  private __stylesController: TailwindStylesController = new TailwindStylesController(
    this,
  );

  private __spreadController: SpreadController = new SpreadController(this);

  /**
   * The name to say "Hello" to.
   */
  @property()
  name = 'World';

  /**
   * The number of times the button has been clicked.
   */
  @property({ type: Number })
  count = 0;

  render() {
    const attributesToSpread = this.__spreadController.buildSpreadAttributesIgnoring(
      ['style', 'class', 'slot', 'name', 'count'],
    );

    return html`
      <div ...=${spread(attributesToSpread)}>
        <h1 class=${this.__stylesController.tw('font-bold')}>
          Hello, ${this.name}!
        </h1>
        <button @click=${this._onClick} part="button">
          Click Count: ${this.count}
        </button>
        <slot></slot>
      </div>
    `;
  }

  private _onClick() {
    this.count++;
  }

  foo(): string {
    return 'foo';
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'my-element': MyElement;
  }
}
