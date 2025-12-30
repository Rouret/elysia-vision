<h1 align='center'>
  Elysia Vision <img alt="NPM Version" src="https://img.shields.io/npm/v/elysia-vision">
</h1>
<img alt="Elysia vision webapp" src="image.png">
<h3 align='center'>
  <b>CURRENTLY IN PROGRESS.</b>
</h3>

<p align='center'>
Plugin for <a href='https://github.com/elysiajs/elysia'>Elysia.js</a> to monitor your API requests in real-time through a web dashboard and more.
</p>

## How it works

**elysia-vision** consists of two parts:

1. **This plugin** - Adds WebSocket monitoring capabilities to your Elysia server
2. **The web dashboard** - A separate webapp hosted at https://elysia-vision-webapp.vercel.app

The plugin exposes a WebSocket endpoint on your server. The dashboard connects to your server's URL (e.g., `localhost:3000`) to display real-time request data.

> **Note:** The webapp is hosted separately and does not require installation. You simply configure your server's URL in the dashboard.

## Installation

### 0. Install the plugin

```bash
bun add elysia-vision
```

### 1. Add the plugin to your Elysia server

```typescript
import { Elysia } from "elysia";
import vision from "elysia-vision";

const app = new Elysia().use(vision()).listen(3000);
```

Configure:

| Option  | Description                  | Default | Comments            |
| ------- | ---------------------------- | ------- | ------------------- |
| enabled | Whether to enable the plugin | true    | false in production |

### 2. Open the web dashboard

Go to **https://elysia-vision-webapp.vercel.app**

### 3. Configure your server URL

In the dashboard, enter your server's base URL: `localhost:3000` for example

The dashboard will connect via WebSocket to monitor your requests in real-time.

## Roadmap

- Real-time request monitoring dashboard (v0.1.x)
- REplay request, edit, share request
- Module structure visualization
- System metrics (RAM, CPU usage)
- See the path of a request in the modules

## Important Notes

⚠️ I'm aware of concerns regarding the current hosting provider (Vercel) and plan to migrate soon

## Contact

[Twitter/X](https://x.com/RouretLucas)

## License

MIT
