import { useEffect, useRef } from 'react'
import { useState } from 'react'
import './App.css'
import Details from './components/details'
import { BsMoon } from "react-icons/bs"
import { BsSearch } from "react-icons/bs"


function App() {
  const [data, setData] = useState([])
  const [search, setSearch] = useState(["", ""])
  const [country, setCountry] = useState({})
  const [theme, setTheme] = useState("light-theme")

  const [history, setHistory] = useState([])
  const selectOption = useRef()


  // Getting API //

  const getApi = () => {

    fetch('https://restcountries.com/v3.1/all')
      .then((response) => response.json())
      .then((json) => {
        console.log(json)
        setData(json);
      }
      )

  }



  useEffect(() => {
    getApi()

  }, [])


  // Storing country history //

  useEffect(() => {
    setHistory(prevhistory => [...prevhistory, country])


  }, [country])


  useEffect(() => {

    console.log(history)
  }, [history])


  const handleDelete = () => {
    
    setHistory(prevHistory => {
      prevHistory.pop();
      return prevHistory;
    });

    setCountry(history[history.length - 2])
    setSearch(["", ""])

    console.log(history);
    console.log(country);

  }


  // Setting the theme //

  const handleTheme = () => {

    theme == "light-theme" ? setTheme("dark-theme") : setTheme("light-theme")
  }

  useEffect(() => {

    document.body.className = theme

  }, [theme])


  // Setting the country for the details //


  const handleCountry = (e) => {


    const newcountry = data.filter((item) => { return item.name.common == e.target.value })

    setCountry(newcountry[0])


  }


  // Assigning the original data to the filtered search //

  const filteredSearch = search[0] !== "" || search[1] !== "" ? data.filter(item => { return item.name.common.toLowerCase().includes(search[0].toLowerCase()) && item.region.includes(search[1]) }) : data




  return (
    <>
      <header>
        <h1 onClick={() => { setCountry({}), setSearch(["", ""]) }}>Where in the World?</h1>
        <div onClick={handleTheme} className='theme'><BsMoon className='moon' /><p>{theme == "light-theme" ? "Dark mode" : "Light mode"}</p></div>
      </header>

      {Object.keys(country).length == 0 ?

        <main>
          <div className='search'>
            <div className='countrysearch'><BsSearch className='glass' /><input type="text" label="country" placeholder='Search for a country...' onChange={(e) => setSearch([e.target.value, search[1]])}></input></div>
            <select className='regionsearch' name="region" ref={selectOption} onChange={(e) => setSearch([search[0], e.target.value])}>
              <option value="">Filter by region</option>
              <option value="Africa">Africa</option>
              <option value="America">America</option>
              <option value="Asia">Asia</option>
              <option value="Europe">Europe</option>
              <option value="Oceania">Oceania</option>

            </select>
          </div>

          <div className='flex'>

            {filteredSearch.map((country, i) =>

              <div key={i} onClick={() => setCountry(country)} className='country'>
                <div className='picdiv'><img alt={country.name.common} src={country.flags.svg}></img></div>
                <h2>{country.name.common}</h2>
                <div className='info'>
                  <p><strong>Population:</strong> {country.population.toLocaleString('en-US')}</p>
                  <p><strong>Region:</strong> {country.region}</p>
                  <p><strong>Capital:</strong> {country.capital ? country.capital.join(', ') : "N/A"}</p>
                </div>

              </div>


            )}


          </div>

        </main> : null}

      {country && <Details country={country} handleDelete={handleDelete} data={data} handleCountry={handleCountry} />}

    </>
  )
}

export default App
