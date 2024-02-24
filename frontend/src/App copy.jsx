import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Editor from "@monaco-editor/react";

const languages = [
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

export default function Example() {
  return (
    <>
      <div className="min-h-full">
        <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Dashboard
            </h1>
          </div>
        </header>
        <div className="mx-auto px-2">
          <Editor
            height="90vh"
            defaultLanguage="javascript"
            defaultValue="// some comment"
            theme="vs-dark"
            options={{
              fontSize: 18, // Adjust the font size as needed
            }}
          />
        </div>
      </div>
    </>
  );
}
