import { JBImageInput } from "jb-image-input/react";
const downloader = (value, config) => {
  return fetch(value)
    .then(response => response.blob())
    .then(
      blob =>
        new Promise(resolve => {
          var reader = new window.FileReader();
          reader.readAsDataURL(blob);
          reader.onload = function () {
            resolve(reader.result);
          };
        }),
    );
};
function JBImageInputActionTest(props) {
  function onchange(e) {
    console.log("image changed");
  }
  function onMaxSizeExceed(e) {
    console.error(`your file size   is not valid your size is:${e.detail.file.size}`);
  }
  return (
    <div>
      <JBImageInput downloader={downloader} onChange={onchange} config={{}}></JBImageInput>
      <h3>with 2MB max size limit</h3>
      <JBImageInput downloader={downloader} onChange={onchange} config={{}} maxFileSize={2 * 1024 * 1024} onMaxSizeExceed={onMaxSizeExceed}></JBImageInput>
    </div>
  );
}

JBImageInputActionTest.propTypes = {};

export default JBImageInputActionTest;
