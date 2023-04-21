FROM node:alpine

WORKDIR /app/dist/
COPY package.json ./

ARG PNPM_VERSION=8.1.1

ENV PNPM_HOME=/root/.local/share/pnpm
ENV PATH=$PATH:$PNPM_HOME

RUN apk add --no-cache curl && \
  curl -fsSL "https://github.com/pnpm/pnpm/releases/download/v${PNPM_VERSION}/pnpm-linuxstatic-x64" -o /bin/pnpm && chmod +x /bin/pnpm && \
  apk del curl

RUN pnpm install
COPY ./ ./

CMD ["pnpm","start"]