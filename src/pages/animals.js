import { useState, useEffect } from "react";
import Link from "next/link";

export default function Animals() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    const url =
      "https://animals-by-api-ninjas.p.rapidapi.com/v1/animals?name=" +
      searchTerm;

    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "8d7a6496c5mshfd261d37b59d95dp11ae08jsn87d40cf74972",
        "X-RapidAPI-Host": "animals-by-api-ninjas.p.rapidapi.com",
      },
    };

    fetch(url, options)
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        setData(response || []);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [searchTerm]);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    const filteredData = data.filter((animal) =>
      animal.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResult(filteredData);
  };

  return (
    <>
      <main>
        <h1>Animales</h1>
        <Link href="/">regresar</Link>
        <h2>Escribe el nombre del animal</h2>
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          placeholder="Ingrese el nombre del animal"
        />
        <button onClick={handleSearch}>Buscar</button>
        {Array.isArray(searchResult) && searchResult.length > 0 ? (
          searchResult.map((animal) => (
            <div key={animal.name}>
              <h2>Name:{animal.name}</h2>
              <p>Color:{animal.characteristics.color}</p>
              <h3>Diet:{animal.characteristics.diet}</h3>
              <h3>Esperanza de vida:{animal.characteristics.lifespan}</h3>
              <h3>Conocido como:{animal.characteristics.slogan}</h3>
              <h3>Uvicacion:{animal.locations}</h3>
              <h3>Nombre sientifico:{animal.taxonomy.scientific_name}</h3>
              {/* Otros detalles del animal */}
              <br />
            </div>
          ))
        ) : (
          <p>No se encontraron resultados.</p>
        )}
        <Link href="/">Regresar</Link>
      </main>
    </>
  );
}
