import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';

import { useState } from 'react';
import './App.css';


function App() {
  // input box state
  const [input, setInput] = useState('');
  // image URL state
  const [imageUrl, setImageUrl] = useState('');
  // box that outlines the face
  const [box, setBox] = useState({
    left: 0,
    top: 0,
    right: 0,
    bottom: 0
  });
  // navigating pages with routes state
  const [route, setRoute] = useState('signin');
  // signed-in state check
  const [isSignedIn, setIsSignedIn] = useState(false);
  // user profile state
  const [user, setUser] = useState({
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  });

  // input box on change handler
  const onInputChange = (event) => {
    setInput(event.target.value);
    setImageUrl(event.target.value);
  }

  // on submit button click handler
  const onButtonSubmit = () => {
    const raw = JSON.stringify({
      user_app_id: {
        user_id: "gku",
        app_id: "my-first-application"
      },
      inputs: [
        {
          data: {
            image: {
              url: input
            },
          },
        },
      ],
    });

    fetch(
      "https://api.clarifai.com/v2/models/f76196b43bbd45c99b4f3cd8e8b40a8a/outputs",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: "Key ee65f3a39a8742ffb9920a3f03cef272",
        },
        body: raw,
      }
    )
    .then((response) => response.text())
      .then((response) => {
        if (response) {
          fetch("http://localhost:3000/image", {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              id: user.id
            })
          })
          .then(response => response.json())
          .then(count => {
            setUser({
              ...user,
              entries: count
            });
          });
        }
        displayFaceBox(calculateFaceLocation(response));
      })
      .catch((error) => console.log("error", error));
  }

  // calculates the face dimensions in a box shape
  const calculateFaceLocation = (data) => {
    const clarifaiFace = JSON.parse(data, null, 2).outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputimage");
    const width = Number(image.width);
    const height = Number(image.height);

    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - clarifaiFace.right_col * width,
      bottomRow: height - clarifaiFace.bottom_row * height,
    };
  }

  // set state on route change
  const onRouteChange = (route) => {
    if (route === 'signout') {
      setIsSignedIn(false);
    } else if (route === 'home') {
      setIsSignedIn(true);
    }

    setRoute(route);
  }

  // set state to facebox vertices values
  const displayFaceBox = ({ leftCol, topRow, rightCol, bottomRow }) => {
    setBox({
      left: leftCol,
      top: topRow,
      right: rightCol,
      bottom: bottomRow
    });
  }

  // load user profile on registration submit
  const loadUser = (data) => {
    setUser({
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    });
  }

  return (
    <div className="App">
      {/* <Particles className='particles' params={particlesOptions}/> */}
      <Navigation isSignedIn={isSignedIn} onRouteChange={onRouteChange} />
      {route === 'home' ?
        <>
          <Logo />
          <Rank name={user.name} entries={user.entries} />
          <ImageLinkForm onInputChange={onInputChange} onButtonSubmit={onButtonSubmit} />
          <FaceRecognition box={box} imageUrl={imageUrl} />
        </>
        :
        (
          route === 'signin' ?
            <>
              <SignIn onRouteChange={onRouteChange} loadUser={loadUser} />
            </>
            :
            <>
              <Register onRouteChange={onRouteChange} loadUser={loadUser} />
            </>
        )}
    </div>
  );
}

export default App;
