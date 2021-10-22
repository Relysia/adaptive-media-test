import { useState, useEffect } from 'react';
import './App.scss';
import adaptiveTest from './adaptiveTest.json';
import { FaArrowLeft } from 'react-icons/fa';
import { FaArrowRight } from 'react-icons/fa';
import { useMediaQuery } from 'react-responsive';

function App() {
  const [data, setData] = useState(adaptiveTest);
  const [order, setOrder] = useState('normal');
  const [position, setPosition] = useState(0);
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

  useEffect(() => {
    if (!isMobile || isMobile) {
      setPosition(0);
    }
  }, [isMobile]);

  // Calculate the difference between planned and fact impressions
  const percentageChange = (oldNumber, newNumber) => {
    var decrease = newNumber - oldNumber;
    return (decrease / oldNumber) * 100;
  };

  // Move the carausel right
  const switchCardRight = () => {
    if (isMobile) {
      if (position <= -700) {
        return;
      }
      setPosition(position - 100);
    }
    if (!isMobile) {
      if (position <= -100) {
        return;
      }
      setPosition(position - 25);
    }
  };

  // Move the carausel left
  const switchCardLeft = () => {
    if (position >= 0) {
      return;
    }
    if (isMobile) {
      setPosition(position + 100);
    }
    if (!isMobile) {
      setPosition(position + 25);
    }
  };

  // Shows the last update in an alert
  const alertLastUpdate = (lastUpdate) => {
    alert(lastUpdate.slice(0, -7));
  };

  // Reverse the order of the data
  const reverseOrder = () => {
    if (order === 'normal') {
      setOrder('reverse');
    }
    if (order === 'reverse') {
      setOrder('normal');
    }
    setData(adaptiveTest.reverse());
  };

  return (
    <div>
      <h1>Adaptive Test</h1>
      <section>
        <div className='carousel' style={{ transform: `translateX(${position}%)` }}>
          {data.map((data) => (
            <div className='card-container' key={data.id}>
              <h2>{data.site}</h2>
              <h3>Planned Impressions:</h3>
              <p>{data.palnnedImpression}</p>
              <h3 onClick={() => alertLastUpdate(data.lastUpdate)}>Fact Impressions:</h3>
              <p onClick={() => alertLastUpdate(data.lastUpdate)}>{Math.floor(data.factImpressions)}</p>
              <h3>Difference:</h3>
              {percentageChange(data.palnnedImpression, data.factImpressions) > 0 ? <h4 style={{ color: '#00ff00' }}>+{percentageChange(data.palnnedImpression, data.factImpressions).toFixed(2)}%</h4> : <h4 style={{ color: '#ff0000' }}>{percentageChange(data.palnnedImpression, data.factImpressions).toFixed(2)}%</h4>}
              <h3>Tags:</h3>
              <div className='tags'>
                {data.tags.map((tag, i) => (
                  <p key={i}>{tag}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
        {position !== 0 && <FaArrowLeft className='left-button' onClick={switchCardLeft} />}
        {!isMobile && position !== -100 ? <FaArrowRight className='right-button' onClick={switchCardRight} /> : isMobile && position !== -700 && <FaArrowRight className='right-button' onClick={switchCardRight} />}
        <button onClick={reverseOrder}>{order === 'normal' ? 'Előre' : 'Hátra'}</button>
      </section>
    </div>
  );
}

export default App;
