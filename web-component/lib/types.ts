import type {EventTypeWithTarget} from 'jb-core';
import type { JBImageInputWebComponent } from './jb-image-input';
export type JBImagesImageInputElements = {
    webComponent:HTMLDivElement;
    placeHolderWrapper:HTMLButtonElement;
    placeHolderTitle:HTMLSpanElement;
    placeHolderMessageBox: HTMLSpanElement;
    previewButton:HTMLButtonElement;
    image:HTMLImageElement;
    overlay:{
        container:HTMLDivElement,
        reselectButton:HTMLButtonElement,
        deleteButton:HTMLElement,
        downloadButton:HTMLElement
    }
    errorOverlay:{
        container:HTMLDivElement,
        message:HTMLDivElement
    }
}

export type ViewStatus = "downloaded" | "empty" | "uploading" | "uploaded";

export type JBImageInputBridge<TValue> = {
    downloader: (downloaderInput:TValue, config:JBImageInputConfig) => Promise<string>;
    uploader: (file:File , config:JBImageInputConfig, onProgressCallback?:(percent:number)=>void) => Promise<TValue>;
}
export type JBImageInputConfig = {
    uploadUrl?: string,
    downloadUrl?: string,
    [key:string]:any
}
export type ValidationValue<TValue> = {
    file:File | null,
    value:TValue | null
}

export type JBImageInputEventType<TEvent,TValue> = EventTypeWithTarget<TEvent,JBImageInputWebComponent<TValue>>;
