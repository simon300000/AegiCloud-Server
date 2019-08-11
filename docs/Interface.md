# AegiCloud Server Interface

WebSocket is open on port 2121

Receive:

Please only send the lines which were changed.

```json
[
  {
    "uid": "xxx",
    "user": "a",
    "data": {
      ...
  }
]
```

Leave the data `null` if the user just changed the line editing.

Send:

The server will only send the lines which were changed.

```json
{
  "lines": [
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
  ],
  "users": [
    {
      "user": "a",
      "uid": "xxx"
    }
  ]
}
```
