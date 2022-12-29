import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const USERS_API = "https://restcountries.com/v2/all";
  const [data, setdata] = useState([]);
  useEffect(() => {
    fetch(USERS_API)
      .then((res) => res.json())
      .then((data) => setdata(data));
  }, []);

  // Search
  const hangleSearch = (e) => {
    fetch(USERS_API)
      .then((res) => res.json())
      .then((data) => {
        const search = data.filter((item) => {
          return item.name.toLowerCase().includes(e.target.value.toLowerCase());
        });
        setdata(search);
        if (search === []) {
          alert("No country found");
        }
        console.log(search);
      });
  };
  const handleSortbyNameAsc = () => {
    setdata(data.sort((a, b) => (a.name > b.name ? 1 : -1)).slice());
  };
  const handleSortbyNameDes = () => {
    setdata(data.sort((a, b) => (b.name > a.name ? 1 : -1)).slice());
  };
  const handleSortbypopulationAsc = () => {
    setdata(data.sort((a, b) => a.population - b.population).slice());
  };
  const handleSortbypopulationDes = () => {
    setdata(data.sort((a, b) => b.population - a.population).slice());
  };
  return (
    <div className="App">
      <div className="body">
        <h1>Country List</h1>
        <p>* Showing 250 countries</p>
        <br />
        <input
          type="search"
          placeholder="Search by name..."
          onChange={(e) => hangleSearch(e)}
        />
        <br />
        <div className="filterButtons">
          <button onClick={handleSortbyNameAsc}>A-Z</button>
          <button onClick={handleSortbyNameDes}>Z-A</button>
          <button onClick={handleSortbypopulationAsc}>Population(artan)</button>
          <button onClick={handleSortbypopulationDes}>
            Population(azalan)
          </button>
        </div>
        <br />
        <div className="container">
          {data.map((item, i) => (
            <div className="card" key={i}>
              <img src={item.flag} alt="" />
              <h3>{item.name}</h3>
              <p>Capital: {item.capital}</p>
              <p>Region: {item.region}</p>
              <p>Population: {item.population}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
