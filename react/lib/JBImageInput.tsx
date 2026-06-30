'use client';
import React, { useRef, useImperativeHandle, type ForwardedRef } from 'react';
import 'jb-image-input';
import type { JBImageInputWebComponent, JBImageInputConfig, JBImageInputBridge } from 'jb-image-input';
import { type EventProps, useEvents } from './events-hook.js';
import { useJBImageInputAttribute, type JBImageInputAttributes } from './attributes-hook.js';
import type { JBElementStandardProps } from 'jb-core/react';
import './module-declaration.js';

export type { JBImageInputConfig, JBImageInputBridge };

export function JBImageInput<TValue>(props: Props<TValue>) {
  const element = useRef<JBImageInputWebComponent<TValue> | null>(null);
  const { acceptTypes, ref, bridge, config, file, label, maxFileSize, message, multiple, name, required, validationList, value, onChange, onImageSelected, onInit, onLoad, onMaxSizeExceed, uploadType, ...otherProps } = props;
  useImperativeHandle(ref,
    () => (element.current ?? undefined),
    [element]);
    
  useJBImageInputAttribute(element, { acceptTypes, bridge, config, file, label, maxFileSize, message, multiple, name, required, validationList, value });
  useEvents(element, { onChange, onImageSelected, onInit, onLoad, onMaxSizeExceed });

  return (
    <jb-image-input ref={element} upload-type={uploadType || 'AUTO'} {...otherProps}>
      {props.children}
    </jb-image-input>
  );
};
type ImageInputProps<TValue> = EventProps<TValue> & JBImageInputAttributes<TValue> & {
  uploadType?: string,
  ref?: ForwardedRef<JBImageInputWebComponent<TValue> | null | undefined>
}
export type Props<TValue> = ImageInputProps<TValue> & JBElementStandardProps<JBImageInputWebComponent, keyof ImageInputProps<TValue>>

JBImageInput.displayName = "JBImageInput";

