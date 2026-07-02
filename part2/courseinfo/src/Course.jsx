import Header from "./Header"
import Content from "./Content"
import Footer from "./Footer"

const Course = (props) => {
  return (
    <div>
      <Header course={props.course}/>
      <Content course={props.course}/>
      <Footer course={props.course}/>
    </div>
  )
};

export default Course;
