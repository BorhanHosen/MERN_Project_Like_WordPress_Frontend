class ImageUploadAdapter {
  constructor(loader) {
    // The file loader instance to handle the upload process.
    this.loader = loader;
  }

  // Starts the upload process.
  upload() {
    return this.loader.file.then(
      (file) =>
        new Promise((resolve, reject) => {
          // Prepare form data for the upload request.
          const data = new FormData();
          data.append("file", file);

          // Make an AJAX request to the server.
          const xhr = new XMLHttpRequest();
          xhr.open("POST", "http://localhost:8000/api/post/upload");

          xhr.onload = function () {
            if (xhr.status === 200) {
              // Parse the response JSON.
              const response = JSON.parse(xhr.responseText);

              // Check if the response contains the URL.
              if (response.url) {
                // Resolve the uploaded file's URL.
                resolve({
                  default: response.url,
                });
              } else {
                // Reject the upload promise if the response does not contain the URL.
                reject("Invalid server response");
              }
            } else {
              // Reject the upload promise if an error occurred.
              reject(xhr.statusText);
            }
          };

          xhr.onerror = function () {
            reject(xhr.statusText);
          };

          xhr.send(data);
        })
    );
  }

  // Aborts the upload process.
  abort() {
    // TODO: implement aborting the upload.
  }
}

export default ImageUploadAdapter;
