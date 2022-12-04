import React, { useState } from 'react'
import useFetch from './useFetch'
import { FaSearch } from 'react-icons/fa';

import Header from './Header'
import Artical from './Artical'
import Lodding from './Lodding';


const Home = () => {
  
    //------useState('bn') because initial= language is bangla
    const[selectLangusge,setSelectLanguage] = useState('bn') 

    //------data fetching by useFetch Custom hook
    const{data,isLodding,error,filterDatra,setFilterData} = useFetch(`https://cdn.jsdelivr.net/npm/quran-json@3.1.2/dist/quran_${selectLangusge}.json`)
  
    //-----language change Function
    const ifSelected = (e)=>{
      setSelectLanguage(e.target.value);
    }
 
    const ifChanged = (e)=>{
      let value = (e.target.value).toLowerCase();

      const FilterSura = data.filter(sura=>{

        var suraName = sura.transliteration.toLowerCase() 
        return suraName.startsWith(value) 

      })
      setFilterData(FilterSura)

    }
    return (
    <main>
   {/*---------------------------------- Nvigation bar -----------------------*/}
      <nav className='navigation-Bar'>
        <div className='nav-element'>
          <span className='page-logo'>
            Holy Quran
          </span>         
        </div>

        {/*-------------------- Language Select div ----------------*/}
        <div className='nav-element'>  
          <select className='element' onChange={ifSelected}>
             <option value="" disabled selected hidden>Language</option>
             <option value="bn" >Bengali</option>
             <option value="en" >English</option>
             <option value="ur" >Urdu</option>
             <option value="ru" >Russian</option>
             <option value="zh" >Chinese</option>
             <option value="tr" >Turkish</option>
             <option value="id" >Indonesian</option>
             <option value="sv" >Swedish</option>
             <option value="es" >Spanish</option>
             <option value="fr" >French</option>         
          </select>
        </div>
      </nav>
    

 {/*----------------------------- Header section ---------------------------*/}
     <header className='header-section'>
       <Header />
       <div className='searchBar'>
       <input 
          className='searchBar' 
          type='text' name='search' 
          placeholder='search with surahnName.....' 
          onChange={ifChanged} 
          />

       {/*----icon form react-icons----*/}
       <FaSearch className='icon' /> 
       </div>

     </header>

 {/*----------------------------- All block & sura name ---------------------------*/}
      <section className='suraBlogs'>

      {/*------------------Error Handling Section----------------- */}
        {error && <p>Please check your internet speed. @reload me</p>}

      {/*---------------------Mapping All Sura Title& Number& translation----------------------*/}

    {
      filterDatra && filterDatra.map(ayat=>{

      return  <Artical AllAyat={ayat} />

        })
      }

        </section>

      {/*------------------Lodding Section----------------- */}
        {isLodding && <Lodding /> }
        {isLodding && <Lodding /> }

  </main>
  )
}

export default Home
