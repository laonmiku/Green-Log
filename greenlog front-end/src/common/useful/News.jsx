import axios from 'axios';
import React from 'react'

const News = () => {
    const [data, setData] = useState(null);
    const callAPI= async()=>{
        const res =await axios.get()
    }
  return (
    <div>News</div>
  )
}

export default News