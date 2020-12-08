import Navigation from './component/Navigation/Navigation';
import Logo from './component/Logo/Logo';
import ImageLinkForm from './component/ImageLinkForm/ImageLinkForm';
import Rank from './component/Rank/Rank';
import Particles from 'react-particles-js';
import './App.css';
import { useState } from 'react';
import Clarifai from 'clarifai';
import FaceDetection from './component/FaceDetection/FaceDetection';
import SignIn from './component/SignIn/SignIn';
import Register from './component/Register/Register';


function App() {
  const app = new Clarifai.App({
    apiKey: '91db33c5ded04e58a28cf9ca717157f0',
  });

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [userData, setUserData] = useState('');
  const [input, setInput] = useState('');
  const [url, setUrl] = useState('');
  const [boxes, setBoxes] = useState([]);
  const [route, setRoute] = useState('signIn');
  const [isSignedIn, setSignedIn] = useState(false);
  const [token, setToken] = useState('');

  const { email, password } = formData;

  const onChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://infinite-wave-73400.herokuapp.com/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const responseData = await response.json(); //token
      setToken(responseData.token);
      if (!responseData.error) {
        const response = await fetch('https://infinite-wave-73400.herokuapp.com/profile', {
          method: 'GET',
          headers: {
            'auth-token': responseData.token,
          },
        });
        const user = await response.json();
        setUserData(user);
        onRouteChange('home');

      } else {
        setError(responseData.error);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const calculateFaceLocation = (data) => {
    const clarifaiFaces = data.outputs[0].data.regions.map(
      (region) => region.region_info.bounding_box
    );
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);

    return clarifaiFaces.map((face) => {
      return {
        leftCol: face.left_col * width,
        topRow: face.top_row * height,
        rightCol: width - face.right_col * width,
        bottomRow: height - face.bottom_row * height,
      };
    });
  };

  const displayFaceBox = (boxes) => {
    setBoxes(boxes);
  };

  const onInputChange = (e) => {
    setInput(e.target.value);
  };

  const onSubmit = async () => {
    setUrl(input);
    app.models.predict(Clarifai.FACE_DETECT_MODEL, input).then(
      function (response) {
        displayFaceBox(calculateFaceLocation(response));
      },
      function (err) {
        console.log(err);
      }
    );
    try{
      const response = await fetch('http://localhost:3000/' + userData._id, {
        method: 'PUT',
        headers: {
          'auth-token': token,
        },
      })
      const updatedUser = await response.json();
      setUserData({...userData, entries: updatedUser.entries})

    } catch(err){
      console.log(err)
    }
  };

  const onRouteChange = (route) => {
    if (route === 'signOut') {
      setSignedIn(false);
    } else if (route === 'home') {
      setSignedIn(true);
    }
    setRoute(route);
  };

  return (
    <div className='App'>
      <Particles
        className='partciles'
        params={{
          particles: {
            number: {
              value: 100,
              density: {
                enable: true,
                value_area: 800,
              },
            },
          },
        }}
      />

      <Navigation onRouteChange={onRouteChange} isSignedIn={isSignedIn} />
      {route === 'home' ? (
        <div>
          <Logo />
          <Rank userData={userData} />
          <ImageLinkForm
            onInputChange={onInputChange}
            onButtonSubmit={onSubmit}
          />
          <FaceDetection boxes={boxes} url={url} />
        </div>
      ) : route === 'signIn' ? (
        <SignIn
          onRouteChange={onRouteChange}
          onChangeHandler={onChangeHandler}
          onSubmitHandler={onSubmitHandler}
          error={error}
          password={password}
          email={email}
        />
      ) : (
        <Register onRouteChange={onRouteChange} />
      )}
    </div>
  );
}

export default App;
