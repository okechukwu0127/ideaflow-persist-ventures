import { useState, useEffect } from "react";
import { StylesViaJss } from "substyle-jss";
import MultipleTrigger from "./components/atoms/MultipleTriger";
import HeaderBar from "./components/atoms/HeaderBar";
import "./App.css";

function App() {
  const [childCount, setChildCount] = useState(1);
  const [mentionData, setMentionData] = useState([]);

  const [selectedKey, setSelectedKey] = useState(0);
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  const children = [];

  const mapData = () => {
    let arr = [];
    arr = [
      ...mentionData,
      {
        id: new Date().getTime() + "" + mentionData.length + 1,
        display: " ",
        ref: [],
        openRef: false,
      },
    ];

    let sort = arr; //.sort((a, b) => parseInt(b.id) - parseInt(a.id));

    return sort;
  };

  const multipleTriggerLoop = () => {
    for (var i = 0; i < childCount; i += 1) {
      children.push(
        <>
          <MultipleTrigger
            data={{
              key: mentionData[i]?.id,
              data: mentionData.filter((data) => {
                return data?.id !== selectedKey && data.display !== " ";
              }),
              setMentionData: setMentionData,
              setSelectedKey: setSelectedKey,
              mentionData: mentionData,
            }}
            key={i}
          />
        </>
      );
    }
  };

  useEffect(() => {
    setMentionData(mapData());
    sleep(500);

    multipleTriggerLoop();

    // eslint-disable-next-line
  }, [childCount]);

  multipleTriggerLoop();

  return (
    <StylesViaJss>
      <div className="min-w-screen min-h-screen bg-gray-200 flex items-start  px-5 py-5">
        <div className="w-full max-w-6xl mx-auto rounded-xl bg-white shadow-lg p-5 text-black">
          <HeaderBar setChildCount={setChildCount} childCount={childCount} />
          <div className=" rounded-md  px-8 mb-10">{children}</div>
        </div>
      </div>
    </StylesViaJss>
  );
}

export default App;
