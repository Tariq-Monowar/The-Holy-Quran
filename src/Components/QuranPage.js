import React, { useState } from 'react'
import { FaHome } from 'react-icons/fa';
import { useLocation, useParams, useNavigate, Link  } from 'react-router-dom'


import './QuranPsge.css'
const QuranPage = () => {
    const {} = useParams()
    const location = useLocation()
    const navigation = useNavigate()

    const[ayatNumberData,setAyatNumberData] = useState(location.state.verses)
    const[FilterayatNumberData,setFilterAyatNumberData] = useState(ayatNumberData)

    //Persian to English digits.
    function toEnglishDigits(str) {
      const persianNumbers = ["۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹", "۰"]
      const arabicNumbers = ["١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩", "٠"]
      const englishNumbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"]
      return str.split("").map(c =>  persianNumbers[englishNumbers.indexOf(c)] ||
        arabicNumbers[englishNumbers.indexOf(c)] || c).join("")
     }

    const ifChange=(e)=>{
      let value = (e.target.value)
      console.log(value);
      const FilterSura = ayatNumberData.filter(sura=>{

        var suraName = sura.id.toString()
        return suraName.startsWith(value) 
           
      })
      setFilterAyatNumberData(FilterSura)
    }

  return (
    <main className='quranPageBody'>
    
      <nav className='navigation'>
        <div className='suraIdentify'>
          <div className='nav-element select'>

        {/* --------Quran ayat number for searching a particular ayat------ */}
          <select className='elements' onChange={ifChange} >
             <option value="" disabled selected hidden>Search</option>
            {
              ayatNumberData.map(ayatNumber=>{
                const {id} = ayatNumber
                return <option key={id} value={id} > 
                      <Link>{id}</Link> 
                  </option>
              })
            }
          
          </select>

        </div>
        </div>
        
        {/*---------------- Sura Name page Navbar--------------- */}
        <div className='suraNameBox'>
          <h1 className='SuraName'>
            <span className='suraNameStyle'>⋯⊱</span> 
            {location.state.name} 
            <span className='suraNameStyle'>⊰⋯</span>
          </h1>
        </div>
       
        {/*---------------Re rendering Home Button for Goto Home---------------*/}
        <FaHome onClick={()=>navigation(-1)} className='GotoHome' />
      </nav>

      {/* ----------------All Ayat Mapping Section------------*/}

      <div className='pageContainer'> 
        {
         FilterayatNumberData.map(ayat=>{
            const{id,text,translation} = ayat
             return <article className='ayatBlog' key={id}>
              
              <p className='ayatArabic'> 
                {text}
                <span className='ArabicAyatNumbers'>{toEnglishDigits(` (${id})`)}</span>
              </p>
        
              <p className='ayatTranslation'>
                <span className='AyatNumberID'>({id}) </span>
                 {translation}
               </p>        
                
             </article> 
          })
        }
       </div>
    </main>
  )
}

export default QuranPage
