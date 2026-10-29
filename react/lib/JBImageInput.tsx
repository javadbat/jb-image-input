'use client';
import React, { useRef, useImperativeHandle, type ForwardedRef } from 'react';
import 'jb-image-input';
import type { JBImageInputWebComponent, JBImageInputConfig, JBImageInputDownloader } from 'jb-image-input';
import { type EventProps, useEvents } from './events-hook.js';
import { useJBImageInputAttribute, type JBImageInputAttributes } from './attributes-hook.js';
import type { JBElementStandardProps } from 'jb-core/react';
import './module-declaration.js';

export type { JBImageInputConfig, JBImageInputDownloader };

export function JBImageInput<TValue>(props: Props<TValue>) {
  const element = useRef<JBImageInputWebComponent<TValue> | null>(null);
  const { accept,overlayText, ref, downloader, config, disabled, file, initialValue, label, maxFileSize, message, multiple, name, required, validationList, value, onChange, onImageSelected, onInit, onLoad, onMaxSizeExceed, onDownloadStart, onOverlayClick, uploadType, isUploading, uploadPercent, ...otherProps } = props;
  useImperativeHandle(ref,
    () => (element.current ?? undefined),
    []);
    
  useJBImageInputAttribute(element, { accept, downloader, config, disabled, file, initialValue, label, maxFileSize, message, multiple, name, required, validationList, value, isUploading, uploadPercent });
  useEvents(element, { onChange, onImageSelected, onInit, onLoad, onMaxSizeExceed, onDownloadStart, onOverlayClick });

  return (
    <jb-image-input ref={element} upload-type={uploadType || 'AUTO'} overlay-text={overlayText} {...otherProps}>
      {props.children}
    </jb-image-input>
  );
};
type ImageInputProps<TValue> = EventProps<TValue> & JBImageInputAttributes<TValue> & {
  uploadType?: string,
  isUploading?: boolean,
  uploadPercent?: number | null,
  overlayText?:string,
  ref?: ForwardedRef<JBImageInputWebComponent<TValue> | null | undefined>
}
export type Props<TValue> = ImageInputProps<TValue> & JBElementStandardProps<JBImageInputWebComponent, keyof ImageInputProps<TValue>>

JBImageInput.displayName = "JBImageInput";
