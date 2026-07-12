import type { JBImageInputWebComponent } from 'jb-image-input';

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      'jb-image-input': JBImageInputType<any>;
    }
    interface JBImageInputType<TValue> extends React.DetailedHTMLProps<React.HTMLAttributes<JBImageInputWebComponent<TValue>>, JBImageInputWebComponent<TValue>> {
      class?: string,
      label?: string,
      message?: string,
      name?: string,
      required?: string | boolean,
      value?: TValue | null,
      initialValue?: TValue | null,
      // ref:React.RefObject<JBDateInputWebComponent>,
    }
  }
}
