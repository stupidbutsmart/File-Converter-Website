import { useContext } from "react";
import { ConvertContext } from "../utils/context/ConvertContext";

export default function ConvertTypeInput() {
  const { setConvertInfo } = useContext(ConvertContext);

  return (
    <>
      <label htmlFor="initial-type"></label>
      <select
        id="initial-type"
        onChange={(ev) => {
          setConvertInfo((currentState) => ({
            ...currentState,
            initialType: ev.target.value,
          }));
        }}
      >
        <option selected hidden disabled></option>
        <option value="pdf">pdf</option>
        <option value="docx">docx</option>
      </select>
      <label htmlFor="result-type"></label>
      <select
        id="result-type"
        onChange={(ev) => {
          setConvertInfo((currentState) => ({
            ...currentState,
            resultType: ev.target.value,
          }));
        }}
      >
        <option selected hidden disabled></option>
        <option value="pdf">pdf</option>
        <option value="docx">docx</option>
      </select>
    </>
  );
}
