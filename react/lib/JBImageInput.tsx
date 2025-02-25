import React, { useEffect, useRef, useState, useImperativeHandle } from 'react';
import 'jb-image-input';
// eslint-disable-next-line no-duplicate-imports
import type {JBImageInputWebComponent, JBImageInputConfig, JBImageInputBridge } from 'jb-image-input';
import { type EventProps, useEvents } from './events-hook.js';
// eslint-disable-next-line react/display-name

export {JBImageInputConfig, JBImageInputBridge };

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
  const [refChangeCount, refChangeCountSetter] = useState(0);
  useImperativeHandle(
    ref,
    () => (element ? element.current : {}),
    [element],
  );
  useEffect(() => {
    refChangeCountSetter(refChangeCount + 1);
  }, [element.current]);
  useEffect(() => {
    if (props.config && element.current) {
      element.current.config = props.config;
    }
  }, [props.config]);

  useEffect(() => {
    if (props.bridge && element.current) {
      element.current.bridge = props.bridge;
    }
  }, [props.bridge]);

  useEffect(() => {
    if (props.multiple) {
      element.current?.setAttribute('multiple', 'true');
    } else {
      element.current?.removeAttribute('multiple');
    }
  }, [props.multiple]);
  useEffect(() => {
    if (props.value !== undefined && element.current) {
      element.current.value = props.value;
    }
  }, [props.value]);
  useEffect(() => {
    if (props.file) {
      element.current?.selectImageByFile(props.file);
    }
  }, [props.file]);
  useEffect(() => {
    if (props.acceptTypes && element.current) {
      element.current.acceptTypes = props.acceptTypes;
    }
  }, [props.acceptTypes]);
  useEffect(() => {
    if (props.maxFileSize !== undefined && element.current) {
      element.current.maxFileSize = props.maxFileSize;
    }
  }, [props.maxFileSize]);

  useEvents(element,props);
  
  return (
    <jb-image-input ref={element} class={props.className || ''} label={props.label} upload-type={props.uploadType || 'AUTO'} required={props.required} name={props.name} message={props.message||""}>
      {props.children}
    </jb-image-input>
  );
});

export type Props<TValue> = EventProps<TValue> & {
    className?: string,
    message?:string,
    label?: string,
    required?: boolean,
    config?: JBImageInputConfig,
    value?: TValue,
    uploadType?: string,
    bridge?: JBImageInputBridge<TValue>,
    multiple?: boolean,
    file?: File,
    acceptTypes?: string,
    maxFileSize?: number,
    children?: React.ReactNode,
    name?:string
}
JBImageInput.displayName = "JBImageInput";

