
import { Manager, Socket } from 'socket.io-client';

let socket: Socket;

export const connectToServer = ( accessToken: string ) => {

    const manager = new Manager('http://localhost:3000/socket.io/socket.io.js' , {
        extraHeaders: {
            hola: 'mundo',
            authentication: accessToken
        }
    });

    if ( socket ) {
        socket.removeAllListeners();
    }

    // namespace root
    socket = manager.socket('/');

    addListeners();

}


const addListeners = () => {

    const label = document.querySelector('#server-status')!;
    const listClients = document.querySelector('#clients')!;
    const messageForm = document.querySelector<HTMLFormElement>('#messageForm')!;
    const messageInput = document.querySelector<HTMLInputElement>('#messageInput')!;
    const listMessages = document.querySelector('#messages')!;


    socket.on('connect', () => {
        console.log('Conectado al servidor')
        label.innerHTML = 'Conectado';
    })



    socket.on('disconnect', () => {
        console.log('Desconectado del servidor')
        label.innerHTML = 'Desconectado';
    })



    socket.on('clientsConnected', ( clients: string[]) => {
        console.log(clients)

        let clientsHtml = '';

        clients.forEach( client => {
            clientsHtml += `<li>${ client }</li>`
        })
        
        listClients.innerHTML = clientsHtml;

    })

    messageForm.addEventListener('submit', (event) => {

        event.preventDefault();

        if ( messageInput.value.trim().length <= 0 ) return;

        // Emitir al servidor
        socket.emit('messageClient', { id: 'yo', message: messageInput.value })

        messageInput.value = '';
    })



    socket.on('messagesFromServer', (payload: { fullName: string, message: string }) => {
        console.log(payload)

        const newMessage = `
            <li>
                <strong>${ payload.fullName }</strong>
                <span>${ payload.message }</span>
            </li>
        `;

        const li = document.createElement('li');

        li.innerHTML = newMessage;

        listMessages.append(li);

    })

}