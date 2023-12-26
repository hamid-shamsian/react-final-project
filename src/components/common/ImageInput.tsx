import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { styled } from "@mui/material/styles";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import config from "../../../config.json";

const ThumbnailContainer = styled("div")({
  position: "relative",
  display: "inline-block",
  border: "1px solid #888",
  borderRadius: 5,
  overflow: "hidden",

  "&:hover .deleteIcon": {
    display: "flex"
  }
});

const Thumbnail = styled("img")(({ theme }) => ({
  width: theme.spacing(8),
  height: theme.spacing(8),
  display: "flex", // just for that weird bottom padding...
  objectFit: "cover"
}));

const DeleteIconButton = styled("div")(({ theme }) => ({
  position: "absolute",
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  display: "none",
  color: theme.palette.error.main,
  backgroundColor: "#fffa",
  cursor: "pointer",
  justifyContent: "center",
  alignItems: "center"
}));

interface ImageInputProps {
  title?: string;
  images?: string[];
  path: string;
  max?: number;
}

interface ExtendedFile extends File {
  new?: boolean;
}

const downloadImages = async (images: string[], path: string): Promise<File[]> => {
  const filePromises = images.map(async image => {
    try {
      const imageURL = `${config.BACKEND_BASE_URL}/images/products/${path}/${image}`;

      // TODO: change line below and use axios (httpService) instead... (CORS was the issue... ---> because of proxy...)
      const response = await fetch(imageURL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "image"
        }
      });

      const blob = await response.blob();

      const fileName = image.split("/").pop();
      const file = fileName ? new File([blob], fileName, { type: blob.type }) : null;

      return file;
    } catch (error) {
      console.error(`Error: ${image}`, error);
      return null;
    }
  });

  const files = await Promise.all(filePromises);
  return files.filter<File>((file: File | null): file is File => file !== null); // remove if failed.
};

const ImageInput = forwardRef(({ title, images = [], path, max = 5 }: ImageInputProps, ref) => {
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [warning, setWarning] = useState(false);

  useEffect(() => {
    if (images.length) downloadImages(images, path).then(files => setSelectedImages(files));
  }, [images]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files) {
      const selectedFiles = Array.from(files);
      selectedFiles.forEach((file: ExtendedFile) => (file.new = true));
      const uniqueFiles = selectedFiles.filter(file => !selectedImages.some(existingFile => existingFile.name === file.name));

      setSelectedImages([...selectedImages, ...uniqueFiles].slice(0, max));
      setWarning(false);
    }
  };

  const handleDeleteImage = (index: number) => {
    const updatedImages = [...selectedImages];
    updatedImages.splice(index, 1);
    setSelectedImages(updatedImages);
  };

  useImperativeHandle(ref, () => ({
    getImages: () => selectedImages,
    warning: () => setWarning(true)
  }));

  const getImageURL = (image: ExtendedFile) =>
    image.new ? URL.createObjectURL(image) : `${config.BACKEND_BASE_URL}/images/products/${path}/${image.name}`;

  const uniqueId = String(Math.random());

  return (
    <Box sx={{ border: "1px solid " + (warning ? "red" : "#bbb"), borderRadius: 1, padding: 2, mb: 3 }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 5 }}>
        {title && <Typography>{title}:</Typography>}

        <label
          htmlFor={uniqueId}
          style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flex: 1 }}
          onClick={e => {
            selectedImages.length === max && e.preventDefault();
          }}
        >
          <Input id={uniqueId} type='file' inputProps={{ multiple: max > 1 }} onChange={handleImageChange} sx={{ display: "none" }} />

          <span style={{ fontSize: 13 }}>{selectedImages.length > 0 ? `${selectedImages.length} تصویر انتخاب شده` : "تصویری انتخاب نشده"}</span>

          <Button
            variant='outlined'
            component='span'
            endIcon={<CloudUploadIcon sx={{ mr: 2 }} />}
            sx={{ marginRight: 3 }}
            disabled={selectedImages.length === max}
          >
            انتخاب تصویر
          </Button>
        </label>
      </Box>

      <Box sx={{ display: "flex", marginTop: 3, flexWrap: "wrap", gap: 1 }}>
        {selectedImages.map((image, index) => (
          <ThumbnailContainer key={index}>
            <Thumbnail src={getImageURL(image)} alt={`Thumbnail ${index + 1}`} />
            <DeleteIconButton className='deleteIcon' onClick={() => handleDeleteImage(index)}>
              <DeleteIcon />
            </DeleteIconButton>
          </ThumbnailContainer>
        ))}
      </Box>
    </Box>
  );
});

export default ImageInput;
