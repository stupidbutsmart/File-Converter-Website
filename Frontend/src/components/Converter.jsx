import { useEffect, useState } from "react";
import { ConvertContext } from "./../utils/context/ConvertContext.js";
import ConvertTitle from "./ConvertTitle.jsx";
import ConvertInput from "./ConvertInput.jsx";
import ConvertTypeInput from "./ConvertTypeInput.jsx";
import { fetchConverterApi } from "../utils/hooks/fetchConverterApi.js";
import SubmitBtn from "./SubmitBtn.jsx";
import FilePreview from "./FilePreview.jsx";
export default function Converter() {
  const [convertInfo, setConvertInfo] = useState({
    initialType: "",
    resultType: "",
    file: null,
  });
  const [isConverting, setIsConverting] = useState(false);

  useEffect(() => {
    setIsConverting(false);
  }, [convertInfo]);

  useEffect(() => {
    const btn = document.getElementById("convert-btn");
    if (isConverting) btn.innerText = "Converting...";
    else btn.innerText = "Convert";
  }, [isConverting]);
  return (
    <div className="container-sm w-50 pt-5 vh-100">
      <div className="card border-3 shadow h-75">
        <div className="card-body d-flex flex-column justify-content-center align-items-center">
          <ConvertContext.Provider
            value={{
              ...convertInfo,
              setConvertInfo: setConvertInfo,
              isConverting: isConverting,
              setIsConverting: setIsConverting,
            }}
          >
            <ConvertTitle />
            <form
              className="w-100 px-5 card-text"
              onSubmit={async (ev) => {
                ev.preventDefault();
                setIsConverting(true); //prevents multiple requests while one is ongoing
                try {
                const result = await fetchConverterApi(convertInfo);
                const buffer = await base64ToArrayBuffer(result.Files[0].FileData);
                  console.log(result)
console.log(buffer.subarray(0, 50));
                downloadFile(buffer, result.Files[0].FileName);
                } catch(err) {
                  console.log(err)
                  window.alert('We cannot process that conversion. Please try again later')
                } finally {
                  setIsConverting(false)
                }
              }}
              id="convert-form"
            >
              <ConvertTypeInput />
              <FilePreview />  
              <ConvertInput />
              <SubmitBtn />
            </form>
          </ConvertContext.Provider>
          <a
            id="download-button"
            className="btn btn-lg btn-outline-primary mt-2 disabled"
          >
            Download Button
          </a>
        </div>
      </div>
    </div>
  );
}
function base64ToArrayBuffer(base64) {
  const binary = window.atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}
function downloadFile(data, fileName) {
  const blob = new Blob([data], { type: "application/pdf" });
  const link = document.getElementById("download-button");
  link.classList.remove('disabled')
  link.href = window.URL.createObjectURL(blob);
  link.download = fileName;
  link.click();
}
