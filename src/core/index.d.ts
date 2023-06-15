declare namespace Kreact {
  interface KreactElement {
    type: string;
    props: {
      children: KreactElement['props']['children'];
      key: KreactElement['props']['key'];
      ref: KreactElement['props']['ref'];
    };
  }

  interface KreactComponent {
    (): KreactElement;
  }

  interface KreactContext {
    Provider: (props: { value: any }) => KreactElement;
    Consumer: (props: { children: (value: any) => KreactElement }) => KreactElement;
  }

  interface KreactRefObject {
    current: any;
  }

  interface KreactRef {
    current: any;
  }

  interface KreactRefCallback {
    (instance: any): void;
  }

  interface KreactRefObject {
    current: any;
  }

  interface KreactRef {
    current: any;
  }

  interface KreactRefCallback {
    (instance: any): void;
  }

  interface KreactRefObject {
    current: any;
  }

  interface KreactRef {
    current: any;
  }

  interface KreactRefCallback {
    (instance: any): void;
  }

  interface KreactRefObject {
    current: any;
  }

  interface KreactRef {
    current: any;
  }

  interface KreactRefCallback {
    (instance: any): void;
  }

  interface KreactRefObject {
    current: any;
  }

  interface KreactRef {
    current: any;
  }

  interface KreactRefCallback {
    (instance: any): void;
  }

  interface KreactRefObject {
    current: any;
  }

  interface KreactRef {
    current: any;
  }

  interface KreactRefCallback {
    (instance: any): void;
  }

  interface KreactRefObject {
    current: any;
  }

  interface KreactRef {
    current: any;
  }

  interface KreactRefCallback {
    (instance: any): void;
  }

  interface KreactRefObject {
    current: any;
  }

  interface KreactRef {
    current: any;
  }

  interface KreactRefCallback {
    (instance: any): void;
  }

  interface KreactNode {
    type: string;
    props: {
      children: KreactNode['props']['children'];
      key: KreactNode['props']['key'];
      ref: KreactNode['props']['ref'];
    };
  }
}
