import Part from "./Part";

const Content = (props) => {
  const courses = props.course.parts;
  return (
    <div>
      {courses.map((course) => (
        <Part name={course.name} exercises={course.exercises} />
      ))}
    </div>
  );
};

export default Content;
