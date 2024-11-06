import { useContext, useEffect  , useState} from "react";
import { ConvertContext } from "../utils/context/ConvertContext";
export default function FilePreview() {
  const { file } = useContext(ConvertContext);
  const [previewHTML , setPreviewHTML] = useState('')
  useEffect(() => {
    if (!file) return;
    const type = file.name.split(".").pop();
    //handle size
    if (file.size > 99999) {
      document.getElementById("file-size").innerHTML = `${
        (file.size / 1000000).toFixed(2)
      }MB`;
    } else
      document.getElementById("file-size").innerHTML = `${file.size / 1000}KB`;
    // handle icon
    switch(type) {
     
      case 'pdf':
        setPreviewHTML( '<i class="bi bi-file-earmark-pdf-fill fs-1"></i>')
        break;
      case 'doc':
      case 'docx':
        setPreviewHTML('<i class="bi bi-file-earmark-word-fill fs-1"></i>');
        break;
      case 'xls':
      case 'xlsx':
        setPreviewHTML('<i class="bi bi-file-earmark-excel-fill fs-1"></i>');
        break;
      case 'ppt':
      case 'pptx':
        setPreviewHTML('<i class="bi bi-file-earmark-ppt-fill fs-1"></i>');
        break;
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
      case 'bmp':
      case 'svg':
        setPreviewHTML('<i class="bi bi-file-earmark-image-fill fs-1"></i>');
        break;
      case 'zip':
      case 'rar':
      case '7z':
        setPreviewHTML('<i class="bi bi-file-earmark-zip-fill fs-1"></i>');
        break;
      case 'mp3':
      case 'wav':
      case 'ogg':
        setPreviewHTML('<i class="bi bi-file-earmark-music-fill fs-1"></i>');
        break;
      case 'mp4':
      case 'mov':
      case 'avi':
      case 'mkv':
        setPreviewHTML('<i class="bi bi-file-earmark-play-fill fs-1"></i>');
        break;
      case 'txt':
      case 'md':
        setPreviewHTML('<i class="bi bi-file-earmark-text-fill fs-1"></i>');
        break;
      case 'csv':
        setPreviewHTML('<i class="bi bi-file-earmark-spreadsheet-fill fs-1"></i>');
        break;
      default:
        // Default icon for unsupported or unknown file types
        setPreviewHTML('<i class="bi bi-file-earmark fs-1"></i>');
    }
  }, [file]);
  return file ? (
    <div className="card w-50 mt-2 mx-auto d-flex justfiy-content-center align-items-center flex-column">
      <div id="file-preview" 
           dangerouslySetInnerHTML={{ __html: previewHTML }}
      ></div>
      <span className="text-center">{file.name}</span>
      <span id="file-size"></span>
    </div>
  ) : (
    <></>
  );
}
