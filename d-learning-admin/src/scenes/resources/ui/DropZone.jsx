import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import Service from '../../../service/ResourceServices';

export default function Dropzone({ sucode }) {
    const onDrop = useCallback(acceptedFiles => {
        const file = acceptedFiles[0];
        console.log(file);
        const data = new FormData();
        data.append("file", file);
        
        const upload = async ()=> await Service.UploadResource(sucode,data);
        upload();

    }, [])
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    return (
        <div style={{
            width: "90%",
            height: "90%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderStyle:"dotted",
            backgroundSize:" contain",
            backgroundRepeat: "no-repeat",
            opacity: "0.6",
            backgroundPosition:" center",
            backgroundImage: 'url("https://cdn0.iconfinder.com/data/icons/leto-cloud-computing/64/folder_backup_cloud-512.png")'
        }}>
            <div style={{
                    height: "100%",
                    display: "flex",
                    alignItems: "flex-end",
            }} {...getRootProps()}>
            <input {...getInputProps()} />
            {
                isDragActive ?
                    <p>Drop the files here ...</p> :
                    <p>Drag 'n' drop some files here, or click to select files</p>
            }
        </div>
        </div>
    )
}