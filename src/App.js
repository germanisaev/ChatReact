
import { Container, Row, Col } from 'react-bootstrap';
import './App.css';
import WaitingRoom from './components/WaitingRoom';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import ChatRoom from './components/ChatRoom';

function App() {

  const[conn, setConnection] = useState();
  const[messages, setMessages] = useState();

  const joinChatRoom = async (username, chatroom) => {

    try {
      const conn = new HubConnectionBuilder()
                  .withUrl("http://localhost:5202/chat", {
                    withCredentials: true //  <-- ADD THIS
                  })
                  .configureLogging(LogLevel.Information)
                  .build();

      conn.on("JoinSpecificChatRoom", (username, msg) => {
        console.log("msg: ", msg);
      });

      conn.on("ReceiveSpecificMessage", (username, msg) => {
        setMessages(messages => [...messages, {username, msg}]);
      });

      //await conn.start();

      await conn.start()
      .then(() => console.log('SignalR Connected.'))
      .catch(err => console.error('SignalR Connection Error: ', err));

      /* conn.on("ReceiveMessage", (user, message) => {
          // Handle incoming messages
          console.log(`Message from ${user}: ${message}`);
      }); */

      await conn.invoke("JoinSpecificChatRoom", {username, chatroom});

      setConnection(conn);

    } catch(e) {
      console.log(e);
    }
  }

  return (
    <div>
      <main>
        <Container>
          <Row className="px-5 my-5">
            <Col sm='12'>
              <h1 className='font-weight-light'>Welcome to the F1 ChatApp</h1>
            </Col>
          </Row>
          { !conn
            ? <WaitingRoom joinChatRoom={joinChatRoom}></WaitingRoom>
            : <ChatRoom messages={messages}></ChatRoom>
          }
        </Container>
      </main>
    </div>
  );
}

export default App;
