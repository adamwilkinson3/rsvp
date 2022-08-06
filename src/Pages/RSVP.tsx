import '../Styles/rsvp.css';
import Card from '../Components/Card';
import Spotlight from '../Components/Spotlight';

function RSVP() {
  return (
    <div className="App">
       <a className='logout' href='../'>Home</a>
      <Spotlight />
      <Card />
    </div>
  );
}

export default RSVP;
