// import { useEffect, useRef, useState } from 'react';
// import './App.css';
// import useFetch from './hooks/useFetch';
// import LocationInfo from './components/LocationInfo';
// import Resident from './components/Resident';

// function App() {
//   const [inputValue, setInputValue] = useState(Math.floor(Math.random() * 126) + 1);
//   const [location, getLocation, isLoading, hasError] = useFetch();

//   useEffect(() => {
//     const url = `https://rickandmortyapi.com/api/location/${inputValue}`;
//     getLocation(url);
//   }, [inputValue]);

//   const textInput = useRef();

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     const newInputValue = textInput.current.value.toLowerCase().trim();
//     if (newInputValue !== '') {
//       setInputValue(newInputValue);
//     } else {
//       console.log('La búsqueda está vacía');
//     }
//     textInput.current.value = '';
//   };

//   return (
//     <>
//       {isLoading ? (
//         <h2>Loading...</h2>
//       ) : (
//         <div className='app'>
//           <h1>Rick & Morty API</h1>
//           <form className='app__form' onSubmit={handleSubmit}>
//             <input className='app__input' type="text" ref={textInput} />
//             <button className='app__btn'>Search location</button>
//           </form>
//           {hasError || inputValue === '0' ? (
//             <h2>Hey! you must provide an id from 1 to 126</h2>
//           ) : (
//             <>
//               <LocationInfo
//                 location={location}
//               />
//               <div className='app__container'>
//                 {location?.residents.map(resident => (
//                   <Resident
//                     key={resident}
//                     url={resident}
//                   />
//                 ))}
//               </div>
//             </>
//           )}
//         </div>
//       )}
//     </>
//   );
// }

// export default App;


import { useEffect, useRef, useState } from 'react'
import './App.css'
import useFetch from './hooks/useFetch'
import LocationInfo from './components/LocationInfo'
import Resident from './components/Resident'

function App () {
  const [inputValue, setInputValue] = useState(Math.floor(Math.random() * 126) + 1)
  const [location, getLocation, isLoading, hasError] = useFetch()
  const [currentPage, setCurrentPage] = useState(1)
  const residentsPerPage = 10

  useEffect(() => {
    const url = `https://rickandmortyapi.com/api/location/${inputValue}`
    getLocation(url)
  }, [inputValue])

  const textInput = useRef()

  const handleSubmit = (event) => {
    event.preventDefault()
    const newInputValue = textInput.current.value.toLowerCase().trim()

    if (!isNaN(newInputValue) && parseInt(newInputValue) > 0) {
      setInputValue(newInputValue)
    } else {
      console.log('Debes proporcionar un número válido y positivo')
    }
    textInput.current.value = ''
  }


  // Calcular índices de los residentes que se mostrarán en la página actual
  const indexOfLastResident = currentPage * residentsPerPage
  const indexOfFirstResident = indexOfLastResident - residentsPerPage
  const currentResidents = location?.residents.slice(indexOfFirstResident, indexOfLastResident)

  // Cambiar de página
  const paginate = pageNumber => {
    // Validar si el número de página está dentro del rango de páginas
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber)
    }
  }


  // Calcular el total de páginas
  const totalPages = Math.ceil(location?.residents.length / residentsPerPage)

  return (
    <>
      {isLoading ? (
        <h2>Loading...</h2>
      ) : (
        <div className='app'>
          <img src='../assets/frame259.png' alt='Navbar' className='navbar__img' />
          <form className='app__form' onSubmit={handleSubmit}>
            <input className='app__input' type="text" ref={textInput} />
            <button className='app__btn'>Search location</button>
          </form>
          {hasError || inputValue === '0' ? (
            <h2>Hey! you must provide an id from 1 to 126</h2>
          ) : (
            <>
              <LocationInfo
                location={location}
              />
              {totalPages > 1 && (
                <div className="pagination">
                  <button onClick={() => paginate(1)}>First</button>
                  <button onClick={() => paginate(currentPage - 1)}>Previous</button>
                  <span>{currentPage} of {totalPages}</span>
                  <button onClick={() => paginate(currentPage + 1)}>Next</button>
                  <button onClick={() => paginate(totalPages)}>Last</button>
                </div>
              )}
              <div className='app__container'>
                {currentResidents.map(resident => (
                  <Resident
                    key={resident}
                    url={resident}
                  />
                ))}
              </div>
              {totalPages > 1 && (
                <div className="pagination">
                  <button onClick={() => paginate(1)}>First</button>
                  <button onClick={() => paginate(currentPage - 1)}>Previous</button>
                  <span>{currentPage} of {totalPages}</span>
                  <button onClick={() => paginate(currentPage + 1)}>Next</button>
                  <button onClick={() => paginate(totalPages)}>Last</button>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </>
  )
}

export default App
