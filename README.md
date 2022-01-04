Live here: www.ashprovost.com

Objective
===

Create a personal website that demonstrates my design and application capabilities. Keep it brief and sleek.
Use:
  - Typescript
  - React
  - Redux
  - Webpack
  - React Testing Library
  - Netlify for hosting
  - CSS with pre / post processors
  - Intersection observer API
  - Github API
  - Responsive image loading
  - Mobile first / responsive design

Steps Taken
===

Research other personal websites that I find well done. Take parts from those and implement my own versions of them, such as grey / dark grey / white backgrounds to denote sections, buttons with auto-scroll, a jumbo image of myself.

Research and implement Github API so the number of applications I have created will automatically update. Test functions created using Jest. Create a cache in local storage to store results since it takes ~10 seconds to retrieve all of the data. Check the cache date when a user visits the page; if it is over a month old, refresh the data.

Research and implement IntersectionObserver API so I can keep track of what section the user is viewing; the auto-scroll buttons will update to match. Also works with page refresh!

### Update 02/2021

Convert codebase to typescript!

Difficult parts: Typing my handrolled version of a thunk middleware in `AppContext.tsx`. Otherwise most of it went pretty smooth.

References:
- [React Context with useReducer and Typescript](https://dev.to/elisealcala/react-context-with-usereducer-and-typescript-4obm)
- [SVG files as React Components in TypeScript](https://duncanleung.com/typescript-module-declearation-svg-img-assets/)
- [Typescript React Github cheatsheets](https://github.com/typescript-cheatsheets/react)
- [createContext / useReducer Typescript Github examples](https://gist.github.com/sw-yx/f18fe6dd4c43fddb3a4971e80114a052)
- [IntersectionObserver with React Hooks and Typescript](https://www.darrencoxall.com/react/intersection-observer-component/)

### Update 3/14/19

Convert website to use react hooks!

Difficult parts: recognizing that `forwardRef` was needed for my `withIntersectionObserver` HOC, nesting react-hooks within other functions is an anti-pattern, hooks themselves cannot be async (can get around with an async function inside the hook), hooks can only be called inside of a function component (harder to unit test).

References:
- [A Complete Guide to useEffect](https://overreacted.io/a-complete-guide-to-useeffect/)
- [How to Fetch Data with React Hooks](https://www.robinwieruch.de/react-hooks-fetch-data/)
- [Redux-like app with React Hooks](https://medium.com/yld-engineering-blog/rolling-your-own-redux-with-react-hooks-and-context-bbeea18b1253)
- [useContext & useReducer](https://medium.com/crowdbotics/how-to-use-usereducer-in-react-hooks-for-performance-optimization-ecafca9e7bf5)
- [useReducer with useMemo example](https://github.com/reactjs/reactjs.org/issues/1604#issuecomment-458878841)
- [react-redux useRedux issues](https://github.com/reduxjs/react-redux/issues/1177)
- [hooks-rules](https://reactjs.org/docs/hooks-rules.html#explanation)
