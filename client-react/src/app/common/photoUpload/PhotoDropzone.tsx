﻿import {useCallback} from "react";
import {useDropzone} from "react-dropzone";
import {Header, Icon} from "semantic-ui-react";

const dzStyles = {
  border: 'dashed 3px #eee',
  borderColor: '#eee',
  borderRadius: '5px',
  paddingTop: '30px',
  textAlign: 'center' as 'center',
  height: 200
}

const dzActive = {
  borderColor: 'green'
}

interface Props {
  setFiles: (files: any) => void;
}

const PhotoDropzone = ({setFiles}: Props) => {
  const onDrop = useCallback(acceptedFiles => {
    setFiles(acceptedFiles.map((file: any) => Object.assign(file, {
      preview: URL.createObjectURL(file)
    })))
  }, []);
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop});
  return (
    <div {...getRootProps()} style={isDragActive ? {...dzStyles, ...dzActive} : dzStyles}>
      <input {...getInputProps()}/>
      <Icon name='upload' size='huge'/>
      <Header content='Drop image here'/>
    </div>
  );
}

export default PhotoDropzone;