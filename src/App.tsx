import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  // Define the types of the GitHub API response data
  interface GitHubUser {
    login: string;
    id: number;
    avatar_url: string;
    html_url: string;
  }

  interface GitHubSearchResult {
    total_count: number;
    incomplete_results: boolean;
    items: GitHubUser[];
  }

  // State variables to keep track of the user's input and the list of items to display
  const [query, setQuery] = useState<string>("");
  const [itemList, setItemList] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  // Event handler to update the query state variable whenever the user types in the input box
  const onQueryChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(ev.target.value);
  };

  // Effect hook to make API calls to the GitHub API whenever the user's query changes
  useEffect(() => {
    // Create a variable to hold the timeout ID
    let timeout: NodeJS.Timeout;

    // Only make API calls if the query is not empty
    if (query) {
      // Show the loading spinner while the API call is being made
      setLoading(true);
      // Set a timeout to avoid making too many API calls while the user is typing
      timeout = setTimeout(() => {
        // Make the API call to the GitHub API
        fetch(`https://api.github.com/search/users?q=${query}`)
          .then((res) => res.json())
          .then((data: GitHubSearchResult) => {
            setLoading(false);
            // If the API response has items, update the itemList state variable
            if (data?.items?.length) {
              // Only show the first 10 items and extract the login names
              setItemList(
                data?.items
                  ?.slice(0, 10)
                  ?.map((item: GitHubUser) => item.login) || []
              );
            } else {
              // If the API response doesn't have any items, show an error message
              setItemList([]);
              setError("No results found.");
            }
          })
          .catch((error) => {
            // If an error occurs, show an error message
            setLoading(false);
            setError("An error occurred. Please try again later.");
            console.log(error);
          });
      }, 300);
    } else {
      // If the query is empty, reset the itemList and error state variables
      setItemList([]);
      setError("");
    }

    // Return a cleanup function to clear the timeout when the component unmounts or the query changes
    return () => clearTimeout(timeout);
  }, [query]);

  // Render the input box and the list of items
  return (
    <div className="container">
      <h1> Type the github username that you want to list.</h1>
      <input
        type="text"
        name="query"
        value={query}
        onChange={onQueryChange}
        aria-label="Search"
      />
      {/* Show the loading spinner while the API call is being made */}
      {loading && <p>Loading...</p>}
      {/* Show the error message if an error occurs */}
      {error && <p>{error}</p>}
      <ul>
        {/* Only show the itemList if it is not empty */}
        {!!itemList.length &&
          itemList.map((item) => {
            // Create a regular expression to highlight the user's query in the item name
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
