import { forwardRef, useImperativeHandle, useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";

interface props {
  initialValue: string;
}

const TinyMCE = forwardRef(({ initialValue }: props, ref) => {
  const editorRef = useRef<any>(null);

  const getContent = () => {
    if (editorRef.current) return editorRef.current.getContent();
  };

  useImperativeHandle(ref, () => ({ getContent }));

  // return (
  //   <Editor
  //     apiKey='j6u1p0wyatl1jddszi8blxfdtmg7afak6mc4lwbeyd9takkl'
  //     init={{
  //       plugins:
  //         "ai tinycomments mentions anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed permanentpen footnotes advtemplate advtable advcode editimage tableofcontents mergetags powerpaste tinymcespellchecker autocorrect a11ychecker typography inlinecss",
  //       toolbar:
  //         "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
  //       tinycomments_mode: "embedded",
  //       tinycomments_author: "Author name",
  //       mergetags_list: [
  //         { value: "First.Name", title: "First Name" },
  //         { value: "Email", title: "Email" }
  //       ],
  //       ai_request: (request, respondWith) => respondWith.string(() => Promise.reject("See docs to implement AI Assistant"))
  //     }}
  //     initialValue='Welcome to TinyMCE!'
  //   />
  // );

  return (
    <Editor
      apiKey='j6u1p0wyatl1jddszi8blxfdtmg7afak6mc4lwbeyd9takkl'
      tinymceScriptSrc='/tinymce/tinymce.min.js' //process.env.PUBLIC_URL + ...
      onInit={(_, editor) => (editorRef.current = editor)}
      initialValue={initialValue}
      init={{
        height: 200,
        menubar: true,
        plugins: [
          "advlist",
          "autolink",
          "lists",
          "link",
          "image",
          "charmap",
          "preview",
          "anchor",
          "searchreplace",
          "visualblocks",
          "code",
          "fullscreen",
          "insertdatetime",
          "media",
          "table",
          "code",
          "help",
          "wordcount"
        ],
        toolbar:
          "undo redo | blocks | " +
          "bold italic forecolor | alignleft aligncenter " +
          "alignright alignjustify | bullist numlist outdent indent | " +
          "removeformat | help",
        content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
      }}
    />
  );
});

export default TinyMCE;
