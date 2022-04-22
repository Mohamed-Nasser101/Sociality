import {Cropper} from "react-cropper";
import 'cropperjs/dist/cropper.min.css'

interface Props {
  setCropper: (cropper: Cropper) => void;
  imagePreview: string;
}

const PhotoCropper = ({setCropper, imagePreview}: Props) => {
  return (
    <Cropper
      src={imagePreview}
      onInitialized={cropper => setCropper(cropper)}
      style={{height: 200, width: '100%'}}
      initialAspectRatio={1}
      aspectRatio={1}
      preview={'.img-preview'}
      guides={false}
      viewMode={1}
      autoCropArea={1}
      background={false}
    />
  );
}

export default PhotoCropper;