import searchIcon from '../assets/images/dark-theme-search-group.svg'
import { useEffect, useRef, useState } from 'react';
import { searchUser } from '../services/userService';
import { useNavigate } from 'react-router-dom';

function Search() {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  const [searchResult, setSearchResult] = useState(null);
  const navigate = useNavigate();
  const divRef = useRef(null);

  useEffect(() => {
    if(query){
      const getData = setTimeout(async () => {
        const result = await searchUser(query);
        setSearchResult(result);
      }, 1000)
  
      return () => clearTimeout(getData)
    } else {
      setSearchResult(null);
    }
  }, [query]);

  // console.log('isFocused: '+ isFocused);
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (divRef.current && !divRef.current.contains(event.target) && inputRef.current && !inputRef.current.contains(event.target)) {
        setIsFocused(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);
  
  const handleInput = (e) => {
    if(!e.target.value){
      setSearchResult(null);
    }
    setQuery(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setQuery('');
    setIsFocused(false);
    inputRef.current.blur();
  }

  const handleFocus = () => {
    setIsFocused(true);
  };

  return (
    <form className='relative w-full' onSubmit={handleSubmit} >
      <div className="flex w-full h-10 py-2.5 pr-6 pl-4  gap-4 shrink-0 rounded-full bg-searchbar-fill focus-within:border-twitter-blue focus-within:border">
        <img src={searchIcon} />
        <input ref={inputRef} value={query} className="bg-transparent placeholder:text-neutral-600 placeholder:font-inter placeholder:text-xl outline-none caret-twitter-blue text-neutral-50 w-full" type="search" placeholder="Search" onInput={handleInput} onFocus={handleFocus} />
      </div>
      {isFocused && <div className='w-full h-min-[100px] bg-black border border-black absolute shadow-[0_0_15px_rgba(255,255,255,0.2),0_0_3px_2px_rgba(255,255,255,0.15)] rounded font-inter'  ref={divRef}>
        {!searchResult && <div className='text-white flex justify-center mt-3 mb-10' >
          <span>Try searching for people</span>
        </div>}
        {searchResult && 
          <>
            {searchResult.message ?
              <div className='text-white flex justify-center mt-3 mb-10' >
                <span>{searchResult.message}</span>
              </div>
              : 
              <div className='w-full'>
                {searchResult.map(user => <button key={user.id} className='flex m-2 w-full' onClick={() => {navigate(`/${user.username}`)}} >
                  {user.avatar && <img className='w-10 mr-3 ' src={user.avatar} />}
                  {!user.avatar && <div className='w-10 mr-3 aspect-square rounded-full bg-neutral-500' />}
                  <div className=' text-white'>
                    <div>{user.display_name}</div>
                    <div className='text-neutral-500'>@{user.username}</div>
                  </div>
                </button>)}
              </div>
            }
          </> 
        }
      </div>}
    </form>
  )
}

export default Search