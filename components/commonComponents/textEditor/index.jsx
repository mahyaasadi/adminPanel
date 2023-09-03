// import Table from "@editorjs/table";
import List from "@editorjs/list";
import LinkTool from "@editorjs/link";
import ImageTool from "@editorjs/image";
import RawTool from "@editorjs/raw";
import Quote from "@editorjs/quote";
// import Marker from "@editorjs/marker";
// import CheckList from "@editorjs/checklist";
import Delimiter from "@editorjs/delimiter";
// import InlineCode from "@editorjs/inline-code";
// import Warning from "@editorjs/warning";
// import Code from "@editorjs/code";
import SimpleImage from "@editorjs/simple-image";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import Embed from "@editorjs/embed";
import Paragraph from "@editorjs/paragraph";
import Table from "@editorjs/table";

const EditorNoSSR = ({ data }) => {
  const TOOLS = {
    header: Header,
    quote: Quote,
    simpleImage: SimpleImage,
    embed: Embed,
    list: List,
    linkTool: LinkTool,
    image: ImageTool,
    raw: RawTool,
    table: Table,
    paragraph: Paragraph,
    delimiter: Delimiter,
    // marker: Marker,
    //   checklist: CheckList,
    // warning: Warning,
    //   inlineCode: InlineCode,
    // code: Code,
  };

  const editor = new EditorJS({
    holder: "editorjs",
    autofocus: true,
    tools: TOOLS,
    // data: {
    //   time: 1552744582955,
    //   blocks: [
    //     {
    //       type: "heading",
    //       data: {
    //         text: "helllllllllllo",
    //       },
    //     },
    //   ],
    //   version: "2.11.10",
    // },

    // defaultBlock: data,
    data: data,
    // data: {
    //   time: 1550476186479,
    //   blocks: data,
    //   version: "2.8.1",
    // },
  });

  const handleSaveEditedText = () => {
    editor
      .save()
      .then((outputData) => {
        console.log("Article data: ", outputData);
      })
      .catch((error) => {
        console.log("Saving failed: ", error);
      });
  };

  return (
    <>
      <div>
        <div id="editorjs">{data}</div>
      </div>
    </>
  );
};

export default EditorNoSSR;
