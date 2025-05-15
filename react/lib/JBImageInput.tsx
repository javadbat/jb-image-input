import React, { useEffect, useRef, useState, useImperativeHandle } from 'react';
import 'jb-image-input';
// eslint-disable-next-line no-duplicate-imports
import type { JBImageInputWebComponent, JBImageInputConfig, JBImageInputBridge } from 'jb-image-input';
import { type EventProps, useEvents } from './events-hook.js';
import { useJBImageInputAttribute, type JBImageInputAttributes } from './attributes-hook.js';
// eslint-disable-next-line react/display-name

export { JBImageInputConfig, JBImageInputBridge };

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      'jb-image-input': JBImageInputType;
    }
    interface JBImageInputType extends React.DetailedHTMLProps<React.HTMLAttributes<JBImageInputWebComponent<TValue>>, JBImageInputWebComponent<TValue>> {
      class?: string,
      label?: string,
      message?: string,
      name?: string,
      required?: string | boolean,
      // ref:React.RefObject<JBDateInputWebComponent>,
    }
  }
}
//TODO: refactor this after react remove forward ref
type TValue = any;

export const JBImageInput = React.forwardRef((props: Props<TValue>, ref) => {
  const element = useRef<JBImageInputWebComponent<TValue>>(null);
  useImperativeHandle(
    ref,
    () => (element ? element.current : undefined),
    [element],
  );

  useJBImageInputAttribute(element, props);
  useEvents(element, props);

  return (
    <jb-image-input ref={element} class={props.className || ''}  upload-type={props.uploadType || 'AUTO'}>
      {props.children}
    </jb-image-input>
  );
});

export type Props<TValue> = EventProps<TValue> & JBImageInputAttributes<TValue> & {
  uploadType?: string,
  className?: string,
  children?: React.ReactNode,
}
JBImageInput.displayName = "JBImageInput";

