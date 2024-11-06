import { useContext, useEffect } from "react";
import { ConvertContext } from "../utils/context/ConvertContext";
export default function SubmitBtn() {
  const {isConverting , setIsConverting , file , initialType , resultType} = useContext(ConvertContext);
  const ALL_INPUTS_FILLED = initialType && resultType && file;
  const DIFFERENT_TYPES = initialType !== resultType;

  useEffect(() => {
    setIsConverting(false);
  }, [file , initialType , resultType]);
  return (
    <div className="d-flex justify-content-center">
      {ALL_INPUTS_FILLED && DIFFERENT_TYPES && !isConverting ? (
        <button
          type="submit"
          id="convert-btn"
          className="btn btn-lg btn-success mt-2"
        >
          Convert
        </button>
      ) : (
        <button
          type="submit"
          id="convert-btn"
          className="btn btn-lg btn-success mt-2"
          disabled
        >
          Convert
        </button>
      )}
    </div>
  );
}
