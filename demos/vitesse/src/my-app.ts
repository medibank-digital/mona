import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import '@dblechoc/mona-components';

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement('my-app')
export class MyApp extends LitElement {
  render() {
    return html`
      <my-element>
        <p>This is child content</p>
      </my-element>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'my-app': MyApp;
  }
}
