import { useEffect, useState } from "react";
import { ConvertContext } from "./../utils/context/ConvertContext.js";
import ConvertTitle from "./ConvertTitle.jsx";
import ConvertInput from "./ConvertInput.jsx";
import ConvertTypeInput from "./ConvertTypeInput.jsx";
import { fetchConverterApi } from "../utils/hooks/fetchConverterApi.js";
export default function Converter() {
  const [convertInfo, setConvertInfo] = useState({
    initialType: "",
    resultType: "",
    file: {},
  });
  const [isConverting, setIsConverting] = useState(false);

  useEffect(() => {
    setIsConverting(false);
  }, [convertInfo]);

  useEffect(() => {
    const btn = document.getElementById('convert-btn')
    if(isConverting) btn.innerText = 'Converting...'
    else btn.innerText = 'Convert'
  } , [isConverting])
  const ALL_INPUTS_FILLED =
    convertInfo.initialType && convertInfo.resultType && convertInfo.file;
  const DIFFERENT_TYPES = convertInfo.initialType !== convertInfo.resultType;
  return (
    <div>
      <ConvertContext.Provider
        value={{
          ...convertInfo,
          setConvertInfo: setConvertInfo,
        }}
      >
        <ConvertTitle />
        <form
          onSubmit={async (ev) => {
            ev.preventDefault();
            setIsConverting(true); //prevents multiple requests while one is ongoing
            const result = await fetchConverterApi(convertInfo);
            const buffer = base64ToArrayBuffer(result.Files[0].FileData);
            downloadFile(buffer);
          }}
          id="convert-form"
        >
          <ConvertTypeInput />
          <ConvertInput />
          {ALL_INPUTS_FILLED && DIFFERENT_TYPES && !isConverting ? (
            <button type="submit" id="convert-btn">
              Convert
            </button>
          ) : (
            <button type="submit" id="convert-btn" disabled>
              Convert
            </button>
          )}
        </form>
      </ConvertContext.Provider>
      <a id="download-button">Download Button</a>
    </div>
  );
}
function base64ToArrayBuffer(base64) {
  const binary = window.atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes.buffer;
}
function downloadFile(data) {
  const blob = new Blob([data], { type: "mimeType" });
  const link = document.getElementById("download-button");
  link.href = window.URL.createObjectURL(blob);
  link.download = data.Files[0].FileName;
  link.click();
}
