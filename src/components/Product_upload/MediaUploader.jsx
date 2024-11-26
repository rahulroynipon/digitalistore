import { useTheme } from "@emotion/react";
import { useState, useEffect } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ClearIcon from "@mui/icons-material/Clear";
import { ErrorMessage } from "formik";

export default function MediaUploader({
  setFieldValue,
  values,
  isSubmitting,
  reset,
}) {
  const [selectedImages, setSelectedImages] = useState([]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) =>
      Object.assign(file, { preview: URL.createObjectURL(file) })
    );

    const updatedImages = [...selectedImages, ...newImages];
    setSelectedImages(updatedImages);
    setFieldValue("images", [...values.images, ...files]);
  };

  const handleRemoveImage = (index) => {
    let updatedImages = selectedImages.filter(
      (_, imgIndex) => imgIndex !== index
    );
    setSelectedImages(updatedImages);

    updatedImages = values.images.filter((_, i) => i !== index);
    setFieldValue("images", updatedImages);
  };

  useEffect(() => {
    setSelectedImages([]);
  }, [reset, isSubmitting]);

  const theme = useTheme();
  const fieldColor = theme.palette.background.paper;
  const borderColor = theme.palette.divider;

  return (
    <div className="mt-6">
      <label className="mb-5 text-2xl inline-block font-semibold opacity-85">
        Media
      </label>
      <div>
        <input
          type="file"
          id="images"
          name="images"
          accept="image/*"
          multiple
          className="hidden"
          onChange={handleImageChange}
          disabled={isSubmitting}
        />
        <label
          htmlFor="images"
          style={{
            backgroundColor: fieldColor,
            borderColor: `${borderColor}`,
          }}
          className="h-32 flex items-center justify-center border rounded cursor-pointer"
        >
          <div className="flex flex-col items-center justify-center opacity-60">
            <CloudUploadIcon />
            <p>Upload photos</p>
          </div>
        </label>

        <ErrorMessage
          name="images"
          component="div"
          className="text-red-500 text-xs mt-1"
        />
      </div>

      {selectedImages.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-4">
          {selectedImages.map((image, index) => (
            <div key={index} className="relative w-32 h-32">
              <img
                src={image.preview}
                alt={`Preview ${index}`}
                className="w-full h-full object-cover rounded shadow"
              />
              <button
                type="button"
                disabled={isSubmitting}
                onClick={() => handleRemoveImage(index)}
                className="bg-red-600 rounded-full absolute -right-2 -top-3 text-white h-5 w-5 flex items-center justify-center"
              >
                <ClearIcon style={{ fontSize: "16px" }} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
