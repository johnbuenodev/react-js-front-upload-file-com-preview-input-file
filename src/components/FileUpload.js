import React, {useState} from 'react'
import axios from 'axios';

const FileUpload = () => {

  const [event,setEvent] = useState('');
  const [fileName, setFileName] = useState('');
  const [fakePath, setFakePath] = useState('');
  /*
  dps fileObj : {
    file: "",
    fileName: "" 
  }
  */
  const [file, setFile] = useState('');
  const [uploadedFile, setUploadedFile] = useState({});
  
  const onchangeFile = (e) => {
    e.preventDefault();
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);

    const tmppath = URL.createObjectURL(e.target.files[0]);
    const fakePathValue = document.getElementById("inputFile").value;
    setFakePath(tmppath);
    console.log(tmppath);
    
    console.log(fakePathValue);
  }

  const onSubmitAction = async (e) => {
   e.preventDefault();
   const formData = new FormData();
   
   //file nome do atributo no backend
   //name
   formData.append('event', event);
    
   //passar dados: type e size e nameFile no backend pelo file
   //type
   //size
   //nameFile
   formData.append('file', file);
   
   try {
    //baseurl in proxy
    const response = await axios.post('/uploads', formData, {
      
      headers: {
        'Content-Type': 'multipart/form-data'
      },

    });

    //res do backend
    const { fileName, filePath } = response.data;
    console.log(fileName);
    console.log(filePath);
    setUploadedFile({fileName: fileName, filePath:filePath});

   } catch (error) {
    console.log(error);
    
     if(error.response.status === 500) {
      console.log('Ocorreu um problema no servidor!');
     } else {
      console.log(error.response.data.msg);
     }

   }

   setFileName('');
   setFile('');
  }

  const onImgLoad = () => {
    const img = document.getElementById('newImageUpload'); 
    const width = img.clientWidth;
    const height = img.clientHeight;
    console.log(width);
    console.log(height);
  };

  //accept="image/*" se for varios arquivos  -  multiple *precisando tratar no backend
  return (
    <>
     <form onSubmit={onSubmitAction} id="uploadForm" encType="multipart/form-data">
      <div className="input-group mb-4">
       <input type="file" className="form-control" id="inputFile" accept='image/png' onClick={() => setUploadedFile('')} onChange={onchangeFile} />
      </div>

      { fileName ?
      <div className="row mt-5">
      <div className="col-md6 m-auto center">
       <h3 className="text-center">{fileName}</h3>
       <img id="newImageUpload" onLoad={() => onImgLoad()} src={fakePath} alt={fileName} style={{width:'auto',height:'auto',objectFit:'cover'}} />
      </div>
     </div> : null }
      <div className="d-grid gap-2">
       <button type="submit" disabled={fileName !== '' ? false : true} className="btn btn-outline-dark">Upload File</button>
      </div>

      {
        uploadedFile.fileName ?
         <div className="row mt-5">
          <div className="col-md6 m-auto center">
           <h3 className="text-center">{uploadedFile.fileName}</h3>
           <img src={uploadedFile.filePath} alt={uploadedFile.fileName} style={{width:'100%',height:'500px',objectFit:'contain'}} />
          </div>
         </div>
        : null
      }
      
     </form>
    </>
  )
}

export default FileUpload;