import { useContext } from "react";
import { ConvertContext } from "../utils/context/ConvertContext";

export default function ConvertInput() {
  const { setConvertInfo , setIsConverting , isConverting } = useContext(ConvertContext);
  return (
    <div>
      <label
        htmlFor="file-input"
        className="h4 text-center d-block m-0"
      ></label>
      <br />
      <div className="d-flex justify-content-center">
        <button
          className="btn btn-lg btn-primary"
          type="button"
          id='mock-btn'
          disabled={isConverting}
          onClick={() => {
            document.getElementById("file-input").click();
          }}
        >
          Upload File
        </button>
      </div>
      <input
        type="file"
        id="file-input"
        name="file-input"
        title=""
        className="d-none"
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
    </div>
  );
}
