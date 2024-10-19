import { useContext } from "react";
import { ConvertContext } from "../utils/context/ConvertContext";

export default function ConvertInput() {
  const { setConvertInfo, file } = useContext(ConvertContext);
  const context = useContext(ConvertContext);
  return (
    <>
      <label htmlFor="file-input">Upload File</label>
      <br />
      <input
        type="file"
        id="file-input"
        name="file-input"
        onChange={(ev) => {
          setConvertInfo((currentState) => ({
            ...currentState,
            file: ev.target.files[0],
          }));
        }}
      />

      <button onClick={() => console.log(context, file)}>Log Context</button>
      <button type="submit">Convert</button>
    </>
  );
}
