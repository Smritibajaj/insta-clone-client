import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PostComponent = (props) => {
  console.log(props);
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const handleValue = (e) => {
    const { value } = e.target;
    setInput(value);
  };
  const { post, updateLink } = props;

  return (
    <div key={post.id} className="p-4">
      <div className="my-2">{post.caption}</div>
      <img src={post.media_url} />
      <div className="my-2">
        {post.link ? (
          <button
            className="my-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={() => {
              navigate(`${post.link}`);
            }}
          >
            Visit
          </button>
        ) : (
          <form>
            <label className="block text-gray-700 text-sm mb-2" htmlFor="link">
              Link
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="link"
              type="text"
              name="link"
              placeholder="please choose post link"
              value={input}
              onChange={handleValue}
            />
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={(e) => updateLink(e, post.id, "link", input)}
            >
              Submit
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

const Instagram = () => {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const username = localStorage.getItem("username");
  useEffect(() => {
    axios
      .get(`https://instagram-clone1-app.herokuapp.com/v1/post/all/${username}`)
      .then((res) => {
        console.log(res.data.response);
        setPosts(res.data.response);
        setLoading(false);
      })
      .catch((e) => console.log(e));
  }, []);

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
  if (loading) {
    return <div>Loading....</div>;
  }
  return (
    <>
      {posts && posts.length > 0 ? (
        <>
          <div className="flex justify-center w-full">
            <div className="max-w-sm flex flex-col justify-center">
              {posts.map((post) => (
                <PostComponent post={post} updateLink={updateLink} />
              ))}
            </div>
          </div>
        </>
      ) : (
        <div>No data found</div>
      )}
    </>
  );
};

export default Instagram;
