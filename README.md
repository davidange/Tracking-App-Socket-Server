# Tracking App Socket Server

This is a Server that manages the sockets for  real Time App updates. As of right now it can give you real time updates to the location of the tracked entities. The sockets are implemented with **Socket.IO** . Refer to their [documentation](http://socket.io) for better knowledge on how Sockets are implemented. 

For the client to initiate the connection to the server and create a socket, it must directly connect to this server URL with the **socket.io-client** API. More information can be found in this [link](https://socket.io/docs/v3/client-api/).

## Server Listeners
The Client can emit the following events:
### join
Indicates that the client is joining the room identified by *projectId* and *entityId* and listening the events emited to those rooms.
#### Parameters
| Field | Type       | Description |
|-------|------------|-------------|
| projectId | String    | project that the Client will be subscribed to.|
| entityId | String    | project that the Client will be subscribed to.|


#### Example of Client emiting:
```javascript
import io from ('socket.io');
// creates a client socket that is connected to SERVER_URL
let socket = io(SERVER_URL);
//emits the join event  and indicates that the client is joining the room [projectId]-[entityId]
socket.emit('join',projectId,entityId);
```

### leave
Indicates that the client is leaving the room identified by *projectId* and *entityId* and listening the events emited to those rooms.
#### Parameters
| Field | Type       | Description |
|-------|------------|-------------|
| projectId | String    | project that the Client will be subscribed to.|
| entityId | String    | entity that the Client will be subscribed to.|



## Events
The Events that the server emits and the Clients can subscribe to are the following:

### entity-new-location
Once the client has connected to the server and joined a room, it can listen to the changes of the location of the tracked entity.

#### Output
JSON object with the following properties:

| Field | Type       | Description |
|-------|------------|-------------|
| entityId | String  | entity that changed location   |
| location | JSON    | Coordinates of location of Item. {x,y,z}   |

#### Example of Setting up Client Listeners:
```javascript
//adds a listener for changes of entity.
socket.on(`entity-new-location`, (entityId,location) => {
   // callback function Here....
});
```