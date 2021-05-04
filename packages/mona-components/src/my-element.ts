import { LitElement, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { unsafeStatic, html } from 'lit/static-html.js';
import { TailwindStylesController } from './utils/TailwindStylesController';
import { spread } from './utils/LitHelper';
import { SpreadController } from './utils/SpreadController';
import { ElementTagName, validElementTagNames } from './utils/HTMLTypes';
import { assertTagNameIsAllowed } from './utils/AssertHelpers';
import { UniqueSlotController } from './utils/UniqueSlotController';

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

  private __uniqueSlotController: UniqueSlotController = new UniqueSlotController(
    this,
  );

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

  @property({ type: String, reflect: true }) as: ElementTagName = 'div';

  private __renderChildren() {
    return Array.from(this.children).map((_, index) => {
      return html`
        <div>
          <slot
            name=${this.__uniqueSlotController.getSlotIdentifier(index)}
            @slotchange=${this.__uniqueSlotController.onSlotChange}
          ></slot>
        </div>
      `;
    });
  }

  render() {
    assertTagNameIsAllowed(
      this.as,
      (validElementTagNames as unknown) as string[],
    );

    const tag = unsafeStatic(this.as);

    const attributesToSpread = this.__spreadController.buildSpreadAttributesIgnoring(
      ['as', 'style', 'class', 'slot', 'name', 'count'],
    );

    return html`
      <${tag} ...=${spread(attributesToSpread)}>
        <h1 class=${this.__stylesController.tw('font-bold')}>
          Hello, ${this.name}!
        </h1>
        <button @click=${this._onClick} part="button">
          Click Count: ${this.count}
        </button>
        <div class=${this.__stylesController.tw(
          'space-y-12',
        )}>${this.__renderChildren()}</div>
      </${tag}>
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
