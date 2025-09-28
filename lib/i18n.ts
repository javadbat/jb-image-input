import {JBDictionary} from 'jb-core/i18n';
export type JBImageInputDictionary = {
  requiredMessage:string,
  maxSizeExceed:(maxSize:string, fileSize:string)=>string,
  chooseImage:string,
  reselectImage:string,
  uploading:string,
  preparing:string,
}

/**
 * dictionary of jb image input. it's already loaded with persian and english lang but you can also extend it with you apps other language or replace already exist language 
 * @example 
 * ```js
 * import {dictionary} from 'jb-image-input'
 * dictionary.setLanguage("fr", {
 *  requiredMessage: "message in french",
 * // other dictionary keys
 * });
 * ```
 */
export const dictionary = new JBDictionary<JBImageInputDictionary>({
  "fa":{
    requiredMessage:"شما حتما باید یک تصویر را انتخاب کنید",
    maxSizeExceed:(maxSize:string, fileSize:string)=>`حجم فایل شما (${fileSize}) بیشتر از حجم مجاز (${maxSize}) است`,
    chooseImage:"انتخاب تصویر",
    reselectImage:'انتخاب مجدد تصویر',
    preparing:'در حال آماده سازی',
    uploading:'در حال آپلود',
  },
  "en":{
    requiredMessage:"You must select a image",
    maxSizeExceed:(maxSize:string, fileSize:string)=>`Your file Size (${fileSize}), Exceed maximum limit (${maxSize})`,
    chooseImage:"Choose Image",
    reselectImage: 'Reselect Image',
    preparing:'Preparing Image For Display',
    uploading:'Uploading'
  }
});