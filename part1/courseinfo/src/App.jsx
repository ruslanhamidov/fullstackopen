import Header from "./Header"
import Content from "./Content"
import Footer from "./Footer"

const App = () => {
  const course = 'Half Stack application development'

  return (
    <div>
      <Header course={course}/>
      <Content />
      <Footer />
    </div>
  )
}

export default App