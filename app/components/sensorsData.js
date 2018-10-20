function getSensorsDatas(){
  // Default values
  document.getElementById("s-temperature1").innerHTML = 0;
  document.getElementById("s-temperature2").innerHTML = 0;
  document.getElementById("s-temperature3").innerHTML = 0;
  document.getElementById("s-temperature4").innerHTML = 0;

  // Making communication with Serial Port
  var SerialPort = require('serialport');
  var Readline = SerialPort.parsers.Readline
  // '/dev/ttyACM0' is the port for arduino
  var port = new SerialPort('/dev/ttyACM0',{
    baudRate: 9600,
  });

  var parser = new Readline()
  port.pipe(parser)

  var lastData;
  var dataAmnt = 0;

  parser.on('data', function (data) {
    // Trying to discord data with bad params (First datas tends to have bad params)
    if (dataAmnt < 10){
      dataAmnt++;
    }

    // Trying to get data with good paraams
    else{
      var parsed_data = parseFloat(data);

      // If data is float
      if (parsed_data != NaN){
        if (lastData == "D7"){
          document.getElementById("s-temperature1").innerHTML = data;
        }
        else if (lastData == "F5"){
          document.getElementById("s-temperature2").innerHTML = data;
        }
        else if (lastData == "C3"){
          document.getElementById("s-temperature3").innerHTML = data;
        }
        else if (lastData == "9C"){
          document.getElementById("s-temperature4").innerHTML = data;
        }
        else if (lastData == "9E"){
          document.getElementById("s-temperature5").innerHTML = data;
        }
      }
    }

    // Trying to get last 2 digits of data
    try{
      lastData = data[data.length - 3]+data[data.length - 2];
    }
    catch(err){
      lastData = '';
    }
  })
}
