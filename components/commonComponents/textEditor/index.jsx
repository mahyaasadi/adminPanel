import EditorJS from "@editorjs/embed";
import Embed from "@editorjs/embed";
import Table from "@editorjs/table";
import Paragraph from "@editorjs/paragraph";
import List from "@editorjs/list";
import LinkTool from "@editorjs/link";
import Image from "@editorjs/image";
import Raw from "@editorjs/raw";
import Header from "@editorjs/header";
import Quote from "@editorjs/quote";
import Marker from "@editorjs/marker";
import CheckList from "@editorjs/checklist";
import Delimiter from "@editorjs/delimiter";
import SimpleImage from "@editorjs/simple-image";

const EditorNoSSR = ({ data }) => {
  const Tools = {
    paragraph: Paragraph,
    embed: Embed,
    table: Table,
    list: List,
    linkTool: LinkTool,
    image: Image,
    raw: Raw,
    header: Header,
    quote: Quote,
    marker: Marker,
    checklist: CheckList,
    delimiter: Delimiter,
    simpleImage: SimpleImage,
  };

  const editor = new EditorJS({
    holder: "editorjs",
    autofocus: true,
    tools: Tools,
    // defaultBlock: data,
    data: data,
  });

  // const handleSaveEditedText = () => {
  //   editor
  //     .save()
  //     .then((outputData) => {
  //       console.log("Article data: ", outputData);
  //     })
  //     .catch((error) => {
  //       console.log("Saving failed: ", error);
  //     });
  // };

  return (
    <>
      <div>
        <div id="editorjs">{data}</div>
      </div>
    </>
  );
};

export default EditorNoSSR;
