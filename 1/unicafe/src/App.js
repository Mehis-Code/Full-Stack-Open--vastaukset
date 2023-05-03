import { useState } from 'react'

const Button = (props) => {
  return(
  <button onClick={props.handle}>
    {props.text}
  </button>
  )
}

const StatisticLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value} {props.percent}</td>
    </tr>
  )
}

const Statistics = (props) => {
  if (props.asd.clicked == true){
    return (<p>No feedback given</p>)
  }
  const avg = (props.asd.good - props.asd.bad) / props.asd.total
  const pos = (props.asd.good / props.asd.total) * 100
  return(
    <div>
      <table>
        <tbody>
          <StatisticLine text="good" value ={props.asd.good} />
          <StatisticLine text="neutral" value ={props.asd.neutral} />
          <StatisticLine text="bad" value ={props.asd.bad} />
          <StatisticLine text="average" value ={avg} />
          <StatisticLine text="positive" value ={pos} percent={"%"}/>
      </tbody>
      </table>
    </div>
  )
}



const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [clicked, setClick] = useState(true);
  const [total, setTotal] = useState(0)

  const ghandle = () => {
    setClick(false)
    setGood(good + 1)
    setTotal(total + 1)
  }
  
  const nhandle = () => {
    setClick(false)
    setNeutral(neutral + 1)
    setTotal(total + 1)
  }
  
  const bhandle = () => {
    setClick(false)
    setBad(bad + 1)
    setTotal(total + 1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handle={() => ghandle()} text ="good"/>
      <Button handle={() => nhandle()} text ="neutral"/>
      <Button handle={() => bhandle()} text ="bad"/>
      <h1>statistics</h1>
      <Statistics asd={{good, neutral, bad, total, clicked}}/>
    </div>
  )
}

export default App