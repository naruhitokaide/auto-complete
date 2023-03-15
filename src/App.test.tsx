import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
import App from "./App";

describe("App", () => {
  test("renders input box", () => {
    render(<App />);
    const inputElement = screen.getByRole("textbox", { name: "Search" });
    expect(inputElement).toBeInTheDocument();
  });

  test("shows loading spinner when API call is made", async () => {
    const mockData = { total_count: 0, incomplete_results: false, items: [] };
    jest.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockData),
      } as Response)
    );
    render(<App />);
    const inputElement = screen.getByRole("textbox", { name: "Search" });
    await act(async () => {
      userEvent.type(inputElement, "naruhito");
    });
    const loadingElement = await screen.findByText("Loading...");
    expect(loadingElement).toBeInTheDocument();
  });

  test("renders error message when API call fails", async () => {
    jest
      .spyOn(global, "fetch")
      .mockImplementation(() => Promise.reject(new Error("API call failed")));
    render(<App />);
    const inputElement = screen.getByRole("textbox", { name: "Search" });
    await act(async () => {
      userEvent.type(inputElement, "naruhito");
    });
    const errorElement = await screen.findByText(
      "An error occurred. Please try again later."
    );
    expect(errorElement).toBeInTheDocument();
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  test("renders list of items when API call succeeds", async () => {
    const mockData = {
      total_count: 1,
      incomplete_results: false,
      items: [{ login: "naruhitokaide", id: 1, avatar_url: "", html_url: "" }],
    };
    jest.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockData),
      } as Response)
    );
    render(<App />);
    const inputElement = screen.getByRole("textbox", { name: "Search" });
    await act(async () => {
      userEvent.type(inputElement, "naruhito");
    });
    const itemElement = await screen.findByText("kaide");
    expect(itemElement).toBeInTheDocument();
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  test("renders error message when no items found", async () => {
    const mockData = {
      total_count: 0,
      incomplete_results: false,
      items: [],
    };
    jest.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockData),
      } as Response)
    );
    render(<App />);
    const inputElement = screen.getByRole("textbox", { name: "Search" });
    await act(async () => {
      userEvent.type(inputElement, "naruhito");
    });
    const errorElement = await screen.findByText("No results found.");
    expect(errorElement).toBeInTheDocument();
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  test("renders highlighted items when input changes", async () => {
    const mockData = {
      total_count: 1,
      incomplete_results: false,
      items: [
        { login: "naruhitokaide", id: 123, avatar_url: "", html_url: "" },
      ],
    };
    jest.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockData),
      } as Response)
    );
    render(<App />);
    const inputElement = screen.getByRole("textbox", { name: "Search" });
    await act(async () => {
      userEvent.type(inputElement, "naruhito");
    });
  });
});
