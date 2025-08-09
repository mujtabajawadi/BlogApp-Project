import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";

export const RTE = ({ name, control, label, defaultValue = "" }) => {
  return (
    <div className="w-full">
      {label && <label className="inline-block mb-1 pl-1">{label}</label>}

      <Controller
        name={name || "editor"}
        control={control}
        render={({ field: { onChange } }) => (
          <Editor
            initialValue={defaultValue}
            init={{
              initialValue: { defaultValue },
              height: 500,
              menubar: false,
              plugins: [
                "Accordion",
                "Anchor",
                "Autolink",
                "Autoresize",
                "Autosave",
                "Character Map",
                "Code",
                "Code Sample",
                "Directionality",
                "Emoticons",
                "Full Screen",
                "Help",
                "Image",
                "Import CSS",
                "Insert Date/Time",
                "Link",
                "Lists",
                "List Styles",
                "Media",
                "Nonbreaking Space",
                "Page Break",
                "Preview",
                "Quick Toolbars",
                "Save",
                "Search and Replace",
                "Table",
                "Visual Blocks",
                "Visual Characters",
                "Word Count",
              ],
              toolbar:
                "undo redo | formatselect | " +
                "bold italic backcolor | alignleft aligncenter " +
                "alignright alignjustify | bullist numlist outdent indent | " +
                "removeformat | help | link image code fullscreen",
                content_style:
                    `body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"; font-size:16px }`,
                }}
                onEditorChange={onChange}
          />
        )}
      />
    </div>
  );
};
