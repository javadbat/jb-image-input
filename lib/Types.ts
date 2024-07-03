export type JBImagesImageInputElements = {
    webComponent:HTMLDivElement;
    placeHolderWrapper:HTMLDivElement;
    placeHolderTitle:HTMLDivElement;
    image:HTMLImageElement;
}
export type JBImageInputBridge<TValue> = {
    downloader: (downloaderInput:TValue, config:JBImageInputConfig) => Promise<string>;
    uploader: (file:File , config:JBImageInputConfig, onProgressCallback?:(percent:number)=>void) => Promise<TValue>;
}
export type JBImageInputConfig = {
    uploadUrl?: string,
    downloadUrl?: string,
    [key:string]:any
}
export type ValidationValue = {
    file:File
}