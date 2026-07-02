const Footer = (props) => {
  const courses = props.course.parts;
  const sumOfExercises = courses.reduce(
    (accum, currentValue) => accum + currentValue.exercises,
    0,
  );
  return <p>total of {sumOfExercises} exercises</p>;
};

export default Footer;
