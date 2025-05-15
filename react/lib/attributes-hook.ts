import { JBImageInputWebComponent, type JBImageInputBridge, type JBImageInputConfig, type ValidationValue } from "jb-image-input";
import { type ValidationItem } from "jb-validation";
import { RefObject, useEffect } from "react";

export type JBImageInputAttributes<TValue> = {
  validationList?: ValidationItem<ValidationValue<TValue>>[],
  config?: JBImageInputConfig,
  value?: TValue,
  bridge?: JBImageInputBridge<TValue>,
  multiple?: boolean,
  name?: string,
  file?: File,
  acceptTypes?: string,
  maxFileSize?: number,
  required?: boolean,
  label?: string,
  message?: string,

}
export function useJBImageInputAttribute<TValue>(element: RefObject<JBImageInputWebComponent<TValue>>, props: JBImageInputAttributes<TValue>) {
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
    if (props.required) {
      element?.current?.setAttribute('required', 'true');
    } else {
      element?.current?.removeAttribute('required');
    }
  }, [props.required]);
  

}