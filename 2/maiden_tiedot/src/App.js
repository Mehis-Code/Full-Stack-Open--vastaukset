import React, { useState, useEffect } from 'react';
import axios from 'axios'

const App = () => {
  const [lands, setLands] = useState([])
  const [lanFil, setLanFil] = useState([])
  const [word, setWord] = useState('')
  const [many, setMany] = useState(true)
  const [show, setShow] = useState(false)

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all').then(response => {
    setLands(response.data)
    setLanFil(response.data)
  });
  }, [])



  return (
    <div>
      <Filter lands={lands} word={word} setWord={setWord} setLanFil={setLanFil} lanFil={lanFil}
      show={show} many={many} setMany={setMany} setShow={setShow}/>
      <Country show={show} lanFil={lanFil} />
    </div>
  )
}

const Country = ({show, lanFil}) => {
  const api_key = process.env.REACT_APP_API_KEY
  const [wind, setWind] = useState('')
  const [cels, setCels] = useState('')
  const [img_add, setImg] = useState('')

  if (show) {
    const coun = lanFil[0]
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${coun.name.common}&units=metric&appid=${api_key}`)
    .then(response => {
      setWind(response.data.wind.speed)
      setCels(response.data.main.temp)
      setImg(response.data.weather[0].icon)
    }).catch(error => 
      console.log(error, "virhe tapahtui"))

    return (<div>
      <h2>{coun.name.common}</h2>
      <p>{coun.capital}</p>
      <p>area {coun.area}</p>
      <h3>languages</h3>
      <ul>
      {Object.values(coun.languages).map((language, index) => (
            <li key={index}>{language}</li>
          ))}
      </ul>
      <img src={coun.flags.png} alt="asd" />
      <h3>Weather in {coun.capital}</h3>
      <p>temperature {cels} Celsius</p>
      <img alt="noup" src={`https://openweathermap.org/img/wn/${img_add}@2x.png`}/>
      <p>wind {wind} m/s</p>
    </div>)
  }
  else {
    return null
  }
}

const Filter = ({lands, word, setWord, setLanFil, lanFil, many, setMany, setShow, show}) => {
  const handle = (event) => {
    setWord(event.target.value)
    const filtArray = lands.filter((x) => x.name.common.toLowerCase().includes(event.target.value.toLowerCase()));
    const isit = filtArray.length > 10 ? true : false
    const showing = filtArray.length === 1 ? true : false
    setShow(showing)
    setMany(isit)
    setLanFil(filtArray.splice(0,10))

  }

  const dos = (x) => {
    const filteredCountry = lands.filter((country) => country.name.common === x.name.common);
    setLanFil(filteredCountry);
    setShow(true);
  };

  return (
    <div>
      find countries
      <input onChange={handle} value={word} />

      {!show ? (
        many ? (
          <p>Too many matches, specify another filter</p>
        ) : (
          lanFil.map((x) => <p key={x.name.common}>{x.name.common} <button onClick={() => dos(x)}>ASD</button></p>)
        )
      ) : null}
    </div>
  );
};
export default App