import { useRef, useState } from 'react'
import './App.css'
import Map from './Map'
import Bookmarks from './Bookmarks'
import { Toaster } from "./components/ui/toaster"
import BookmarkInfo from './BookmarkInfo'
import { Slider } from "./components/ui/slider"

interface Bookmark {
  name: string;
  long: number;
  lat: number;
}

const App: React.FC = () => {

  /**
   * states for toggling views and bookmarks 
   */
  const [bookmarkMode, setBookmarkMode] = useState<boolean>(false);
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [toggleBookmarkInfo, setToggleBookmarkInfo] = useState<boolean>(false);
  const [coords, setCoords] = useState<number[]>([0,0])
  const [year, setYear] = useState<number[]>([2021])

  const mapRef = useRef<maplibregl.Map | null>(null);

  const handleYearChange = (year: number[]) => {
    setYear([year[0]])
  }

  return (
    <>
      {
        toggleBookmarkInfo ? 
          <BookmarkInfo bookmarks={bookmarks} setBookmarks={setBookmarks} setToggleBookmarkInfo={setToggleBookmarkInfo} coords={coords} />
          :
          null
      }
      <div className='absolute z-10 left-16 top-16'>
        <Bookmarks bookmarks={bookmarks} setBookmarks={setBookmarks} setBookmarkMode={setBookmarkMode} mapRef={mapRef} />
      </div>
      <Map year={year} mapRef={mapRef} setCoords={setCoords} setToggleBookmarkInfo={setToggleBookmarkInfo} bookmarkMode={bookmarkMode} setBookMarkMode={setBookmarkMode} />
      <Toaster />
      <div className='absolute z-5 flex items-center justify-center w-full top-10'>
        <div className='bg-slate-700 w-[350px] h-[70px] rounded-3xl flex flex-col justify-evenly items-center'>
          <p className='text-white font-bold'>CO2 Emmissions in: {year}</p>
          <Slider className='w-[300px]' defaultValue={[2021]} onValueChange={handleYearChange} value={year} min={1960} max={2021} step={1}  />
        </div>
      </div>
    </>
  )
}

export default App
