const APIKEY = "WLetOSRj7G1W1woR";
export async function fetchConverterApi(convertInfo) {
  const controller = new AbortController();
  const URL = `https://v2.convertapi.com/convert/${convertInfo.initialType}/to/${convertInfo.resultType}?auth=${APIKEY}`;
  try {
    const fileData = await convertInfo.file.arrayBuffer();
    const base64FileData = arrayBufferToBase64(fileData);
    const res = await fetch(URL, {
      signal: controller.signal,
      method: "POST",
      body: JSON.stringify({
        Parameters: [
          {
            Name: "File",
            FileValue: {
              Name: convertInfo.file.name,
              Data: base64FileData,
            },
          },
        ],
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if(!res.ok) throw res
    const resBuffer = await res.json();
    return resBuffer;
  } catch (err) {
    console.log(err);
    return err 
  }
}
function arrayBufferToBase64(buffer) {
  let binary = "";
  const view = new Uint8Array(buffer);
  for (let i = 0; i < view.byteLength; i++) {
    binary += view[i].toString(2);
  }
  return window.btoa(binary);
}
