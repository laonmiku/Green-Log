import React, { useEffect, useState } from 'react'

import axios from 'axios'

const AllImage = ({ mall_key }) => {
     const [photos, setPhotos] = useState([]);
     //console.log(mall_key);
     const callAPI = async () => {
          const res = await axios.get(`/mall/attach/list/${mall_key}`)
          setPhotos(res.data)
          //console.log(res.data)
     }

     useEffect(() => { callAPI() }, [mall_key])

     return (
          <div>
               <div className="allImage mt-5">
                    {photos.map(photo =>
                         <img src={photo.mallPhoto_photo} />
                    )}
               </div>

          </div>
     )
}
export default AllImage