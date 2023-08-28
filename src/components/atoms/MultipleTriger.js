import React, { memo } from "react";

import { MentionsInput, Mention } from "react-mentions";

import { provideExampleValue } from "./higher-order";

import defaultStyle from "./defaultStyle";
import defaultMentionStyle from "./defaultMentionStyle";

// use first/outer capture group to extract the full entered sequence to be replaced
// and second/inner capture group to extract search string from the match
const emailRegex = /(([^\s@]+@[^\s@]+\.[^\s@]+))$/;

function MultipleTriggers({ value, data, onChange, onAdd }) {
  const updateListFunc = () => {
    let updatedList = data.mentionData.map((item) => {
      if (item?.id === data.key) {
        return {
          ...item,
          display: value,
        };
      } else {
        return { ...item };
      }
    });
    data.setMentionData(updatedList);
  };

  const updateRefFunc = (e, ref) => {
    let updatedList = data.mentionData.map((item) => {
      if (item?.id === data.key) {
        return {
          ...item,
          ref: [...item.ref, ref],
        };
      } else {
        return { ...item };
      }
    });
    data.setMentionData(updatedList);
  };

  return (
    <div className="multiple-triggers">
      <MentionsInput
        className="mb-8 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 rounded-md"
        value={value}
        onChange={onChange}
        onClick={() => {
          data.setSelectedKey(data.key);
        }}
        onKeyDown={(e) => {
          updateListFunc();
        }}
        style={defaultStyle}
        placeholder={"Mention items using '@'"}
        a11ySuggestionsListLabel={"Suggested mentions"}
      >
        <Mention
          markup="@[__display__]"
          trigger="@"
          data={data.data}
          renderSuggestion={(
            suggestion,
            search,
            highlightedDisplay,
            index,
            focused
          ) => (
            <div className={`user ${focused ? "focused" : ""}`}>
              {highlightedDisplay}
            </div>
          )}
          onAdd={(e) => {
            console.log(e);
            onAdd(e);
            let ref = data.mentionData.filter((data) => data?.id === e);
            updateRefFunc(e, ref[0]);
          }}
          style={defaultMentionStyle}
        />

        <Mention
          markup="@[__display__](email:__id__)"
          trigger={emailRegex}
          data={(search) => [{ id: search, display: search }]}
          onAdd={onAdd}
          style={{ backgroundColor: "#d1c4e9" }}
        />
      </MentionsInput>
    </div>
  );
}

/* const asExample = provideExampleValue(
  "Hi @[John Doe](user:johndoe), \n\nlet's add @[joe@smoe.com](email:joe@smoe.com) and @[John Doe](user:johndoe) to this conversation... "
); */

const asExample = provideExampleValue("");

export default memo(asExample(MultipleTriggers));
