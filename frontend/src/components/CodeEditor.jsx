import { React, useState, useRef, useEffect, Fragment } from "react";
import Editor from "@monaco-editor/react";
import { Dialog, Transition } from "@headlessui/react";
import { useParams } from "react-router-dom";
import axios from "axios";

function MainBody({ darkMode, readonly }) {
  const [code, setCode] = useState("");

  const [isCopied, setIsCopied] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [language, setLanguage] = useState("plaintext");
  const [expiry, setExpiry] = useState(600);
  const defaultMessageRef = useRef(null);
  const successMessageRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);
  const cancelButtonRef = useRef(null);
  const { id } = useParams();

  useEffect(() => {
    if (isCopied) {
      const timer = setTimeout(() => {
        setIsCopied(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isCopied]);

  const handleCopy = () => {
    // Logic to copy to clipboard goes here
    navigator.clipboard.writeText(code);
    setIsCopied(true);
  };

  const languagesMap = [
    {
      name: "Plain Text",
      value: "plaintext",
    },
    {
      name: "JavaScript",
      value: "javascript",
    },
    {
      name: "TypeScript",
      value: "typescript",
    },
    {
      name: "Python",
      value: "python",
    },
    {
      name: "Java",
      value: "java",
    },
    {
      name: "C",
      value: "c",
    },
    {
      name: "C++",
      value: "cpp",
    },
    {
      name: "C#",
      value: "csharp",
    },
  ];

  const expiryMap = [
    {
      name: "Never",
      value: 0,
    },
    {
      name: "10 Minutes",
      value: 600,
    },
    {
      name: "1 Hour",
      value: 3600,
    },
    {
      name: "1 Day",
      value: 86400,
    },
    {
      name: "1 Week",
      value: 604800,
    },
    {
      name: "1 Month",
      value: 2592000,
    },
    {
      name: "1 Year",
      value: 31536000,
    },
  ];

  const handleGenerateClick = async () => {
    setIsLoading(true); // Set loading state to true when the API call starts
    try {
      // Replace '/api/endpoint' with your actual API endpoint
      // Replace 'data' with the actual data you want to send in the request
      const dataPayload = {
        value: code,
        expires: expiry,
      };
      const response = await axios.post(
        "http://localhost:8080/save",
        dataPayload,
      );
      // Handle the response from the API call
      if (response) {
        console.log(response.data);
        setIsModalOpen(true);
        setModalData(response.data);
      }
    } catch (error) {
      // Handle any errors from the API call
      console.error("Error:", error);
    } finally {
      setIsLoading(false); // Set loading state to false when the API call is complete
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:8080/${id}`)
        .then((response) => {
          setCode(response.data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          window.open(`http://localhost:8080/error`); // "_blank" parameter opens the URL in a new tab
        });
    }
  }, [id]);

  const handleCopyLink = () => {
    const url = `http://localhost:3000/id/${modalData.id}`;
    navigator.clipboard.writeText(url);
    // alert("Link copied to clipboard!");
  };

  // Function to redirect to the new snippet's URL
  const handleGoToSnippet = () => {
    const url = `http://localhost:3000/id/${modalData.id}`;
    window.open(url, "_blank"); // "_blank" parameter opens the URL in a new tab
  };

  return (
    <main className="flex flex-grow flex-col">
      <div className="flex flex-grow flex-col bg-white dark:bg-gray-900">
        {/* <textarea
          className="flex-grow rounded-lg bg-gray-200 px-3 py-2 text-gray-700 focus:outline-none"
          value={code}
          onChange={handleCodeChange}
          placeholder="Write your code here..."
        /> */}
        <Editor
          height="100%" // Set the height to  100% to fill the container
          language={language}
          value={code}
          theme={darkMode ? "vs-dark" : "vs-light"} // Conditional theme based on darkMode
          options={{
            fontSize: 18, // Adjust the font size as needed
            automaticLayout: true, // This option will make the editor resize with its container
            readOnly: !!readonly,
          }}
          onChange={(value, event) => setCode(value)}
        />
        {/* <button
          className="rounded-lg bg-blue-500 px-3 py-2 text-white hover:bg-blue-600 focus:outline-none"
          onClick={handleGenerateClick}
        >
          Generate
        </button> */}
        {/* Adding content here */}
        <div className="flex items-center justify-between border-t px-3 py-2 dark:border-gray-600">
          <div className="flex gap-x-2">
            {isLoading ? (
              <button
                disabled
                type="button"
                className="me-2 inline-flex items-center rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                <svg
                  aria-hidden="true"
                  role="status"
                  className="me-3 inline h-4 w-4 animate-spin text-white"
                  viewBox="0  0  100  101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <svg
                    aria-hidden="true"
                    role="status"
                    class="me-3 inline h-4 w-4 animate-spin text-white"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="#E5E7EB"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentColor"
                    />
                  </svg>
                </svg>
                Creating Snippet...
              </button>
            ) : (
              <button
                type="submit"
                className="inline-flex items-center rounded-lg bg-blue-700 px-4 py-2.5 text-center text-xs font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900"
                onClick={handleGenerateClick}
                disabled={readonly}
              >
                Create Snippet
              </button>
            )}
            <form className="mx-auto max-w-sm">
              <select
                id="languages"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              >
                <option value="" disabled selected>
                  Select a language
                </option>
                {languagesMap.map((lang) => (
                  <option key={lang.value} value={lang.value}>
                    {lang.name}
                  </option>
                ))}
              </select>
            </form>
            <form className="mx-auto max-w-sm">
              <select
                id="expiry"
                value={expiry}
                onChange={(e) => setExpiry(e.target.value)}
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              >
                <option value="" disabled selected>
                  Select an expiration time
                </option>
                {expiryMap.map((entry) => (
                  <option key={entry.value} value={entry.value}>
                    {entry.name}
                  </option>
                ))}
              </select>
            </form>
          </div>
          {/* <>
            <button
              id="dropdownDefaultButton"
              onClick={toggleDropdown}
              className="inline-flex items-center rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              type="button"
            >
              Dropdown button
              <svg
                className="ms-3 h-2.5 w-2.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0  0  10  6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1  1  4  4  4-4"
                />
              </svg>
            </button>

            {isOpen && (
              <div
                id="dropdown"
                className="absolute z-10 w-44 divide-y divide-gray-100 rounded-lg bg-white shadow dark:bg-gray-700"
              >
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                  {languagesMap.map((lang) => (
                    <li key={lang.value}>
                      <a
                        href="#"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        onClick={() => setLanguage(lang.value)}
                      >
                        {lang.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </> */}
          <div className="flex space-x-1 ps-0 sm:ps-2 rtl:space-x-reverse">
            <button
              onClick={handleCopy}
              className="inline-flex cursor-pointer items-center justify-center rounded p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              <span
                ref={defaultMessageRef}
                className={`inline-flex items-center ${isCopied ? "hidden" : ""}`}
              >
                <svg
                  className="me-1.5 h-3 w-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 18 20"
                >
                  <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2Zm-3 14H5a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2Zm0-4H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Zm0-5H5a1 1 0 0 1 0-2h2V2h4v2h2a1 1 0 1 1 0 2Z" />
                </svg>
                <span className="text-xs font-semibold">Copy Code</span>
              </span>
              <span
                ref={successMessageRef}
                className={`inline-flex items-center ${isCopied ? "" : "hidden"}`}
              >
                <svg
                  className="me-1.5 h-3 w-3 text-blue-700 dark:text-blue-500"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 16 12"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M1 5.917 5.724 10.5 15 1.5"
                  />
                </svg>
                <span className="text-xs font-semibold text-blue-700 dark:text-blue-500">
                  Copied
                </span>
              </span>
            </button>
          </div>
        </div>

        {/* Adding content here */}
        <Transition.Root show={isModalOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-10"
            initialFocus={cancelButtonRef}
            onClose={closeModal}
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
              <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                      <div className="sm:flex sm:items-start">
                        <button
                          type="button"
                          className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900"
                          onClick={closeModal}
                        >
                          <svg
                            className="h-3 w-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0  0  14  14"
                          >
                            <path
                              stroke="currentColor"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="m1  1  6  6m0  0  6  6M7  7l6-6M7  7l-6  6"
                            />
                          </svg>
                        </button>
                        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                          {/* <ExclamationTriangleIcon
                            className="h-6 w-6 text-red-600"
                            aria-hidden="true"
                          /> */}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="24px"
                            viewBox="0 0 24 24"
                            width="24px"
                            fill="#16a34a"
                          >
                            <path d="M0 0h24v24H0z" fill="none" />
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                          </svg>
                        </div>
                        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                          <Dialog.Title
                            as="h3"
                            className="text-base font-semibold leading-6 text-gray-900"
                          >
                            Snippet created
                          </Dialog.Title>
                          <div className="mt-2">
                            <p className="text-sm text-gray-500">
                              Your snippet has been created. You can now share
                              it with others.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                      <button
                        type="button"
                        className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
                        onClick={handleGoToSnippet}
                      >
                        Go to Snippet
                      </button>
                      <button
                        type="button"
                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                        onClick={handleCopyLink}
                        ref={cancelButtonRef}
                      >
                        Copy Link
                      </button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
        {/* Add here */}
      </div>
    </main>
  );
}

export default MainBody;
