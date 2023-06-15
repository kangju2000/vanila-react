declare namespace Kreact {
  interface KreactElement {
    type: any;
    props: {
      children: KreactElement[];
      key?: any;
      ref?: KreactRef;
      nodeValue?: any;
    };
  }

  interface KreactComponent {
    (): KreactElement;
  }

  interface KreactContext {
    Provider: (props: { value: any }) => KreactElement;
    Consumer: (props: { children: (value: any) => KreactElement }) => KreactElement;
  }

  interface KreactFragment {
    type: 'FRAGMENT';
    props: {
      children: KreactElement[];
      key?: any;
    };
  }

  interface KreactRef {
    current: any;
  }

  type KreactNode = ReactElement | string | number | KreactFragment | boolean | null | undefined;
}
