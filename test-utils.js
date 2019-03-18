const rtl = require('react-testing-library');
const AppContext = require('./components/app-context/AppContext.js');

const AllTheProviders = ({ children }) => {
  return (
    <AppContext> 
        {children}
    </AppContext>
  )
}

const customRender = (ui, options) =>
  rtl.render(ui, {
    wrapper: AllTheProviders,
    ...options,
  })

module.exports = {
  ...rtl,
  render: customRender,
}