# Clash Meta Dashboard

## Usage

### Enable external-controller in your config file

```yaml
external-controller: 0.0.0.0:9090
```

### Use pre-built assets from gh-pages branch

> First time setup

```shell
git clone https://github.com/devsolux/clash-meta-dashboard.git -b gh-pages /etc/clash-meta/ui
```

Make sure you have external-ui directory set correctly in your config file

```yaml
external-ui: /etc/clash-meta/ui
```

> Update

```shell
git -C /etc/clash-meta/ui pull -r
```

### Run inside Docker

> docker cli

Running

```shell
docker run -d --restart always -p 80:80 --name clash-meta-dashboard ghcr.io/devsolux/clash-meta-dashboard
```

Update and Restart

```shell
docker pull ghcr.io/devsolux/clash-meta-dashboard && docker restart clash-meta-dashboard
```

> docker-compose.yml

```yaml
version: '3'

services:
  clash-meta-dashboard:
    container_name: clash-meta-dashboard
    image: ghcr.io/devsolux/clash-meta-dashboard
    restart: always
    ports:
      - '80:80'

  # optional
  meta:
    container_name: meta
    image: docker.io/devsolux/clash-meta:Alpha
    restart: always
    network_mode: host
    cap_add:
      - NET_ADMIN
    volumes:
      - ./config.yaml:/root/.config/clash
```

Running

```shell
docker compose up -d
```

Update and Restart

```shell
docker compose pull && docker compose up -d
```

### Build locally

> Install npm dependencies

```shell
pnpm install
```

> Build artifacts

```shell
pnpm build
```

> Serve static files

```shell
pnpm serve
```
