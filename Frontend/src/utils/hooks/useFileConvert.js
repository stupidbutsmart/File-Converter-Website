import convert from "convertapi";
import { useEffect } from "react";

const fileConverter = convert("WLetOSRj7G1W1woR");

export function useFileConvert(convertInfo) {
  useEffect(() => {
    fileConverter
      .convert(
        convertInfo.resultType,
        { File: convertInfo.file },
        convertInfo.initialType,
      )
      .then((res) => {
        console.log(res);
      });
    return;
  });
  return;
}
