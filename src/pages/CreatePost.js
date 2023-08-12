import { Alert, Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getToken } from "../services/LocalStorageService";
import { useCreatePostMutation } from "../services/PostApi";
import Editor from "ckeditor5-custom-build/build/ckeditor";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import config from "ckeditor5-custom-build/src/config";
import ImageUploadAdapter from "ckeditor5-custom-build/src/ImageUploadAdapter";
const CreatePost = () => {
  const [Post_Title, setPost_Title] = useState("");
  const [Post_Category, setPost_Category] = useState("");
  const [Post_Description, setPost_Description] = useState("");
  const [Post_Thumbnail, setPost_Thumbnail] = useState("");
  const [selectedName, setSelectedName] = useState("No file selected...");

  const token = getToken();

  const handleFileChange = (event) => {
    const Post_Thumbnail = event.target.files[0];
    setPost_Thumbnail(Post_Thumbnail);
    setSelectedName(Post_Thumbnail.name);
  };

  const [error, setError] = useState({
    status: false,
    msg: "",
    type: "",
  });
  const [CreatePost] = useCreatePostMutation();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("Post_Title", Post_Title);
    formData.append("Post_Category", Post_Category);
    formData.append("thumbnail", Post_Thumbnail);
    formData.append("Post_Description", Post_Description);

    if (Post_Title && Post_Category && Post_Thumbnail && Post_Description) {
      const res = await CreatePost({ token, formData });
      console.log(res);

      setError({
        status: true,
        msg: "Create Post Successful",
        type: "success",
      });
      navigate("/allpost");
    } else
      setError({ status: true, msg: "All Feilds Are Required", type: "error" });
  };
  return (
    <Box
      height="100%"
      display="flex"
      justifyContent="center"
      alignItems="flex-start"
    >
      <Box sx={{ width: 600, p: 5, backgroundColor: "white" }}>
        <Typography
          sx={{ fontWeight: "bold", fontSize: 30, textAlign: "center" }}
        >
          Create Post
        </Typography>
        <Box
          component="form"
          noValidate
          sx={{ mt: 1 }}
          id="create-post"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          <TextField
            required
            margin="normal"
            fullWidth
            name="Post_Title"
            label="Post Title"
            onChange={(e) => setPost_Title(e.target.value)}
          />
          <TextField
            required
            margin="normal"
            fullWidth
            name="Post_Category"
            label="Post_Category"
            onChange={(e) => setPost_Category(e.target.value)}
          />
          <input
            className="thumbnail"
            type="file"
            onChange={handleFileChange}
            id="thumbnail"
            name="thumbnail"
          />
          <div className="inputdiv">
            <label htmlFor="thumbnail" className="thumbnailInput">
              Select File
            </label>
            <label htmlFor="thumbnail" className="thumbnailLabel">
              {selectedName}
            </label>
          </div>
          {/* <TextField
            required
            margin="normal"
            fullWidth
            name="Post_Description"
            label="Post_Description"
            onChange={(e) => setPost_Description(e.target.value)}
          /> */}
          <CKEditor
            editor={Editor}
            config={config}
            data={Post_Description}
            onReady={(editor) => {
              editor.plugins.get("FileRepository").createUploadAdapter = (
                loader
              ) => {
                return new ImageUploadAdapter(loader, editor);
              };
            }}
            onChange={(event, editor) => {
              const data = editor.getData();
              setPost_Description(data);
              console.log({ data });
            }}
            onBlur={(event, editor) => {
              console.log("Blur.", editor);
            }}
          />

          <Box textAlign="center">
            <Button
              type="submit"
              variant="contained"
              sx={{ mt: 3, mb: 2, px: 5 }}
            >
              Create Post
            </Button>
          </Box>
          {error.status ? <Alert severity={error.type}>{error.msg}</Alert> : ""}
        </Box>
        <Box dangerouslySetInnerHTML={{ __html: Post_Description }} />
      </Box>
    </Box>
  );
};

export default CreatePost;
