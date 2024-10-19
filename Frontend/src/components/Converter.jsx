import { useState } from "react";
import { ConvertContext } from "./../utils/context/ConvertContext.js";
import ConvertTitle from "./ConvertTitle.jsx";
import ConvertInput from "./ConvertInput.jsx";
import ConvertTypeInput from "./ConvertTypeInput.jsx";
import dotenv from "dotenv";
dotenv.config();
export default function Converter() {
  const [convertInfo, setConvertInfo] = useState({
    initialType: "",
    resultType: "",
    file: {},
  });

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
          onSubmit={(ev) => {
            ev.preventDefault();
            console.log(convertInfo.file);
            const res = fetch(
              `https://v2.convertapi.com/convert/${convertInfo.initialType}/to/${convertInfo.resultType}/?auth=${process.env.AUTH_KEY}`,
            );
          }}
        >
          <ConvertTypeInput />
          <ConvertInput />
        </form>
      </ConvertContext.Provider>
      <button onClick={() => console.log(convertInfo)}>Log state</button>
    </div>
  );
}
