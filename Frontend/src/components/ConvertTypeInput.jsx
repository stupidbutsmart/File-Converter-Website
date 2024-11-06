import { useContext, useEffect, useState } from "react";
import { ConvertContext } from "../utils/context/ConvertContext";
import Flags from "./Flags";
import "../styles/types.css";
const fileConversionMap = {
  txt: ["pdf", "docx", "csv", "json", "xml"],
  docx: ["pdf", "txt", "html"],
  pdf: ["docx", "txt", "jpg", "png", "html", "pptx"],
  csv: ["xlsx", "json", "txt", "xml"],
  json: ["csv", "xml", "txt"],
  xml: ["json", "csv", "txt"],
  xlsx: ["csv", "pdf", "json"],
  jpg: ["png", "pdf"],
  png: ["jpg", "pdf"],
  gif: ["jpg", "png"],
  mp4: ["gif"],
  mp3: ["wav"],
  wav: ["mp3"],
  html: ["pdf", "docx", "txt"],
  pptx: ["pdf", "jpg", "png"],
};
export default function ConvertTypeInput() {
  const { setConvertInfo, initialType, resultType } =
    useContext(ConvertContext);
  const [similarFlag, setSimilarFlag] = useState(false);
  const [convertFlag, setConvertFlag] = useState(false);
  const TYPES_EXIST = initialType !== "" && resultType !== "";
  const SIMILAR_TYPES = TYPES_EXIST && initialType == resultType;
  const CAN_CONVERT =
    TYPES_EXIST &&
    fileConversionMap[initialType] &&
    fileConversionMap[initialType].includes(resultType);
  const CANNOT_CONVERT = !Object.prototype.hasOwnProperty.call(
    fileConversionMap,
    initialType
  );
  useEffect(() => {
    if (!initialType || CANNOT_CONVERT) {
      document.getElementById("result-type").setAttribute("disabled", true);
    } else document.getElementById("result-type").removeAttribute("disabled");
    if (SIMILAR_TYPES) {
      setSimilarFlag(true);
    } else setSimilarFlag(false);

    if (!CAN_CONVERT) {
      setConvertFlag(true);
    } else setConvertFlag(false);

    if (CANNOT_CONVERT && initialType !== "") {
      return window.alert(`We are unable to convert .${initialType} files`);
    }
  }, [SIMILAR_TYPES, CAN_CONVERT, CANNOT_CONVERT, initialType]);

  return (
    <div className="d-flex justify-content-center align-items-center my-3">
      {similarFlag ? <Flags error="Both types cannot be the same" /> : null}
      {convertFlag && TYPES_EXIST ? (
        <Flags error={`${initialType} cannot be converted to ${resultType}`} />
      ) : null}
      <label htmlFor="initial-type"></label>
      <input
        type="text"
        id="initial-type"
        className="d-none"
        value={initialType || "hi"}
        disabled
        onChange={(ev) => {
          setConvertInfo((currentState) => ({
            ...currentState,
            initialType: ev.target.value,
            resultType: "",
          }));
        }}
      />
      <label htmlFor="result-type"></label>
      <span className="my-auto">
        Converting
        <div className="init-type">
          <span>
            {initialType || (
              <div dangerouslySetInnerHTML={{ __html: "&nbsp" }} />
            )}
          </span>
        </div>
        To
      </span>
      <select
        id="result-type"
        value={resultType}
        className="form-select w-25 ms-1"
        onChange={(ev) => {
          setConvertInfo((currentState) => ({
            ...currentState,
            resultType: ev.target.value,
          }));
        }}
      >
        <option value="" hidden></option>
        {fileConversionMap[initialType]
          ? fileConversionMap[initialType].map((type) => {
              return (
                <option value={type} key={type}>
                  {type}
                </option>
              );
            })
          : Object.keys(fileConversionMap).map((type) => {
              return (
                <option value={type} key={type}>
                  {type}
                </option>
              );
            })}
      </select>
    </div>
  );
}
