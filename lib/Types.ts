export type JBImagesImageInputElements = {
    webComponent:HTMLDivElement;
    placeHolderWrapper:HTMLDivElement;
    placeHolderTitle:HTMLDivElement;
    image:HTMLImageElement;
}
export type JBImageInputValidationErrorTypes = 'REQUIRED' | '';
export type JBImageInputBridge<T = string> = {
    downloader: (downloaderInput:T, config:JBImageInputConfig) => Promise<string>;
    uploader: (file:File , config:JBImageInputConfig, onProgressCallback?:(percent:number)=>void) => Promise<any>;
}
export type JBImageInputConfig = {
    uploadUrl?: string,
    downloadUrl?: string,
    [key:string]:any
}