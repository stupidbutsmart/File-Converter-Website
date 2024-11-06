import { createContext } from "react";

export const ConvertContext = createContext({
  initialType: "",
  resultType: "",
  file:{}, 
  setConvertInfo: () => {},
  setConverting: () => {},
  isConverting: false
});
