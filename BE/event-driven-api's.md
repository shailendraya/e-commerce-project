## foundations of event-driven APIs

The REST-style HTTP APIs often have a unidirectional and synchronous interaction model with their consumers. To get the latest information, the consumers always have to poll the API backend.

What if we turn this model upside down and allow the backend to notify the client when something interesting happens?

Well, that is the basis of “Event-enabled” APIs. They are often called “asynchronous,” “push,” or “streaming” APIs as they keep pushing information to the client, in contrast to the polling.

An event-driven API must offer two capabilities to its consumers.

A mechanism to allow consumers to subscribe to events of their interest.
Deliver events to subscribed consumers in an asynchronous manner.
Based

1. The client subscribes with the API
At this point, the client of the event-driven API registers its intent to receive asynchronous updates with the API. That is called the subscription. Upon subscription, the client often specifies an endpoint to which the API should post update events.

2. Asynchronous event delivery
When something interesting happens at the backend, API delivers that to all subscribed clients in the form of an event, asynchronously.

### Building event-driven APIs

Several protocols and frameworks exist today to help you build event-driven APIs that push out events to your consumers. However, regardless of the implementation, the above discussed foundational interaction pattern remains the same.

That is, as an API provider, you should let your consumers subscribe to APIs. Secondly, you should deliver event notifications to them asynchronously.

There are several technology choices to consider when implementing an event-driven API. Each choice will depend on your use case, skillset, and infrastructure restrictions. Webhooks, WebSockets, and Server-Sent Events (SSE) are few prominent choices we can see today.

#### Webhooks

A Webhook is a publicly accessible HTTP POST endpoint managed by an event consumer. An event producer, such as an API server, can send event notifications to a webhook when something interesting happens.

1. Allow API consumers to subscribe to your APIs
Consumers can subscribe to your API by registering a Webhook URL as the callback.

The Webhook subscription itself can be managed as a REST resource, and it must include the list of event types and the subscription(callback) URL at a minimum level. It should also offer a way to unsubscribe from the API.

2. Deliver events to API consumers asynchronously
After sorting out the subscription, your next task is to deliver events to the consumers.

As the API provider, you can make an HTTP POST call to the consumer’s Webhook when something interesting happens at the backend. For example, a database record has been updated.

Webhooks forces the event consumer to establish a publicly accessible HTTP endpoint to receive events. It comes with other concerns like securing it with certificates, preventing DDoS attacks, etc. These could be a burden in the long run in terms of maintenance.

### Web Scokets

1. Allow API consumers to subscribe to your APIs
To keep getting event notifications, the consumer has to establish a WebSocket connection with your API in the first place.

A WebSocket connection is established by making an HTTP call to the API and then asking for an upgrade on that connection. After that, the communication takes place over a single TCP connection using the WebSocket protocol.

2. Deliver events to API consumers asynchronously
When the API has something interesting, it can notify the consumer by writing a data frame to its WebSockets connection. From a programming point of view, it is very similar to writing to a socket.

The consumer who had already established the connection can parse the event data from the wire and update its UI accordingly.

### Server-Sent Events(SSE)

1. Subscription and event delivery
The consumer subscribes to your API by creating a new EventSource object and passing the URL of an endpoint to the server over a regular HTTP request. After that, the consumer keeps listening for a response with a stream of event notifications.

## Reference

https://blog.axway.com/product-insights/amplify-platform/streams/event-driven-apis
https://medium.com/event-driven-utopia/event-driven-apis-understanding-the-principles-c3208308d4b2
https://dzone.com/articles/restful-applications-in-an-event-driven-architecture
