//*common js
const express = require('express');
const fs = require('fs');

const app = express();
const port = 3000;

function sleep(ms:any) {
  const wakeUpTime = Date.now() + ms;
  while(Date.now() < wakeUpTime) {}
}

//* localhost:3000/
app.get('/', (require:any, response:any) => {
  //* MALA PRÁCTICA (lectura de sincrónica de archivos)
  try {
    const data = fs.readFileSync('./data.txt', 'utf8');
    response.send(data); //* lo que vamos enviar como respuesta
  } catch (error) {
    response.status(500).send('Error'); 
  }
});

//* localhost:3000/normal
app.get('/normal', (req:any, res:any) => {
  res.send('Ejecución normal....');
});


app.get('/block', (req:any, res: any)  => {
  // * MALA PRACTICA 
  sleep(10000); // * Duerme por 10 segundos
  res.send('Blocking operation completed');
});



app.listen(port, () => {
  console.log("Server is running on http://localhost:"+port);
  //* console.log(`Server is running on http://localhost:${port}`); //* alt + 96
  
});
