import { useEvent } from "jb-core/react";
import { RefObject } from "react";
import type { JBImageInputEventType, JBImageInputWebComponent } from 'jb-image-input';

export type EventProps<TValue> = {
  /**
   * when component loaded, in most cases component is already loaded before react mount so you dont need this but if you load web-component dynamically with lazy load it will be called after react mount
   */
  onLoad?: (e: JBImageInputEventType<CustomEvent, TValue>) => void,
  /**
 * when all property set and ready to use, in most cases component is already loaded before react mount so you dont need this but if you load web-component dynamically with lazy load it will be called after react mount
 */
  onInit?: (e: JBImageInputEventType<CustomEvent, TValue>) => void,
  /**
   * when value changed to invalid value
   */
  onChange?: (e: JBImageInputEventType<Event, TValue>) => void,
  onImageSelected?: (e: JBImageInputEventType<CustomEvent, TValue>) => void,
  onMaxSizeExceed?: (e: JBImageInputEventType<Event, TValue>) => void,
}
export function useEvents<TValue>(element: RefObject<JBImageInputWebComponent>, props: EventProps<TValue>) {
  useEvent(element, 'load', props.onLoad, true);
  useEvent(element, 'init', props.onInit, true);
  useEvent(element, "change", props.onChange);
  useEvent(element, "imageSelected", props.onImageSelected);
  useEvent(element, "maxSizeExceed", props.onMaxSizeExceed);

}