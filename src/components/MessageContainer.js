import React from 'react';

const MessageContainer =({messages}) => {
    return <div>
        {
            messages.map((msg, index) => 
            <table striped bordered>
                <tr key={index}>
                    <td>{msg.msg} - {msg.username}</td>
                </tr>
            </table>
            )
        }
    </div>
}

export default MessageContainer;

/* 
<div>
            <Table striped bordered>
                <tbody>
                    {usermessages.map((msg, index) => (
                        <tr key={index}>
                            <td>{msg.user} - {msg.message}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>

*/