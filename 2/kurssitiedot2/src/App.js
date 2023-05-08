const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course} />
      <Content parts={course} /> 
      <Total parts={course} />
    </div>
  )
}

function Header(props){
  return <p>{props.course.name}</p>
}

function Content(props){
  let a = props.parts.parts
  return  a.map(i => <p>{i.name} {i.exercises}</p>
  );
}

function Total(props){
  const a = props.parts.parts;
  let lasku = 0;
  a.forEach(x => lasku += x.exercises);
  return <p>Number of exercises {lasku}</p>;
}

export default App
