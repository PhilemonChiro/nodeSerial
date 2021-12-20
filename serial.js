let command  = process.argv[2]; 
let	portName = process.argv[3]; 
let baudRate = process.argv[4]; 
import readline from 'readline';
import serialport from 'serialport';
import chalk from 'chalk';
import boxen from 'boxen';

switch(command){
  case "help":  Instructions();
                break;
  case "list":  listPorts();
                break;
  case "open":  openPort();
                break;
  default    :  const style = {
                 // backgroundColor:"#ff0000",
                  padding: 0,
                  margin:0,
                  borderStyle: "round",
                  borderColor: 'red'
                  
                }
                console.log(boxen(chalk.white.bold("Invalid option!"),style));
                Instructions();
                break;
}


function openPort(){
  const serial = new serialport(portName, baudRate);
  serial.on('data', readSerialData);
  serial.on('open', showPortOpen);
  serial.on('error', showError); 
  serial.write('main screen turn on', function(err){
    if(err){
      return console.log('error on write: ', err.message)
    }
    console.log('message written')
  })
}

function readSerialData(data) {
  console.log(data.toString());
}

function showPortOpen() {
  console.log(portName+ ' open, Data rate: ' + baudRate + 'bps');
}

function showError(error) {
  console.log('Serial port error: ' + error);
}

function Instructions() {
  console.log('\nUsage:' + chalk.green('\tnode serial.js') + chalk.blueBright(' [option] [portname] [baudrate]'));
  console.log('Example:' + chalk.green('node serial.js') + chalk.blueBright(' open com1 9600\n'));
  console.log('Options:');
  console.log('\t' + chalk.yellowBright('list') + '\t\tList available comports');
  console.log('\t' + chalk.yellowBright('open') + '\t\tConnect to the specified comport');
  console.log('Arguments:');
  console.log('\t' + chalk.yellowBright('help') + '\t\tShow help');
  console.log('\t' + chalk.yellowBright('portname') + '\tserial comport');
  console.log('\t' + chalk.yellowBright('baudrate') + '\tserial baudrate');
  process.exit(0);
}


function listPorts() {
  console.log(chalk.yellowBright("\nListing available ports"));
  serialport.list().then(
    ports => ports.forEach(port => console.log(chalk.blueBright('\t' + port.path))),
    err => console.log(err)
  )
}