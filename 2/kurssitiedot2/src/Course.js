const Course = (props) => {
    return (
      <>
      <Header value={props} />
      <Content value={props} />
      </>
    )
    }

const Part = (props) => {
    return <>{props.con}</>
}


const Header = (props) => {
    return <h2>{props.value.course.name}</h2>
}

const Total = (props) => {
    const c = props.con.value.course.parts;
    const lasku = c.reduce( (accu, curr) => {return accu + curr.exercises}, 0)
    return <p><b>total of {lasku} excercises</b></p>;
}

const Content = (props) => {
    const a = props.value.course.parts;
    const b =  a.map(i => <p key= {i.id} >{i.name} {i.exercises}</p>)
    return (
    <>
    <Part con={b}/>
    <Total con={props}/>
    </>
    )
}
            

export default Course