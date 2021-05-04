import { AttributePart, noChange, ComplexAttributeConverter } from 'lit';
import {
  directive,
  Directive,
  DirectiveParameters,
  PartInfo,
  PartType,
} from 'lit/directive.js';
import { nothing } from 'lit/html.js';

export const ifDefined = <T>(value: T) => value ?? nothing;

export type SpreadData = {
  [key: string]: unknown;
};

export class Spread extends Directive {
  prevCache = new WeakMap();

  constructor(partInfo: PartInfo) {
    super(partInfo);

    if (partInfo.type !== PartType.PROPERTY) {
      throw new Error('spread can only be used in property expressions');
    }
  }

  render(_v: SpreadData) {
    // not needed
  }

  update(part: AttributePart, [spreadData]: DirectiveParameters<this>) {
    const prevData = this.prevCache.get(part);
    if (prevData === spreadData) {
      return;
    }
    this.prevCache.set(part, spreadData);

    // set new spread data
    if (spreadData) {
      // for in is faster than Object.entries().forEach
      // eslint-disable-next-line guard-for-in,no-restricted-syntax
      for (const key in spreadData) {
        const value = spreadData[key];
        if (value === noChange) {
          // eslint-disable-next-line no-continue
          continue;
        }

        const prefix = key[0];
        const { element } = part;

        // event listener
        if (prefix === '@') {
          const prevHandler = prevData && prevData[key];
          if (!prevHandler || prevHandler !== value) {
            const name = key.slice(1);
            if (prevHandler) {
              // @ts-ignore
              element.removeEventListener(name, prevHandler);
            }
            // @ts-ignore
            element.addEventListener(name, value);
          }
          // eslint-disable-next-line no-continue
          continue;
        }

        // property
        if (prefix === '.') {
          if (!prevData || prevData[key] !== value) {
            // @ts-ignore
            element[key.slice(1)] = value;
          }
          // eslint-disable-next-line no-continue
          continue;
        }

        // boolean attribute
        if (prefix === '?') {
          if (!prevData || prevData[key] !== value) {
            const name = key.slice(1);
            if (value) {
              element.setAttribute(name, '');
            } else {
              element.removeAttribute(name);
            }
          }
          // eslint-disable-next-line no-continue
          continue;
        }

        // attribute
        if (!prevData || prevData[key] !== value) {
          if (value != null) {
            element.setAttribute(key, String(value));
          } else {
            element.removeAttribute(key);
          }
        }
      }
    }

    // remove previously set spread data if they were removed
    if (prevData) {
      // for in is faster than Object.entries().forEach
      // eslint-disable-next-line guard-for-in,no-restricted-syntax
      for (const key in prevData) {
        if (!spreadData || !(key in spreadData)) {
          const prefix = key[0];
          const { element } = part;

          // event listener
          if (prefix === '@') {
            // @ts-ignore
            element.removeEventListener(key.slice(1), prevData[key]);
            // eslint-disable-next-line no-continue
            continue;
          }

          // property
          if (prefix === '.') {
            // @ts-ignore
            element[key.slice(1)] = undefined;
            // eslint-disable-next-line no-continue
            continue;
          }

          // boolean attribute
          if (prefix === '?') {
            element.removeAttribute(key.slice(1));
            // eslint-disable-next-line no-continue
            continue;
          }

          // attribute
          element.removeAttribute(key);
        }
      }
    }
  }
}

export const spread = directive(Spread);
