import { type JBImageInputWebComponent, type JBImageInputDownloader, type JBImageInputConfig, type ValidationValue } from "jb-image-input";
import { type ValidationItem } from "jb-validation";
import { type RefObject, useEffect } from "react";

export type JBImageInputAttributes<TValue> = {
  value?: TValue | null,
  initialValue?: TValue | null,
  validationList?: ValidationItem<ValidationValue<TValue | null>>[],
  config?: JBImageInputConfig,
  downloader?: JBImageInputDownloader<TValue>,
  multiple?: boolean,
  name?: string,
  file?: File,
  acceptTypes?: string,
  maxFileSize?: number,
  disabled?: boolean,
  required?: boolean | string,
  label?: string,
  message?: string,
  uploading?: boolean,
  uploadPercent?: number | null,

}
export function useJBImageInputAttribute<TValue>(element: RefObject<JBImageInputWebComponent<TValue> | null>, props: JBImageInputAttributes<TValue>) {
  useEffect(() => {
    if (props.config && element.current) {
      element.current.config = props.config;
    }
  }, [props.config]);

  useEffect(() => {
    if (props.downloader && element.current) {
      element.current.downloader = props.downloader;
    }
  }, [props.downloader]);

  useEffect(() => {
    if (element.current && props.initialValue !== undefined) {
      element.current.initialValue = props.initialValue;
    }
  }, [props.initialValue, element]);

  useEffect(() => {
    if (element.current && props.value !== undefined) {
      element.current.value = props.value;
    }
  }, [props.value, element]);

  useEffect(() => {
    if (props.validationList && element.current) {
      element.current.validation.list = props.validationList;
    }
  }, [props.validationList]);

  useEffect(() => {
    if (props.multiple) {
      element.current?.setAttribute('multiple', 'true');
    } else {
      element.current?.removeAttribute('multiple');
    }
  }, [props.multiple]);

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

  useEffect(() => {
    if (props.name) {
      element?.current?.setAttribute('name', props.name || '');
    } else {
      element?.current?.removeAttribute('name');
    }
  }, [props.name]);

  useEffect(() => {
    if (props.label) {
      element?.current?.setAttribute('label', props.label || '');
    } else {
      element?.current?.removeAttribute('label');
    }
  }, [props.label]);

  useEffect(() => {
    if (props.message) {
      element?.current?.setAttribute('message', props.message || '');
    } else {
      element?.current?.removeAttribute('message');
    }
  }, [props.message]);

  useEffect(() => {
    if (element.current && props.disabled !== undefined) {
      element.current.disabled = props.disabled;
    }
  }, [props.disabled]);

  useEffect(() => {
    if (element.current && props.uploading !== undefined) {
      element.current.uploading = props.uploading;
    }
  }, [props.uploading]);

  useEffect(() => {
    if (element.current && props.uploadPercent !== undefined) {
      element.current.uploadPercent = props.uploadPercent;
    }
  }, [props.uploadPercent]);

  useEffect(() => {
    if (typeof props.required === "string") {
      element?.current?.setAttribute('required', props.required);
    }
    if (typeof props.required === "boolean") {
      props.required?element?.current?.setAttribute('required', ''):element?.current?.removeAttribute('required');
    }
  }, [props.required]);

}
