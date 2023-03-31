import { useRef, useState, useEffect } from "react";
import Fuse from "fuse.js";
import SearchCard from "../Cards/SearchCard";

import {
  ChevronLeftIcon,
  CalendarIcon,
  ClockIcon,
  TicketIcon,
} from "@heroicons/react/24/outline";
import Searchbar from "../inputs/Searchbar";

const Modal = function Modal({ item, defaultPic, bgHide, showModal }) {
  const popup = useRef();

  const { data } = item;

  const [searchData, setSearchData] = useState([]);
  const [noResult, setNoResult] = useState(false);

  const searchItem = (query) => {
    if (!query) {
      setSearchData([]);
      setNoResult(false);
      return;
    }
    const fuse = new Fuse(data, {
      keys: ["title"],
    });
    const result = fuse.search(query);
    const finalResult = [];
    if (result.length) {
      result.forEach((item) => {
        finalResult.push(item.item);
      });
      setSearchData(finalResult);
      setNoResult(false);
    } else {
      setSearchData([]);
      setNoResult(true);
    }
  };

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
        <ChevronLeftIcon
          className="block h-6 w-6 font-medium absolute ml-6 mt-14"
          aria-hidden="true"
          onClick={() => bgHide()}
        />
        <div className="flex flex-row pt-14 justify-center">
          <div className="text-xl font-medium flex">{item.type}</div>
        </div>
        {/* <div className="w-full h-px my-6 bg-gray-200" /> */}
        {item.type === "Details" ? (
          <>
            <div className="min-h-fit block">
              <div
                className="h-52 w-auto rounded-b-2xl mt-5"
                style={{
                  backgroundImage: `url(${data.cover})`,
                  backgroundSize: "cover",
                }}
              ></div>
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
            <div className="w-screen flex justify-center items-center mt-4 text-LightGray text-xs">
              <CalendarIcon className="block h-4 w-4 mx-1" aria-hidden="true" />
              {data.date} |
              <ClockIcon
                className="block h-4 w-4 mx-1"
                aria-hidden="true"
              />{" "}
              {data.duration} Minutes |
              <TicketIcon className="block h-4 w-4 mx-1" aria-hidden="true" />
              {data.type}
            </div>
            <div className="mt-6 mx-7">
              <h3>About Movie</h3>
              <p className="mt-6"> {data.description} </p>
            </div>
          </>
        ) : (
          <>
            <div className="min-h-fit block">
              <div className="mt-9 w-auto">
                <Searchbar
                  isFocus
                  onChange={(e) => searchItem(e.target.value)}
                />
              </div>
              {searchData.length === 0 && !noResult ? (
                <>
                  <div className="flex flex-col justify-center items-center mt-36">
                    <svg
                      width="76"
                      height="76"
                      viewBox="0 0 76 76"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_203_1047)">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M46.3137 7.42157C34.0174 7.42157 24.049 17.3898 24.049 29.6863C24.049 41.9828 34.0172 51.951 46.3137 51.951C46.8561 51.951 47.394 51.9314 47.9264 51.8934C47.8841 51.6764 47.862 51.453 47.862 51.2253C47.862 49.2717 49.4603 47.6733 51.414 47.6733H52.18C52.18 43.75 55.3605 40.5694 59.284 40.5694C61.2781 40.5694 63.0804 41.3911 64.3704 42.7146C67.0178 39.0516 68.5781 34.5513 68.5781 29.6864C68.5784 17.3899 58.6102 7.42157 46.3137 7.42157Z"
                          fill="white"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M24.0492 29.6863C24.0492 17.3898 34.0174 7.42157 46.3139 7.42157C58.6104 7.42157 68.5786 17.3898 68.5786 29.6863C68.5786 34.5511 67.0183 39.0516 64.3709 42.7143C64.7549 43.1082 65.0936 43.5465 65.3786 44.0209C65.7679 43.9136 66.1777 43.856 66.601 43.856C67.8752 43.856 69.028 44.3754 69.8591 45.2141C72.8021 40.7608 74.5157 35.4239 74.5157 29.6864C74.5157 14.1109 61.8892 1.48446 46.3137 1.48446C38.3029 1.48446 31.072 4.82461 25.938 10.1882C23.5917 12.6392 21.6835 15.5129 20.3388 18.6835C18.905 22.0643 18.1118 25.7827 18.1118 29.6864C18.1118 35.8974 20.1196 41.6395 23.5215 46.2989C25.2486 48.6644 27.3351 50.7509 29.7005 52.4782C34.3602 55.8803 40.1025 57.8883 46.3137 57.8883C50.9574 57.8883 55.3388 56.7655 59.2019 54.7773C56.5983 54.7773 53.9946 54.7773 51.3908 54.7773C49.6818 54.7773 48.2423 53.5159 47.9264 51.8934C47.394 51.9316 46.8561 51.951 46.3137 51.951C34.0174 51.951 24.0492 41.9828 24.0492 29.6863Z"
                          fill="#FF8700"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M20.3388 18.6833C21.6836 15.5127 23.5918 12.6391 25.9379 10.188C25.165 8.74438 23.6426 7.76207 21.8906 7.76207C21.4672 7.76207 21.0573 7.81966 20.6682 7.92697C19.4262 5.85903 17.1616 4.47535 14.5739 4.47535C10.6504 4.47535 7.46993 7.65594 7.46993 11.5793H6.70388C4.75023 11.5793 3.15192 13.1776 3.15192 15.1312C3.15192 17.0619 4.74295 18.6832 6.68058 18.6832H20.3388V18.6833Z"
                          fill="#0296E5"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M59.2841 40.5693C55.3606 40.5693 52.1801 43.7499 52.1801 47.6732H51.4141C49.4604 47.6732 47.8621 49.2715 47.8621 51.2252C47.8621 51.4528 47.8842 51.6764 47.9265 51.8932C48.2424 53.5156 49.6817 54.7771 51.3909 54.7771H59.202H71.1763C73.0131 54.7771 74.516 53.2743 74.516 51.4374C74.516 49.6004 73.0133 48.0977 71.1763 48.0977C71.0926 46.9759 70.6054 45.9664 69.8595 45.2138C69.0282 44.3752 67.8754 43.8558 66.6013 43.8558C66.1778 43.8558 65.768 43.9134 65.3788 44.0208C65.094 43.5464 64.7553 43.108 64.3711 42.7141C63.0805 41.391 61.2784 40.5693 59.2841 40.5693Z"
                          fill="#0296E5"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M23.8814 58.5507L17.449 52.1183L2.93879 66.0238C1.00339 67.9592 1.00339 71.126 2.93879 73.0614C4.87419 74.9968 8.04098 74.9968 9.97637 73.0614L23.8814 58.5507Z"
                          fill="#FF8700"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M17.449 52.1183L23.8814 58.5507L29.7006 52.4781C27.3351 50.7508 25.2487 48.6643 23.5216 46.2987L17.449 52.1183Z"
                          fill="#FFC144"
                        />
                        <path
                          d="M38.8928 31.1707C39.7126 31.1707 40.3772 30.5061 40.3772 29.6863C40.3772 28.8665 39.7126 28.202 38.8928 28.202H38.8918C38.072 28.202 37.4078 28.8665 37.4078 29.6863C37.4078 30.5061 38.073 31.1707 38.8928 31.1707Z"
                          fill="black"
                        />
                        <path
                          d="M46.3144 31.1707C47.1343 31.1707 47.7988 30.5061 47.7988 29.6863C47.7988 28.8665 47.1343 28.202 46.3144 28.202H46.3134C45.4936 28.202 44.8295 28.8665 44.8295 29.6863C44.8295 30.5061 45.4946 31.1707 46.3144 31.1707Z"
                          fill="black"
                        />
                        <path
                          d="M53.7359 31.1707C54.5558 31.1707 55.2203 30.5061 55.2203 29.6863C55.2203 28.8665 54.5558 28.202 53.7359 28.202H53.7349C52.9151 28.202 52.251 28.8665 52.251 29.6863C52.251 30.5061 52.9161 31.1707 53.7359 31.1707Z"
                          fill="black"
                        />
                        <path
                          d="M72.4414 46.7818C72.2707 46.1851 72.0103 45.6263 71.6765 45.1203C74.5081 40.4772 76 35.1628 76 29.6864C76 13.3174 62.6827 9.15527e-05 46.3137 9.15527e-05C38.5089 9.15527e-05 31.3978 3.02765 26.0933 7.97012C24.9758 6.90171 23.4712 6.278 21.8907 6.278C21.7093 6.278 21.5283 6.28602 21.3484 6.30205C19.7332 4.23811 17.2222 2.99128 14.5739 2.99128C10.332 2.99128 6.79859 6.08207 6.10794 10.1302C3.61058 10.4259 1.66747 12.5561 1.66747 15.1315C1.66747 17.9085 3.9162 20.1678 6.68044 20.1678H18.1923C17.1778 23.157 16.6274 26.3586 16.6274 29.6864C16.6274 35.7492 18.4543 41.3933 21.5865 46.0973L1.91178 64.9521C1.90421 64.9593 1.89664 64.9668 1.88922 64.9742C-0.629659 67.4932 -0.629659 71.5919 1.88922 74.1109C3.14866 75.3703 4.80308 76.0001 6.4575 76.0001C8.11191 76.0001 9.76633 75.3703 11.0258 74.1109C11.0332 74.1035 11.0406 74.0959 11.0479 74.0883L29.9021 54.413C34.6063 57.5453 40.2506 59.3725 46.3137 59.3725C50.9709 59.3725 55.4244 58.3261 59.5565 56.2616H71.176C73.8359 56.2616 76 54.0974 76 51.4375C76 49.2152 74.4896 47.339 72.4414 46.7818ZM6.68059 17.199C5.5724 17.199 4.63624 16.2522 4.63624 15.1313C4.63624 13.9912 5.56379 13.0637 6.70389 13.0637H7.46995C8.28973 13.0637 8.95426 12.3992 8.95426 11.5794C8.95426 8.48072 11.4752 5.95976 14.5739 5.95976C16.5658 5.95976 18.3684 6.98082 19.3957 8.69135C19.7388 9.26266 20.4206 9.53533 21.0629 9.35795C21.3311 9.28404 21.6095 9.24648 21.8907 9.24648C22.6917 9.24648 23.4548 9.56027 24.0248 10.0985C22.1584 12.2197 20.5894 14.6084 19.3832 17.1991H6.68059V17.199ZM8.91656 72.022C7.55426 73.3733 5.34649 73.3699 3.98849 72.0118C2.63034 70.6538 2.62693 68.446 3.97825 67.0835L17.427 54.1952L21.8046 58.5728L8.91656 72.022ZM23.8587 56.4288L19.5707 52.1407L23.3681 48.5014C24.6065 50.009 25.9903 51.3927 27.4978 52.6312L23.8587 56.4288ZM19.5962 29.6862C19.5962 14.9541 31.5817 2.96857 46.3139 2.96857C61.046 2.96857 73.0315 14.9541 73.0315 29.6862C73.0315 34.4219 71.7927 39.0221 69.4362 43.0805C68.5862 42.6278 67.6196 42.3716 66.601 42.3716C66.5314 42.3716 66.462 42.3728 66.3926 42.3752C68.7977 38.581 70.0629 34.2205 70.0629 29.6864C70.0629 16.5912 59.4091 5.93735 46.3139 5.93735C42.4653 5.93735 38.641 6.88108 35.2542 8.66656C34.5291 9.04892 34.2511 9.94663 34.6333 10.6719C35.0156 11.397 35.9134 11.6748 36.6387 11.2928C39.6002 9.73111 42.9458 8.90583 46.3137 8.90583C57.772 8.90583 67.0941 18.2279 67.0941 29.6862C67.0941 33.5524 66.0434 37.2738 64.0433 40.5321C62.6508 39.6061 60.9963 39.0851 59.2843 39.0851C55.0424 39.0851 51.5088 42.176 50.8183 46.224C48.5709 46.49 46.7725 48.2417 46.435 50.4666C46.3962 50.4666 46.3559 50.4666 46.3139 50.4666C34.8556 50.4666 25.5335 41.1446 25.5335 29.6862C25.5335 26.3179 26.3586 22.9725 27.9196 20.0118C28.302 19.2865 28.0241 18.3888 27.2989 18.0065C26.5738 17.6241 25.676 17.9021 25.2936 18.6272C23.5084 22.0132 22.5647 25.8374 22.5647 29.6862C22.5647 42.7815 33.2184 53.4353 46.3137 53.4353C46.5328 53.4353 46.7142 53.4347 46.8852 53.4317C47.535 54.7655 48.7547 55.7701 50.2236 56.1235C48.941 56.3101 47.6365 56.4039 46.3139 56.4039C31.5816 56.4039 19.5962 44.4184 19.5962 29.6862ZM71.1761 53.2929H51.3908C50.2826 53.2929 49.3465 52.3461 49.3465 51.2253C49.3465 50.0852 50.274 49.1576 51.4141 49.1576H52.1802C53 49.1576 53.6645 48.4931 53.6645 47.6733C53.6645 44.5747 56.1854 42.0537 59.2841 42.0537C61.2762 42.0537 63.0786 43.0748 64.1059 44.7851C64.4489 45.3566 65.1307 45.6293 65.7731 45.4517C66.0414 45.3777 66.3199 45.3403 66.6009 45.3403C68.2164 45.3403 69.5757 46.6 69.6958 48.2083C69.7536 48.9831 70.3991 49.5821 71.176 49.5821C72.1991 49.5821 73.0314 50.4144 73.0314 51.4375C73.0314 52.4607 72.1991 53.2929 71.1761 53.2929Z"
                          fill="black"
                        />
                        <path
                          d="M30.5703 15.4272C31.3901 15.4272 32.0546 14.7626 32.0546 13.9428C32.0546 13.123 31.3901 12.4584 30.5703 12.4584H30.5692C29.7494 12.4584 29.0854 13.123 29.0854 13.9428C29.0854 14.7626 29.7504 15.4272 30.5703 15.4272Z"
                          fill="black"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_203_1047">
                          <rect width="76" height="76" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                    <div className="mx-24 text-center mt-4 text-base">
                      Start typing to find a Movie!
                    </div>
                    <div className="mx-24 text-center mt-2 text-xs text-LightGray">
                      Find your movie by title
                    </div>
                  </div>
                </>
              ) : searchData.length === 0 && noResult ? (
                <>
                  <div className="flex flex-col justify-center items-center mt-36">
                    <svg
                      width="76"
                      height="76"
                      viewBox="0 0 76 76"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_203_1047)">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M46.3137 7.42157C34.0174 7.42157 24.049 17.3898 24.049 29.6863C24.049 41.9828 34.0172 51.951 46.3137 51.951C46.8561 51.951 47.394 51.9314 47.9264 51.8934C47.8841 51.6764 47.862 51.453 47.862 51.2253C47.862 49.2717 49.4603 47.6733 51.414 47.6733H52.18C52.18 43.75 55.3605 40.5694 59.284 40.5694C61.2781 40.5694 63.0804 41.3911 64.3704 42.7146C67.0178 39.0516 68.5781 34.5513 68.5781 29.6864C68.5784 17.3899 58.6102 7.42157 46.3137 7.42157Z"
                          fill="white"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M24.0492 29.6863C24.0492 17.3898 34.0174 7.42157 46.3139 7.42157C58.6104 7.42157 68.5786 17.3898 68.5786 29.6863C68.5786 34.5511 67.0183 39.0516 64.3709 42.7143C64.7549 43.1082 65.0936 43.5465 65.3786 44.0209C65.7679 43.9136 66.1777 43.856 66.601 43.856C67.8752 43.856 69.028 44.3754 69.8591 45.2141C72.8021 40.7608 74.5157 35.4239 74.5157 29.6864C74.5157 14.1109 61.8892 1.48446 46.3137 1.48446C38.3029 1.48446 31.072 4.82461 25.938 10.1882C23.5917 12.6392 21.6835 15.5129 20.3388 18.6835C18.905 22.0643 18.1118 25.7827 18.1118 29.6864C18.1118 35.8974 20.1196 41.6395 23.5215 46.2989C25.2486 48.6644 27.3351 50.7509 29.7005 52.4782C34.3602 55.8803 40.1025 57.8883 46.3137 57.8883C50.9574 57.8883 55.3388 56.7655 59.2019 54.7773C56.5983 54.7773 53.9946 54.7773 51.3908 54.7773C49.6818 54.7773 48.2423 53.5159 47.9264 51.8934C47.394 51.9316 46.8561 51.951 46.3137 51.951C34.0174 51.951 24.0492 41.9828 24.0492 29.6863Z"
                          fill="#FF8700"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M20.3388 18.6833C21.6836 15.5127 23.5918 12.6391 25.9379 10.188C25.165 8.74438 23.6426 7.76207 21.8906 7.76207C21.4672 7.76207 21.0573 7.81966 20.6682 7.92697C19.4262 5.85903 17.1616 4.47535 14.5739 4.47535C10.6504 4.47535 7.46993 7.65594 7.46993 11.5793H6.70388C4.75023 11.5793 3.15192 13.1776 3.15192 15.1312C3.15192 17.0619 4.74295 18.6832 6.68058 18.6832H20.3388V18.6833Z"
                          fill="#0296E5"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M59.2841 40.5693C55.3606 40.5693 52.1801 43.7499 52.1801 47.6732H51.4141C49.4604 47.6732 47.8621 49.2715 47.8621 51.2252C47.8621 51.4528 47.8842 51.6764 47.9265 51.8932C48.2424 53.5156 49.6817 54.7771 51.3909 54.7771H59.202H71.1763C73.0131 54.7771 74.516 53.2743 74.516 51.4374C74.516 49.6004 73.0133 48.0977 71.1763 48.0977C71.0926 46.9759 70.6054 45.9664 69.8595 45.2138C69.0282 44.3752 67.8754 43.8558 66.6013 43.8558C66.1778 43.8558 65.768 43.9134 65.3788 44.0208C65.094 43.5464 64.7553 43.108 64.3711 42.7141C63.0805 41.391 61.2784 40.5693 59.2841 40.5693Z"
                          fill="#0296E5"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M23.8814 58.5507L17.449 52.1183L2.93879 66.0238C1.00339 67.9592 1.00339 71.126 2.93879 73.0614C4.87419 74.9968 8.04098 74.9968 9.97637 73.0614L23.8814 58.5507Z"
                          fill="#FF8700"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M17.449 52.1183L23.8814 58.5507L29.7006 52.4781C27.3351 50.7508 25.2487 48.6643 23.5216 46.2987L17.449 52.1183Z"
                          fill="#FFC144"
                        />
                        <path
                          d="M38.8928 31.1707C39.7126 31.1707 40.3772 30.5061 40.3772 29.6863C40.3772 28.8665 39.7126 28.202 38.8928 28.202H38.8918C38.072 28.202 37.4078 28.8665 37.4078 29.6863C37.4078 30.5061 38.073 31.1707 38.8928 31.1707Z"
                          fill="black"
                        />
                        <path
                          d="M46.3144 31.1707C47.1343 31.1707 47.7988 30.5061 47.7988 29.6863C47.7988 28.8665 47.1343 28.202 46.3144 28.202H46.3134C45.4936 28.202 44.8295 28.8665 44.8295 29.6863C44.8295 30.5061 45.4946 31.1707 46.3144 31.1707Z"
                          fill="black"
                        />
                        <path
                          d="M53.7359 31.1707C54.5558 31.1707 55.2203 30.5061 55.2203 29.6863C55.2203 28.8665 54.5558 28.202 53.7359 28.202H53.7349C52.9151 28.202 52.251 28.8665 52.251 29.6863C52.251 30.5061 52.9161 31.1707 53.7359 31.1707Z"
                          fill="black"
                        />
                        <path
                          d="M72.4414 46.7818C72.2707 46.1851 72.0103 45.6263 71.6765 45.1203C74.5081 40.4772 76 35.1628 76 29.6864C76 13.3174 62.6827 9.15527e-05 46.3137 9.15527e-05C38.5089 9.15527e-05 31.3978 3.02765 26.0933 7.97012C24.9758 6.90171 23.4712 6.278 21.8907 6.278C21.7093 6.278 21.5283 6.28602 21.3484 6.30205C19.7332 4.23811 17.2222 2.99128 14.5739 2.99128C10.332 2.99128 6.79859 6.08207 6.10794 10.1302C3.61058 10.4259 1.66747 12.5561 1.66747 15.1315C1.66747 17.9085 3.9162 20.1678 6.68044 20.1678H18.1923C17.1778 23.157 16.6274 26.3586 16.6274 29.6864C16.6274 35.7492 18.4543 41.3933 21.5865 46.0973L1.91178 64.9521C1.90421 64.9593 1.89664 64.9668 1.88922 64.9742C-0.629659 67.4932 -0.629659 71.5919 1.88922 74.1109C3.14866 75.3703 4.80308 76.0001 6.4575 76.0001C8.11191 76.0001 9.76633 75.3703 11.0258 74.1109C11.0332 74.1035 11.0406 74.0959 11.0479 74.0883L29.9021 54.413C34.6063 57.5453 40.2506 59.3725 46.3137 59.3725C50.9709 59.3725 55.4244 58.3261 59.5565 56.2616H71.176C73.8359 56.2616 76 54.0974 76 51.4375C76 49.2152 74.4896 47.339 72.4414 46.7818ZM6.68059 17.199C5.5724 17.199 4.63624 16.2522 4.63624 15.1313C4.63624 13.9912 5.56379 13.0637 6.70389 13.0637H7.46995C8.28973 13.0637 8.95426 12.3992 8.95426 11.5794C8.95426 8.48072 11.4752 5.95976 14.5739 5.95976C16.5658 5.95976 18.3684 6.98082 19.3957 8.69135C19.7388 9.26266 20.4206 9.53533 21.0629 9.35795C21.3311 9.28404 21.6095 9.24648 21.8907 9.24648C22.6917 9.24648 23.4548 9.56027 24.0248 10.0985C22.1584 12.2197 20.5894 14.6084 19.3832 17.1991H6.68059V17.199ZM8.91656 72.022C7.55426 73.3733 5.34649 73.3699 3.98849 72.0118C2.63034 70.6538 2.62693 68.446 3.97825 67.0835L17.427 54.1952L21.8046 58.5728L8.91656 72.022ZM23.8587 56.4288L19.5707 52.1407L23.3681 48.5014C24.6065 50.009 25.9903 51.3927 27.4978 52.6312L23.8587 56.4288ZM19.5962 29.6862C19.5962 14.9541 31.5817 2.96857 46.3139 2.96857C61.046 2.96857 73.0315 14.9541 73.0315 29.6862C73.0315 34.4219 71.7927 39.0221 69.4362 43.0805C68.5862 42.6278 67.6196 42.3716 66.601 42.3716C66.5314 42.3716 66.462 42.3728 66.3926 42.3752C68.7977 38.581 70.0629 34.2205 70.0629 29.6864C70.0629 16.5912 59.4091 5.93735 46.3139 5.93735C42.4653 5.93735 38.641 6.88108 35.2542 8.66656C34.5291 9.04892 34.2511 9.94663 34.6333 10.6719C35.0156 11.397 35.9134 11.6748 36.6387 11.2928C39.6002 9.73111 42.9458 8.90583 46.3137 8.90583C57.772 8.90583 67.0941 18.2279 67.0941 29.6862C67.0941 33.5524 66.0434 37.2738 64.0433 40.5321C62.6508 39.6061 60.9963 39.0851 59.2843 39.0851C55.0424 39.0851 51.5088 42.176 50.8183 46.224C48.5709 46.49 46.7725 48.2417 46.435 50.4666C46.3962 50.4666 46.3559 50.4666 46.3139 50.4666C34.8556 50.4666 25.5335 41.1446 25.5335 29.6862C25.5335 26.3179 26.3586 22.9725 27.9196 20.0118C28.302 19.2865 28.0241 18.3888 27.2989 18.0065C26.5738 17.6241 25.676 17.9021 25.2936 18.6272C23.5084 22.0132 22.5647 25.8374 22.5647 29.6862C22.5647 42.7815 33.2184 53.4353 46.3137 53.4353C46.5328 53.4353 46.7142 53.4347 46.8852 53.4317C47.535 54.7655 48.7547 55.7701 50.2236 56.1235C48.941 56.3101 47.6365 56.4039 46.3139 56.4039C31.5816 56.4039 19.5962 44.4184 19.5962 29.6862ZM71.1761 53.2929H51.3908C50.2826 53.2929 49.3465 52.3461 49.3465 51.2253C49.3465 50.0852 50.274 49.1576 51.4141 49.1576H52.1802C53 49.1576 53.6645 48.4931 53.6645 47.6733C53.6645 44.5747 56.1854 42.0537 59.2841 42.0537C61.2762 42.0537 63.0786 43.0748 64.1059 44.7851C64.4489 45.3566 65.1307 45.6293 65.7731 45.4517C66.0414 45.3777 66.3199 45.3403 66.6009 45.3403C68.2164 45.3403 69.5757 46.6 69.6958 48.2083C69.7536 48.9831 70.3991 49.5821 71.176 49.5821C72.1991 49.5821 73.0314 50.4144 73.0314 51.4375C73.0314 52.4607 72.1991 53.2929 71.1761 53.2929Z"
                          fill="black"
                        />
                        <path
                          d="M30.5703 15.4272C31.3901 15.4272 32.0546 14.7626 32.0546 13.9428C32.0546 13.123 31.3901 12.4584 30.5703 12.4584H30.5692C29.7494 12.4584 29.0854 13.123 29.0854 13.9428C29.0854 14.7626 29.7504 15.4272 30.5703 15.4272Z"
                          fill="black"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_203_1047">
                          <rect width="76" height="76" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                    <div className="mx-24 text-center mt-4 text-base">
                    We are sorry, we can not find the movie :(
                    </div>
                    <div className="mx-24 text-center mt-2 text-xs text-LightGray">
                      Find your movie by title
                    </div>
                  </div>
                </>
              ) : (
                <div className="item-container">
                  {searchData.map((item) => (
                    <SearchCard
                      key={item.title}
                      movie={item}
                      defaultPic={defaultPic}
                      onClick={() => showModal(item, "Details")}
                    />
                  ))}
                </div>
              )}
            </div>

            <div className="mt-6 mx-7"></div>
          </>
        )}
      </div>
    </div>
  );
};

export default Modal;
