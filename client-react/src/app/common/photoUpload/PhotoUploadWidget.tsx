import {Button, Grid, Header} from "semantic-ui-react";
import PhotoDropzone from "./PhotoDropzone";
import {useEffect, useState} from "react";
import PhotoCropper from "./PhotoCropper";
import IF from "../IF";

interface Props {
  uploadPhoto: (file: Blob) => void;
  loading: boolean;
}

const PhotoUploadWidget = ({uploadPhoto, loading}: Props) => {
  const [files, setFiles] = useState<any>([]);
  const [cropper, setCropper] = useState<Cropper>();
  const onCrop = () => {
    if (cropper) {
      cropper.getCroppedCanvas().toBlob(blob => uploadPhoto(blob!))
    }
  }
  useEffect(() => {
    return () => {
      files.forEach((file: any) => URL.revokeObjectURL(file.preview))
    }
  }, [files]);
  return (
    <Grid>
      <Grid.Column width={4}>
        <Header sub color='teal' content='Step 1 - Add Photo'/>
        <PhotoDropzone setFiles={setFiles}/>
      </Grid.Column>
      <Grid.Column width={1}/>
      <Grid.Column width={4}>
        <Header sub color='teal' content='Step 2 - Resize Photo'/>
        {files && files.length > 0 &&
            <PhotoCropper setCropper={setCropper} imagePreview={files[0].preview}/>
        }
      </Grid.Column>
      <Grid.Column width={1}/>
      <Grid.Column width={4}>
        <Header sub color='teal' content='Step 3 - Review & Upload'/>
        <IF when={files && files.length > 0}>
          <div className='img-preview' style={{minHeight: 200, overflow: 'hidden'}}/>
          <Button.Group widths={2}>
            <Button loading={loading} onClick={onCrop} positive icon='check'/>
            <Button disabled={loading} onClick={() => setFiles([])} icon='close'/>
          </Button.Group>
        </IF>
      </Grid.Column>
    </Grid>
  );
}

export default PhotoUploadWidget;