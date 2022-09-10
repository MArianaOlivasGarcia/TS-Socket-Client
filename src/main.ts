import { connectToServer } from './socket-client'
import './style.css'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h1>Web Socket Client</h1>

    <span id="server-status">Offline</span>
    <br />
    <input placeholder="AccessToken" id="tokenInput" />
    <button id="btnConnect" >Connect</button>

    <hr />

    <h5>Clients</h5>
    <ul id="clients">
      <li></li>
    </ul>



    <hr />
    <form id="messageForm">
      <input placeholder="Mensaje" id="messageInput" />
    </form>

    <h5>Messages</h5>
    <ul id="messages">
      <li></li>
    </ul>

  </div>
`

// connectToServer();


const tokenInput = document.querySelector<HTMLInputElement>('#tokenInput')!;
const btnConnect = document.querySelector<HTMLButtonElement>('#btnConnect')!;

btnConnect.addEventListener('click', () => {

  if ( tokenInput.value.trim().length <= 0 ) return alert('Enter a valid JWT');

  connectToServer( tokenInput.value );

})
