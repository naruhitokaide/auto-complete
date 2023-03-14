1. What is the difference between Component and PureComponent? give an example where it might break my app.

The main difference between Component and PureComponet is that PureComponent implements shouldComponentUpdate with a shallow comparison on props and state, while Component does not. If you are using a Component and you are expecting a shallow comparison on props and state, it may break your app because the Component will re-render every time there is a change in props or state, even if the change is not relevant to the component. For example, if you have a component that displays a counter, and the counter is stored in state, but the component does not use the counter, it will still re-render every time the counter changes. This may cause performance issues as the component is unnecessarily re-rendering.

2. Context + ShouldComponentUpdate might be dangerous. Can think of why is that?

Context and ShouldComponentUpdate can be dangerous when used together because the context might not be updated correctly. If the context is not updated correctly, the component might not re-render when it should, leading to unexpected behavior. This can be particularly problematic if the component is relying on context values for important state or UI updates.

3. Describe 3 ways to pass information from a component to its PARENT

  - Callback Functions: A callback function is a function that is passed as an argment to another function and is executed after some kind of event. In React, callback functions can be used to pass information from a child component to its parent. 
  - Props: Props are a way of passing data from a parent component to a child component. They are read-only and should not be modified within the child component. 
  - State: State is a way of storing data in a React component. It can be used to pass data from a parent component to a child component.

4. Give 2 ways to prevent components from re-rendering

  - Use React.memo() Reat.memo is a higher order component, which is used to wrap functional components and only re-render them when the props passed to them change. -
  - Use shouldComponentUpdate() shouldComponentUpdate() is a lifecycle method that is invoked before a component re-renders. It is used to check if the component should re-render or not. If shouldComponentUpdate() returns false, the component will not re-render.

5. What is a fragment and why do we need it? Give an example where it might break my app

A fragment is a reusable portion of an Android application's user interface. Fragments are typically used within activities to provide a more modular design and to improve the user experience by allowing for more dynamic and flexible layouts. For example, if a user is viewing an image in an app and needs to access a menu, a fragment can be used to display the menu without having to navigate away from the image. However, if the fragment is not properly implemented, it can break the app. For example, if the fragment is not properly attached to the activity, the app may crash when the user attempts to access the menu.

6. Give 3 examples of the HOC pattern

  - Error handling: A HOC can be used to wrap a component and handle any errors that occur during the rendering of the component.
  - Authentication: A HOC (higher-order component) can be used to wrap a component and check if the user is authenticated before allowing them to view the component. 
  - Data fetching: A HOC can be used to wrap a component and fetch data from an API before rendering the component. 

7. what's the difference in handling exceptions in promises, callbacks and async...await

When handling exceptions in promises, the exception is caught with a .catch() block and can be handled by returning a rejected promise or throwing an error. When handling exceptions in callbacks, the exception is caught with a try/catch block and can be handled by passing an error to the callback. When handling exceptions in async...await, the exception is caught with a try/catch block and can be handled by returning a rejected promise or throwing an error.

8. How many arguments does setState take and why is it async

setState takes two arguments: an object that contains the changes to be made to the state and an optional callback function that will be executed after the state has been updated. setState is asynchronous because it batches multiple setState calls into a single update and executes them asynchronously in order to avoid unnecessary re-renders.

9. List the steps needed to migrate a Class to Function Component

  - Identify components that need to be migrated. 
  - convert class component to function component. 
  - Replace class component lifecycle methods with React hooks.
  - Replace class component state with React useState hook. 
  - props with React useProps hook. 
  - refs with React useRef hook. 
  - context with React useContext hook. 
  - event handlers with React useEffect hook. 
  - contextType with React useContext hook. 
  - static methods with React useCallback hook.
  - Test the component to ensure it works as expected.

10. List a few ways styles can be used with components.

  - Inline styling: Inline styling involves adding a style attribute to a component, and using it to define the component’s style. -
  - CSS Modules: CSS modules allow you to write CSS that is scoped to a single component, so that it only affects the component it is written for.
  - CSS-in-JS: CSS-in-JS involves writing CSS directly inside the component’s JavaScript code, allowing for a more dynamic approach to styling.
  - Styled Components: Styled components allow you to create a component with a specific style already applied to it. 
  - External Stylesheets: External stylesheets allow you to write styles that can be applied to multiple components, making them easier to maintain.

11. How to render an HTML string coming from the server

In order to render an HTML string coming from the server, you will need to use a library such as React or Vue.js. These libraries will allow you to take the HTML string and render it as a DOM element on the page. You can then manipulate the DOM element as you would any other element on the page.
  
