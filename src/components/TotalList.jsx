import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import SingleItem from './SingleItem';
import {MoonLoader} from "react-spinners";

function TotalList() {

  const [apiData, setApiData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [visibleItems, setVisibleItems] = useState([])
  const listRef = useRef();

  useEffect(() => {
    axios.get('https://www.reddit.com/r/reactjs.json')
      .then((res) => setApiData(res.data.data.children.map(({ data: { title, score, url, selftext_html } }) =>
        ({ title, score, selftext_html, url })
      )))
      .catch(err => console.log('Failed to fetch API : \n ' + err))

  }, [])



  const handleScroll = () => {
    const { current } = listRef;
    if (!current) return;

    const isBottom = current.scrollTop + current.clientHeight >= current.scrollHeight;
    if (isBottom && !isLoading && apiData.length > visibleItems.length) {
      setIsLoading(true);
      setTimeout(() => {
        setVisibleItems(prevItems => [...prevItems, ...apiData.slice(prevItems.length, prevItems.length + 10)]);
        setIsLoading(false);
      }, 50);
    }
  }

  useEffect(() => {
    apiData && setVisibleItems(apiData.slice(0, 10))

  }, [apiData])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  }, [visibleItems, isLoading])

  if (!visibleItems.length >0 ) {
    return (
      <div className='mx-auto min-vh-100  d-flex flex-column align-items-center justify-content-center '>
      <h4>Contenterra</h4>
      <MoonLoader
        size={60}
        speedMultiplier={1}
        />
      </div>
    )
  }


  return (
    <div ref={listRef} className='d-flex flex-column  justify-content-center mx-auto ' style={{ width: '90%', overflowY: 'auto', marginTop: 80 }}  >

      {visibleItems.length > 0 && visibleItems.map((item, index) => (
        <SingleItem key={index} item={item} />
      ))}


    </div>
  )
}

export default TotalList