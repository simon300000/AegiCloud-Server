# AegiCloud Server Interface

WebSocket is open on port 2121

Receive:

Please only send the lines which were changed.

```json
{
  "uid": "xxx",
  "data": {
    ...
  }
}
```

Send:

The server will only send the lines which were changed.

```json
{
  "uid": "xxx",
  "data": {
    ...
  }
},
{
  "uid": "yyy",
  "data": {
    ...
  }
}
```
