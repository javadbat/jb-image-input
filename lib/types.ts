import type {EventTypeWithTarget} from 'jb-core';
import type { JBImageInputWebComponent } from './jb-image-input';
export type JBImagesImageInputElements = {
    webComponent:HTMLDivElement;
    placeHolderWrapper:HTMLDivElement;
    placeHolderTitle:HTMLDivElement;
    placeHolderMessageBox: HTMLDivElement;
    image:HTMLImageElement;
    overlay:{
        container:HTMLDivElement,
        deleteButton:HTMLDivElement,
        downloadButton:HTMLDivElement
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
    file:File,
    value:TValue
}

export type JBImageInputEventType<TEvent,TValue> = EventTypeWithTarget<TEvent,JBImageInputWebComponent<TValue>>;