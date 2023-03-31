import { useRef, useEffect } from "react";

const Modal = function Modal({ item, defaultPic, bgHide }) {
  const popup = useRef();

  const { data } = item;

  console.log(data);

  // fermeture de la popup au click en dehors
  useEffect(() => {
    if (!popup || !popup.current) return;
    document.addEventListener("click", (event) => {
      if (!popup || !popup.current) return;
      const selectClickInside = popup.current.contains(event.target);
      if (selectClickInside) {
        bgHide();
      }
    });
  }, [popup]);

  function addDefaultPic(e) {
    e.target.src = defaultPic;
  }

  return (
    <div
      className="fixed inset-0 z-10 flex items-center justify-center py-28 min-h-screen"
      type="button"
    >
      <div
        className="absolute inset-0 w-full h-full bg-gray-700 opacity-20"
        ref={popup}
      />
      <div className="z-10 w-screen h-screen max-w-xl  overflow-x-hidden bg-DarkGray shadow-xl text-white">
        <div className="flex flex-row justify-between p-10">
          <div className="text-xl font-medium ">Detail</div>
          <svg
            onClick={() => bgHide()}
            cursor="pointer"
            xmlns="http://www.w3.org/2000/svg"
            className="text-red-400 w-7 h-7"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        {/* <div className="w-full h-px my-6 bg-gray-200" /> */}
        <div className="min-h-fit block">
          <div
            className="h-52 w-auto rounded-b-2xl"
            style={{
              backgroundImage: `url(${data.cover})`,
              backgroundSize: "cover",
            }}
          >
          </div>
          <div className="flex -mt-20 pl-7 items-end">
            <img
              src={data.thumbnail}
              alt={`Thumbnail of ${data.title}`}
              className="w-24 h-auto rounded-2xl"
              onError={addDefaultPic}
            />

            <div className="p-3">{data.title}</div>
          </div>
        </div>
        <div className="w-screen flex justify-center mt-4 text-LightGray">
          {data.date} | {data.duration} | {data.type}
        </div>
        <div className="mt-6 mx-7">
          <h3>About Movie</h3>
          <p className="mt-6"> {data.description} </p>
        </div>
      </div>
    </div>
  );
};

export default Modal;
