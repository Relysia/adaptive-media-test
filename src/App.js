import './App.scss';
import adaptiveTest from './adaptiveTest.json';

function App() {
  const data = adaptiveTest;
  console.log(data);

  function percentageChange(oldNumber, newNumber) {
    var decrease = newNumber - oldNumber;
    return (decrease / oldNumber) * 100;
  }

  return (
    <div>
      <section>
        {data.map((data, i) => (
          <div className='card-container' key={i}>
            <h2>{data.id}</h2>
            <h3>{data.site}</h3>
            <p>{data.palnnedImpression}</p>
            <p>{Math.floor(data.factImpressions)}</p>
            {percentageChange(data.palnnedImpression, data.factImpressions) > 0 ? <h4>+{percentageChange(data.palnnedImpression, data.factImpressions).toFixed(1)}%</h4> : <h3>{percentageChange(data.palnnedImpression, data.factImpressions).toFixed(1)}%</h3>}
            <div className='tags'>
              {data.tags.map((tag) => (
                <p>{tag}</p>
              ))}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}

export default App;
