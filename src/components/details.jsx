
import { BsArrowLeft } from "react-icons/bs"

function Details({ country, handleDelete, data, handleCountry }) {


const borders = data.filter(object => { 
    return country.borders && country.borders.includes(object.cca3);
  });

  const filteredborders = borders.map(object => object.name.common)


    return (
        <>
            {Object.keys(country).length > 0 &&

                <div>

                    <div className="back" onClick={handleDelete}><BsArrowLeft className="arrow" /><p>Back</p></div>

                    <div className="wrapper">
                        <div className="image"><img src={country.flags.svg} alt={country}></img></div>

                        <div >
                            <div className="name"><h2>{country.name.common}</h2></div>
                             <div className="columns">
                                <div>
                                    <p><strong>Native name:</strong> {country.name.official}</p> 
                                    <p><strong>Population:</strong> {country.population.toLocaleString('en-US')}</p>
                                    <p><strong>Region:</strong> {country.region} </p>
                                    <p><strong>Sub Region:</strong> {country.subregion}</p>
                                    <p><strong>Capital:</strong> {country.capital ? country.capital.join(', ') : "N/A"}</p>
                                </div>

                                <div>
                                    <p><strong>Top level domain:</strong> {country.tld}</p>
                                    <p><strong>Currencies:</strong> {country.currencies && country.currencies[Object.keys(country.currencies)[0]].name}</p>
                                    <p><strong>Languages:</strong> {Object.values(country.languages).join(', ')}</p>

                                    
                                </div>

                               

                            </div>
                            <div className="bordercountries"><p><strong>Border Countries:</strong></p><div className="borders">{filteredborders.length > 0 ? filteredborders.map((country, i) => <div><button  key={country} value={country} onClick={(e) => handleCountry(e)}>{country}</button></div>) : <p>N/A</p>}</div></div>

                        </div>
                    </div>

                </div>


            }
        </>
    )
}


export default Details;