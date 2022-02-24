import React from "react"; // импоритруем платформу реакт
import Info from "./components/info"; //импортируем компоненты т.е. другие js файлы с html кодом
import Form from "./components/form";
import Weather from "./components/weather";

const API_KEY = "76848c4b0e72a07fae20169958776e3e"; //API взят с сайта

class App extends React.Component {
  gettingWeather = async (e)=> { // async получение информации асинхронно без обновления страницу
    e.preventDefault();
    const api_url = await fetch(`api.openweathermap.org/data/2.5/weather?q=Moscow&appid=${API_KEY}&units=metric`);// константа для ссылки где получаем json информацию fetch для прохождения 
    // по всему URL
    const data = await api_url.json(); // занесение json информации в переменную
    console.log(data);
  }
  render(){
    return(
      <div>
        {/* вызов компонентов */}
        <Info/> 
        <Form weatherMethot= {this.gettingWeather}/>
        <Weather/>
      </div>
    );
  }
}

export default App;