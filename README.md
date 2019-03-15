Live here: www.graceprovost.com

Objective
===

Create a personal website that demonstrates my design and application capabilities. Keep it brief and sleek.
Use:
  - React
  - Webpack
  - Netlify for hosting
  - CSS with pre / post processors
  - Intersection observer API
  - Github API
  - Responsive image loading
  - Mobile first / responsive design
  - Jest to test

Steps Taken
===

Research other personal websites that I find well done. Take parts from those and implement my own versions of them, such as grey / dark grey / white backgrounds to denote sections, buttons with auto-scroll, a jumbo image of myself.

Research and implement Github API so the number of applications I have created will automatically update. Test functions created using Jest. Create a cache in local storage to store results since it takes ~10 seconds to retrieve all of the data. Check the cache date when a user visits the page; if it is over a month old, refresh the data.

Research and implement IntersectionObserver API so I can keep track of what section the user is viewing; the auto-scroll buttons will update to match. Also works with page refresh!

### Update 3/14/19

Convert website to use react hooks! Difficult parts: recognizing that `forwardRef` was needed for my `withIntersectionObserver` HOC, nesting react-hooks within other functions is anti-pattern.
References:
- [A Complete Guide to useEffect](https://overreacted.io/a-complete-guide-to-useeffect/)
- [How to Fetch Data with React Hooks](https://www.robinwieruch.de/react-hooks-fetch-data/)
- [Redux-like app with React Hooks](https://medium.com/yld-engineering-blog/rolling-your-own-redux-with-react-hooks-and-context-bbeea18b1253)
- [useContext & useReducer](https://medium.com/crowdbotics/how-to-use-usereducer-in-react-hooks-for-performance-optimization-ecafca9e7bf5)
- [useReducer with useMemo example](https://github.com/reactjs/reactjs.org/issues/1604#issuecomment-458878841)
- [react-redux useRedux issues](https://github.com/reduxjs/react-redux/issues/1177) 
- [hooks-rules](https://reactjs.org/docs/hooks-rules.html#explanation)