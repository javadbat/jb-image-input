'use client';
import React, { useRef, useImperativeHandle, type RefObject } from 'react';
import 'jb-image-input';
import type { JBImageInputWebComponent, JBImageInputConfig, JBImageInputBridge } from 'jb-image-input';
import { type EventProps, useEvents } from './events-hook.js';
import { useJBImageInputAttribute, type JBImageInputAttributes } from './attributes-hook.js';
import type { JBElementStandardProps } from 'jb-core/react';

export type { JBImageInputConfig, JBImageInputBridge };

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
      // ref:React.RefObject<JBDateInputWebComponent>,
    }
  }
}

export function JBImageInput<TValue> (props: Props<TValue>, ref) {
  const element = useRef<JBImageInputWebComponent<TValue>>(null);
  useImperativeHandle(
    ref,
    () => (element ? element.current : undefined),
    [element],
  );
  const {acceptTypes,bridge,config,file,label,maxFileSize,message,multiple,name,required,validationList,value,onChange,onImageSelected,onInit,onLoad,onMaxSizeExceed,uploadType,...otherProps} = props;
  useJBImageInputAttribute(element, {acceptTypes,bridge,config,file,label,maxFileSize,message,multiple,name,required,validationList,value});
  useEvents(element, {onChange,onImageSelected,onInit,onLoad,onMaxSizeExceed});

  return (
    <jb-image-input ref={element}  upload-type={uploadType || 'AUTO'} {...otherProps}>
      {props.children}
    </jb-image-input>
  );
};
type ImageInputProps<TValue> = EventProps<TValue> & JBImageInputAttributes<TValue> & {
  uploadType?: string,
  ref?: RefObject<JBImageInputWebComponent<TValue>>
}
export type Props<TValue> =  ImageInputProps<TValue> & JBElementStandardProps<JBImageInputWebComponent, keyof ImageInputProps<TValue>>

JBImageInput.displayName = "JBImageInput";

