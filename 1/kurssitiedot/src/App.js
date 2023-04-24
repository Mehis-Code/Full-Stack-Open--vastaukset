const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course={course} />
      <Content part={part1} excercises={exercises1}/>
      <Content part={part2} excercises={exercises2}/>
      <Content part={part3} excercises={exercises3}/>
      <Total array={[exercises1, exercises2, exercises3]}/>
    </div>
  )
}

function Header(props){
  return <p>{props.course}</p>
}


function Content(props){
  return <p>{props.part} {props.excercises}</p>
}

function Total(props){
  let i = 0;
  let a = 0;
  while(i < props.array.length){
    a += props.array[i];
    i++;
  }
  return <p>Number of exercises {a}</p>;
}

export default App
