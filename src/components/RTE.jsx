import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";
 

const tinymce_api = String(import.meta.env.VITE_TINYMCE_API_KEY)

export const RTE = ({ name, control, label, defaultValue = "Welcome to TinyMCE!" }) => {
  return (
    <div className="w-full">
      {label && <label className="inline-block mb-1 pl-1">{label}</label>}

      <Controller
        name={name || "editor"}
        control={control}
        render={({ field: { onChange } }) => (
          <Editor
            apiKey={tinymce_api}
            initialValue={defaultValue}
            init={{
              initialValue: { defaultValue },
              height: 550,
              menubar: true,
              plugins: [
                "anchor",
                "autolink",
                "charmap",
                "codesample",
                "emoticons",
                "link",
                "lists",
                "media",
                "searchreplace",
                "table",
                "visualblocks",
                "wordcount",
              ],
              toolbar:
                'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography uploadcare | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
              content_style: `body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"; font-size:16px }`,
            }}
            onEditorChange={onChange}
          />
        )}
      />
    </div>
  );
};
