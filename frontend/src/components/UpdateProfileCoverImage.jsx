import { useEffect, useRef, useState } from "react";
import { useUpdateUser } from "../hooks/useUpdateUser";

// icons
import { RxCross1 } from "react-icons/rx";
import { AiOutlinePlus } from "react-icons/ai";

// components
import Loading from "./Loading";
import Error from "./Error";

const UpdateProfileCoverImage = ({
  userProfile,
  setUserProfile,
  setIsUpdateCoverImage,
}) => {
  const [previewSource, setPreviewSource] = useState("");
  const { updateUser, isPending, error } = useUpdateUser(
    `${import.meta.env.VITE_API_URL}/users/profile_cover_image`  
  );

  useEffect(() => {
    const initiliazeUserData = () => {
      if (userProfile.coverImg) {
        setPreviewSource(userProfile.coverImg.url);
      }
    };

    initiliazeUserData();
  }, []);

  const inputRef = useRef(null);

  const handleImageChange = (e) => {
    e.preventDefault();
    const image = e.target.files[0];
    previewImage(image);
  };

  const previewImage = (image) => {
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const uploadImage = async (imageUrl) => {
    const updated_user = await updateUser({ imageUrl });

    if (!error) {
      setUserProfile(updated_user);
      setIsUpdateCoverImage(false);
    }
  };

  return (
    <article className="absolute left-1/2 top-1/2 z-20 flex w-[80%] -translate-x-1/2 -translate-y-1/2 flex-col gap-4  rounded-lg bg-white p-2 shadow-lg sm:w-[480px] sm:p-4">
      <header className="flex items-center justify-center border-b-[1px] border-zinc-200 pb-3">
        <h3 className="mx-auto text-xl font-semibold sm:text-2xl">
          {" "}
          Edit Cover Image{" "}
        </h3>
        <div
          className=" flex cursor-pointer items-center justify-center p-2"
          onClick={() => {
            setIsUpdateCoverImage(false);
          }}
        >
          <RxCross1 className="text-xl text-zinc-600 " />
        </div>
      </header>

      <section>
        {previewSource ? (
          <div className="relative flex h-[250px] w-full items-center justify-center rounded border-[1px] border-dotted border-zinc-300 bg-zinc-100/10 sm:h-[300px] ">
            <img
              src={previewSource}
              alt="Cover Preview"
              className="object-fit h-[200px] w-[200px] rounded-full sm:h-[250px] sm:w-[250px]"
            />
            <div
              className="absolute right-2 top-2 flex cursor-pointer items-center justify-center rounded-full bg-zinc-100 p-2 hover:bg-zinc-200"
              onClick={() => setPreviewSource("")}
            >
              <RxCross1 className="text-xl text-zinc-600 " />
            </div>
          </div>
        ) : (
          <span className="flex items-center justify-center rounded border-[1px] border-dotted border-zinc-300 bg-zinc-100/10 py-3">
            No image added
          </span>
        )}
      </section>

      <footer className="flex justify-between">
        <input
          type="file"
          name="myImage"
          accept="image/*"
          onChange={(e) => {
            handleImageChange(e);
          }}
          ref={inputRef}
          className="hidden"
        />
        <button
          className="flex items-center gap-2 rounded border-[1px] border-teal-600 bg-white px-1.5 py-2 text-sm font-semibold text-[#101828] sm:px-4 sm:text-base"
          onClick={() => {
            inputRef.current.click();
          }}
        >
          <AiOutlinePlus className="text-teal-600" />

          <span> Upload Image </span>
        </button>
        <button
          className="flex items-center justify-center rounded bg-teal-600 px-1.5 py-2 text-sm font-semibold text-white sm:px-4 sm:text-base"
          onClick={() => {
            uploadImage(previewSource);
          }}
        >
          {isPending && <Loading loadingColor={"white"} loadingSize={20} />}
          {error && <Error error={error} />}
          {!isPending && !error && <span> Save Changes </span>}
        </button>{" "}
      </footer>
    </article>
  );
};

export default UpdateProfileCoverImage;
