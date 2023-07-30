import usePosts from "../hooks/usePosts";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { AiOutlineLoading3Quarters as LoaderSpin} from "react-icons/ai";

export const PostForm = () => {
  const { createPost, getPost, updatePost } = usePosts();
  const navigate = useNavigate();
  const params = useParams();
  const [post, setPost] = useState({
    title: "",
    description: "",
    image:null
  });

  useEffect(() => {
    (async () => {
      if (params.id) {
        const post = await getPost(params.id);
        setPost(post);
      }
    })();
  }, [params,getPost]);

  return (
    <div className="flex items-center justify-center">
      <div className="bg-zinc-800 p-10 shadow-md shadow-black">
        <header className="text-white flex justify-between items-center py-4">
          <h3 className="text-xl">New Post</h3>
          <Link to='/' className="text-gray-400 text-sm hover:text-gray-300">Go Back</Link>
        </header>
        <Formik
          initialValues={post}
          validationSchema={Yup.object({
            title: Yup.string().required("Title is Required"),
            description: Yup.string().required("Description is Required")
          })}
          onSubmit={(values, actions) => {
            if (params.id) updatePost(params.id, values);
            else createPost(values);
            navigate("/");
            actions.setSubmitting(false);
          }}
          enableReinitialize
        >
          {({ handleSubmit, setFieldValue, isSubmitting }) => (
            <Form onSubmit={handleSubmit}>
              <label
                htmlFor="title"
                className="text-sm block font-bold text-gray-400"
              >
                Title
              </label>
              <Field
                className="mb-4 px-3 py-2 focus:outline-none rounded-lg bg-gray-600 text-white w-full"
                name="title"
                placeholder="title"
              />
              <ErrorMessage
                component="p"
                className="text-red-400 text-sm"
                name="title"
              />
              <label
                htmlFor="description"
                className="text-sm block font-bold text-gray-400"
              >
                Description
              </label>
              <Field
                component="textarea"
                rows={4}
                className="mb-4 px-3 py-2 focus:outline-none rounded-lg bg-gray-600 text-white w-full"
                name="description"
                placeholder="description"
              />
              <ErrorMessage
                component="p"
                className="text-red-400 text-sm"
                name="description"
              />
              <label
                htmlFor="image"
                className="text-sm block font-bold text-gray-400"
              >
                Image
              </label>
              <input type="file" name="image" className="px-3 py-2 focus:outline-none rounded bg-gray-600  text-white w-full" onChange={(e) => setFieldValue('image',e.target.files[0])}/>
              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded mt-2 text-white focus:outline-none disabled:bg-indigo-400"
                disabled={isSubmitting}
              >
                {isSubmitting ? <LoaderSpin className='animate-spin h-5 w-5'/> : 'Save'}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
