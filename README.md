# graphql-api

## Deploy

```bash
sam build
sam deploy --guided
```

## Integrated tests

Start local MySQL Server
```bash
net start MySQL80
```

Configure MySQL Connection .env
```bash
{
    "GraphQLFunction": {
        "DATABASE": database,
        "ENDPOINT": "host.docker.internal",
        "PASSWORD": password,
        "USERNAME": username
    }
}
```

Build your application with the `sam build` command.

```bash
graphql-api$ sam build
```

The SAM emulator

```bash
graphql-api$ sam local start-api
```

## Unit tests

```bash
hello-world$ npm run test
```