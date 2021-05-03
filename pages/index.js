import { useEffect, useState } from "react"
import axios from 'axios';
import ReactAudioPlayer from 'react-audio-player';
export default function Home() {

  const [data, setData] = useState(null);
  const [check, setCheck] = useState(0);
  const getData = () => {
    setCheck(true);
    axios.get('/api/hello').then((response) => {
      setData(response.data);
    }).catch((error) => {
      setData(JSON.stringify(error));
    }).finally(() => {
      setCheck(false);
    })
  }
  const timeOut = 5000;
  useEffect(() => {
    const interval = setInterval(() => {
      getData();
    }, timeOut);
    return () => clearInterval(interval);

  }, [check])

  return (
    <>
      <h1>
        Hello Covid
      </h1>
      <h5>
        {data?.map((element, index) => {
          const isAudioRequired = element.available_capacity > 0;
          return (
            <div key={index} style={{
              margin: '15px',
              border: '1px solid #cecece',
              padding: '15px'
            }}>
              <h3>
                {element.centerName}
              </h3>
              <h4>
                {element.available_capacity}
              </h4>
              {
                isAudioRequired ? <ReactAudioPlayer src="cov.mp3"
                  autoPlay
                  controls
                  loop={element.available_capacity > 0}
                >
                </ReactAudioPlayer> : ""
              }

            </div>)
        }

        )}
      </h5>
    </>
  )
}
