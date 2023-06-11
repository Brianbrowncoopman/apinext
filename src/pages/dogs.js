import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Dogs() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    const url =
      "https://dogs-by-api-ninjas.p.rapidapi.com/v1/dogs?name=" + searchTerm;

    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "8d7a6496c5mshfd261d37b59d95dp11ae08jsn87d40cf74972",
        "X-RapidAPI-Host": "dogs-by-api-ninjas.p.rapidapi.com",
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
        <h1>Perros</h1>
        <Link href="/">Regresar</Link>
        <h2>Escribe el nombre del perro</h2>
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          placeholder="Ingrese el nombre del perro"
        />
        <button onClick={handleSearch}>Buscar</button>
        {Array.isArray(searchResult) && searchResult.length > 0 ? (
          searchResult.map((animal) => (
            <div key={animal.name}>
              <h2>Nombre: {animal.name}</h2>
              <p>esperanza de vida: {animal.max_life_expectancy} años</p>
              {/*{animal.image_link && (
                <Image
                  src={animal.image_link}
                  width={100}
                  height={100}
                  alt={animal.name}
                />
              )}*/}
              <img src={animal.image_link} alt="Imagen del perro" />
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
