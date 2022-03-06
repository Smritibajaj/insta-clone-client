import React, { useEffect, useState } from "react";
import axios from "axios";
import { Route, Outlet, Routes, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Post = () => {
  const [posts, setPosts] = useState();
  const { link } = useParams();
  const [loading, setLoading] = useState(true);
  const username = localStorage.getItem("username");
  useEffect(() => {
    console.log(link);
    axios
      .get(`https://instagram-clone1-app.herokuapp.com/v1/post/all/${username}`)
      .then((res) => {
        console.log(res.data.response);
        setPosts(res.data.response);
        setLoading(false);
      })
      .catch((e) => console.log(e));
  }, []);

  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const handleValue = (e) => {
    const { value } = e.target;
    setInput(value);
  };

  const updateLink = (e, id, name, value) => {
    e.preventDefault();
    axios
      .put(`https://instagram-clone1-app.herokuapp.com/v1/post/update/${id}`, {
        [name]: value,
      })
      .then((res) => {
        console.log(res);
        const updatedPosts = posts.map((post) => {
          if (post.id === id) {
            return { ...post, [name]: value };
          }
          return post;
        });
        setPosts(updatedPosts);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
      });
  };
  const filterpost = posts?.filter((post) => post.link === link);
  const post = filterpost && filterpost[0];
  console.log(post);
  if (loading) {
    return <div>Loading....</div>;
  }
  return (
    <div className="flex justify-center w-full">
      <div className="max-w-sm flex flex-col justify-center">
        {post && (
          <div key={post.id} className="p-4">
            <div className="my-2">{post.caption}</div>
            <img src={post.media_url} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Post;
