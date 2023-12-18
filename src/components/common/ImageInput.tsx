import { forwardRef, useImperativeHandle, useState } from "react";
import { styled } from "@mui/material/styles";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import { Typography } from "@mui/material";

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
  multiple?: boolean;
}

const ImageInput = forwardRef(({ title, multiple = false }: ImageInputProps, ref) => {
  const [selectedImages, setSelectedImages] = useState<File[]>([]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files) {
      if (multiple) {
        const selectedFiles = Array.from(files);
        const uniqueFiles = selectedFiles.filter(file => !selectedImages.some(existingFile => existingFile.name === file.name));

        setSelectedImages([...selectedImages, ...uniqueFiles]);
      } else {
        setSelectedImages([...files]);
      }
    }
  };

  const handleDeleteImage = (index: number) => {
    const updatedImages = [...selectedImages];
    updatedImages.splice(index, 1);
    setSelectedImages(updatedImages);
  };

  useImperativeHandle(ref, () => ({
    getImages: () => selectedImages
  }));

  const uniqueId = String(Math.random());

  return (
    <Box sx={{ border: "1px solid #bbb", borderRadius: 1, padding: 2, mt: 2, mb: 1 }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 5 }}>
        {title && <Typography>{title}</Typography>}
        <label htmlFor={uniqueId} style={{ display: "flex", alignItems: "center" }}>
          <Input id={uniqueId} type='file' inputProps={{ multiple }} onChange={handleImageChange} sx={{ display: "none" }} />
          <Button variant='outlined' component='span' endIcon={<CloudUploadIcon sx={{ mr: 2 }} />} sx={{ marginLeft: 5 }}>
            انتخاب تصویر
          </Button>
          <span style={{ fontSize: 13 }}>{selectedImages.length > 0 ? `${selectedImages.length} تصویر انتخاب شده` : "تصویری انتخاب نشده"}</span>
        </label>
      </Box>

      <Box sx={{ display: "flex", marginTop: 3, flexWrap: "wrap", gap: 1 }}>
        {selectedImages.map((image, index) => (
          <ThumbnailContainer key={index}>
            <Thumbnail src={URL.createObjectURL(image)} alt={`Thumbnail ${index + 1}`} />
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
