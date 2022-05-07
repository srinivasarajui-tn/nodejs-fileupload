# File Upload, Download & access POC.

## Setup

- Clone git repo,
- Install node modules

```
npm i
```

- Start App

```
npm start
```

## Config

The Following env variables are used

- FILEPATH : Location where files are stored(Default value: '/data/files')
- port: Port on which server starts(Default value: 3000)

- memLogInterval: Time internal in which memory usage is console loged. if it is less than or equal to zero,it will not print (Default value: -1)

## Endpoints

- "/" - Server status is shown
- "/uploadFile" - To upload files
- "/getSignedHash" - Generate Token to acess static files.
- "/files/{File Path}?token={Token}" - To download files. Add securtiy token @ Token.
