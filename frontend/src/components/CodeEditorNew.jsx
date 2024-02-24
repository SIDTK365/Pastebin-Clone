import { React, useState, useRef, useEffect } from "react";
import Editor from "@monaco-editor/react";
import CopyIcon from "../copy_icon.svg";

const CodeEditor = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
  };

  const [isCopied, setIsCopied] = useState(false);
  const [language, setLanguage] = useState("plaintext");
  const defaultMessageRef = useRef(null);
  const successMessageRef = useRef(null);

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

  const expires = [
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

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4 w-full rounded-lg border border-gray-200 bg-gray-50 dark:border-gray-600 dark:bg-gray-700">
        <div className="rounded-t-lg bg-white px-4 py-2 dark:bg-gray-800">
          <label htmlFor="comment" className="sr-only">
            Your comment
          </label>
          {/* <textarea
            id="comment"
            rows="4"
            className="w-full border-0 bg-white px-0 text-sm text-gray-900 focus:ring-0 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
            placeholder="Write a comment..."
            required
          /> */}
          <Editor
            height="90vh"
            language={language}
            defaultValue="// some comment"
            theme="vs-dark"
            options={{
              fontSize: 18, // Adjust the font size as needed
            }}
          />
        </div>
        <div className="flex items-center justify-between border-t px-3 py-2 dark:border-gray-600">
          <button
            type="submit"
            className="inline-flex items-center rounded-lg bg-blue-700 px-4 py-2.5 text-center text-xs font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900"
          >
            Post comment
          </button>
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
                  class="me-1.5 h-3 w-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 18 20"
                >
                  <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2Zm-3 14H5a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2Zm0-4H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Zm0-5H5a1 1 0 0 1 0-2h2V2h4v2h2a1 1 0 1 1 0 2Z" />
                </svg>
                <span class="text-xs font-semibold">Copy</span>
              </span>
              <span
                ref={successMessageRef}
                className={`inline-flex items-center ${isCopied ? "" : "hidden"}`}
              >
                <svg
                  class="me-1.5 h-3 w-3 text-blue-700 dark:text-blue-500"
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
                <span class="text-xs font-semibold text-blue-700 dark:text-blue-500">
                  Copied
                </span>
              </span>
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default CodeEditor;
