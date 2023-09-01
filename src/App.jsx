import { useEffect, useRef, useState } from 'react'
import { useReactToPrint } from 'react-to-print';
import fullLogo from '/Full.png'

function App() {
  // FOR MANIFEST APP
  let deferredPrompt;
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
  });
  if (deferredPrompt) {
    deferredPrompt.prompt();

    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
      }
      deferredPrompt = null;
    });
  }

  return(
    <h1>Hello world</h1>
  )
}
export default App;