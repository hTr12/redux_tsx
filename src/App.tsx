import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPost } from "./redux/slices/postsSlice";
import { RootState } from "./redux/store";
import Post from "./components/Post";
import backgroundImage from "./assets/background.jpg";

const App: React.FC = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state: RootState) => state.posts.posts);
  const [image, setImage] = useState<string>("");
  const [video, setVideo] = useState<string>("");

  
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
  
    const reader = new FileReader();
    reader.onloadend = () => {
      const img = new Image();
      img.src = reader.result as string;
  
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const maxWidth = 600;
        const scaleSize = maxWidth / img.width;
        canvas.width = maxWidth;
        canvas.height = img.height * scaleSize;
  
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          console.error("Failed to get canvas context.");
          return;
        }
  
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  
        const resizedImage = canvas.toDataURL("image/jpeg", 0.8);
        setImage(resizedImage);
      };
  
      img.onerror = () => console.error("Error loading the image.");
    };
  
    reader.onerror = () => console.error("Error reading the file.");
  
    reader.readAsDataURL(file);
  };
  

  const handleAddPost = () => {
    if (!image && !video) return;

    dispatch(addPost({
      id: Date.now(),
      image,
      video,
      likes: 0,
      dislikes: 0,
      comments: []
    }));

    setImage("");
    setVideo("");
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-start"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        width: "100%",
      }}
    >
      <div className="max-w-2xl mx-auto p-6 bg-white bg-opacity-90 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">📸 SocialHive</h1>

        <div className="bg-white shadow-md p-4 rounded-lg mb-6">
          <input
            type="text"
            placeholder="Image URL (optional)"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="w-full border p-2 mb-2 rounded-md"
          />
                        <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full border p-2 mb-2 rounded-md"
            />

          <button onClick={handleAddPost} className="bg-blue-600 text-white px-4 py-2 rounded-md w-full hover:bg-blue-700">
            + Add Post
          </button>
        </div>

        {posts.length > 0 ? (
          posts.map((post) => <Post key={post.id} post={post} />)
        ) : (
          <p className="text-center text-gray-600">No posts available.</p>
        )}
      </div>
    </div>
  );
};

export default App;
