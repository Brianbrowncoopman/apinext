import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Music() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const url = `https://spotify23.p.rapidapi.com/search/?q=${searchTerm}&type=multi&offset=0&limit=10&numberOfTopResults=15`;

      const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Key":
            "8d7a6496c5mshfd261d37b59d95dp11ae08jsn87d40cf74972",
          "X-RapidAPI-Host": "spotify23.p.rapidapi.com",
        },
      };

      try {
        const response = await fetch(url, options);
        const responseData = await response.json();
        console.log(responseData);
        setData(responseData.albums?.items || []);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [searchTerm]);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    const filteredData = data.filter((album) =>
      album.data.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResult(filteredData);
  };

  return (
    <>
      <main>
        <h1>Music</h1>
        <Link href="/">Regresar</Link>
        <h2>Escribe el nombre del grupo o solista</h2>
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          placeholder="Ingrese el nombre del grupo o solista"
        />

        <button onClick={handleSearch}>Buscar</button>
        {Array.isArray(searchResult) && searchResult.length > 0 ? (
          searchResult.map((album, index) => (
            <div key={index}>
              <h3>Nombre del álbum: {album.data.name}...</h3>
              {album.date && <p>Año de lanzamiento: {album.date.year}</p>}

              {album.data.artists?.items.map((artist) => (
                <div key={artist.uri}>
                  {/*<p>Nombre del artista: {artist.profile?.name}</p>*/}
                  {/*<p>URI del artista: {artist.uri}</p>*/}
                </div>
              ))}

              <h3>Portada:</h3>

              {album.data.coverArt?.sources.length > 0 && (
                <div>
                  <img
                    src={album.data.coverArt.sources[0].url}
                    alt="Imagen del disco"
                    width={album.data.coverArt.sources[0].width}
                    height={album.data.coverArt.sources[0].height}
                  />
                </div>
              )}

              <h3>descripcion</h3>
              <div>
                <p>{album.description}</p>
              </div>

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

{
  /*se supero los request del mes de la api */
}
