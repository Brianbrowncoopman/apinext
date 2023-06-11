import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Planets() {
  const [data, setData] = useState();

  const url = "https://planets-info-by-newbapi.p.rapidapi.com/api/v1/planets/";

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "8d7a6496c5mshfd261d37b59d95dp11ae08jsn87d40cf74972",
        "X-RapidAPI-Host": "planets-info-by-newbapi.p.rapidapi.com",
      },
    };

    fetch(url, options)
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        setData(response);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <>
      <main>
        <h1>Planets</h1>

        <Link href="/">regresar</Link>
        {Array.isArray(data) && data.length > 0 ? (
          data.map((d) => (
            <div key={d.id}>
              <h2>{d.name}</h2>
              <p>{d.description}</p>
              <div>
                <h4>{d.basicDetails.mass}</h4>
                <h4>{d.basicDetails.volume}</h4>
              </div>

              {d.imgSrc && (
                <Image
                  src={d.imgSrc.img}
                  width={100}
                  height={100}
                  alt={d.name}
                />
              )}
              <h4>{d.wikiLink}</h4>
            </div>
          ))
        ) : (
          <p>Loading...</p>
        )}
        <Link href="/">regresar</Link>
      </main>
    </>
  );
}
