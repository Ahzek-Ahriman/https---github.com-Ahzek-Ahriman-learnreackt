import React from "react"; // импоритруем платформу реакт
import Info from "./components/info"; //импортируем компоненты т.е. другие js файлы с html кодом
import Form from "./components/form";
import Weather from "./components/weather";

const API_KEY = "76848c4b0e72a07fae20169958776e3e"; //API взят с сайта

class App extends React.Component {

  state = {
    temp: undefined,
    city: undefined,
    country: undefined,
    pressure: undefined,
    sunrise: undefined,
    sunset: undefined,
    error: undefined,
  }

  gettingWeather = async (e)=> { // async получение информации асинхронно без обновления страницу
    e.preventDefault();
    let city = e.target.elements.city.value;
   
    if(city){
      const api_url = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`);// константа для ссылки где получаем json информацию fetch для прохождения 
      // по всему URL
      const data = await api_url.json(); // занесение json информации в переменную
      
      let sunset = data.sys.sunset;
      let date = new Date(sunset);
      date.setTime(sunset * 1000);
      let sunset_date = date.getHours() + ":" +  date.getMinutes() + ":" + date.getSeconds();
      
      let sunrise = data.sys.sunrise;
      let r_date = new Date();
      r_date.setTime(sunrise * 1000);
      let sunrise_date = r_date.getHours() + ":" + r_date.getMinutes() + ":" + r_date.getSeconds();
      
      let temper = data.main.temp - 273.15
      let press = data.main.pressure/1.33

      this.setState({
        temp: temper.toFixed(2),
        city: data.name,
        country:data.sys.country,
        pressure: press.toFixed(2),
        sunrise:sunrise_date,
        sunset:sunset_date,
        error: undefined,
        });
      } else{
      this.setState({
        temp: undefined,
        city: undefined,
        country: undefined,
        pressure: undefined,
        sunrise: undefined,
        sunset: undefined,
        error: "Enter city's name"});
      
    }
  } 
  render(){
    return(
      <div className = "wrapper">
        <div className="main">
          <div className="container">
            <div className="row">
              <div className="col-sm-5 info">
                <Info/> 
              </div>

              <div className = "col-sm-7 form">
                  <Form weatherMethot= {this.gettingWeather}/>
                  <Weather
                    temp={this.state.temp} 
                    city={this.state.city}
                    country={this.state.country}
                    pressure={this.state.pressure}
                    sunrise={this.state.sunrise}
                    sunset={this.state.sunset}
                    error={this.state.error}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;