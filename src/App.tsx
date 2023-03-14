import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import { debounce } from "lodash";

function App() {
  // State variables to keep track of the user's input and the list of items to display
  const [query, setQuery] = useState<string>("");
  const [itemList, setItemList] = useState<string[]>([]);

  // Event handler to update the query state variable whenever the user types in the input box
  const onQueryChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(ev.target.value);
  };

  // Effect hook to make API calls to the GitHub API whenever the user's query changes
  useEffect(() => {
    // Use Lodash's debounce function to delay API calls and prevent spamming the API
    const delayApiCall = debounce(() => {
      if (query) {
        axios
          .get(`https://api.github.com/search/users?q=${query}`)
          .then((res) => {
            const data = res.data;
            // Check if the response contains any items and update the itemList state variable
            if (data?.items?.length) {
              setItemList(
                data?.items?.slice(0, 10)?.map((item: any) => item.login) || []
              );
            }
          })
          .catch((error) => {
            console.log(error);
            // Handle errors here
          });
      }
    }, 300);

    // Call the debounced API function
    delayApiCall();

    // Return a cleanup function to cancel any pending API calls when the query changes
    return delayApiCall.cancel;
  }, [query]);

  // Render the input box and the list of items
  return (
    <div className="container">
      <h1> Type the github username that you want to list.</h1>
      <input type="text" name="query" value={query} onChange={onQueryChange} />
      <ul>
        {!!itemList.length &&
          itemList.map((item) => {
            const regex = new RegExp(query, "gi");
            // Use regex to highlight the user's query in the item name
            const highlightedItem = item.replace(
              regex,
              (match) => `<mark>${match}</mark>`
            );
            // Render the item as an li element with the highlighted name
            return (
              <li
                key={item}
                dangerouslySetInnerHTML={{ __html: highlightedItem }}
              />
            );
          })}
      </ul>
    </div>
  );
}

export default App;
