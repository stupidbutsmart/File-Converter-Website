import { useContext } from "react";
import { ConvertContext } from "../utils/context/ConvertContext";

export default function ConvertInput() {
  const { setConvertInfo } = useContext(ConvertContext);
  return (
    <>
      <label htmlFor="file-input">Upload File</label>
      <br />
      <input
        type="file"
        id="file-input"
        name="file-input"
        onChange={(ev) => {
          const fileType = ev.target.files[0].name.split(".").pop();
          setConvertInfo((currentState) => ({
            ...currentState,
            file: ev.target.files[0],
            initialType: fileType,
            resultType: "",
          }));
        }}
      />
    </>
  );
}
