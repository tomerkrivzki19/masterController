const dotenv = require("dotenv");

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXEPTION! 💣, Shutting down.... ");
  console.log(err.name, err.message);
  process.exit(1);
  // server.close(() => { //We cannot use the server verible , becouse it called in the end , and we need this callback function readed first becouse ig there and err before the code readed the calllback wiwll not work
  //   // in this method , ther server will get more time to handle all the reqeust that been handled at the time , and inly after that the server will shut down
  //   process.exit(1);
  // });
});

dotenv.config({ path: "./config.env" });
const app = require("./app");
const port = process.env.PORT || 4000;

const server = app.listen(port, () => {
  console.log(`app runing on port ${port}...`);
});

// each time there un-handled rejection  somewhere in our application the proccess object will imit an object called  'unhandleRejection ',so we can subscribe to that event
process.on("unhandledRejection", (err) => {
  //in here will be all the unhandled promises (rejected promises) ---> "Saftey Net"

  //if there an problem like a database connection then our application not woek at all , so what we need to do here is to shout down our application
  console.log("UNHANDLE REJECTION! 💣, Shutting down.... ");
  console.log(err.name, err.message);
  // console.error(err.stack);

  server.close(() => {
    // in this method , ther server will get more time to handle all the reqeust that been handled at the time , and inly after that the server will shut down
    process.exit(1);
  });
  //we have to types -> code 0 -> stand for success , code 1 => stand for uncuse acception
});

//RESPONDE TO A "SICK TERM SIGNAL"  , THE COMTAINER THAT OUR APLLICATION IS RUNING (IN HERUKO IS DYNO), those containers are restarting every 24 hours in order to keep our app in a healthy state , and the way its done is by the sending of the "sick term signal" to our node application, and then the apllication will shut down immediately
// the problem with that shut down is that the shut down can be very abrupt (פִּתְאוֹמִי) , so this can then leave requests that are currently beaing proccessed hanging in the air , and that so not ideal
//this is what hapaning also when there unhandeld rejection
//SIGTERM => event that can be emitted and that our application recives and can  respond to, basically a term that can couse the program to really stop working.
process.on("SIGTERM", () => {
  console.log("✋ SIGTERM RECIVED. Shuting down gracefully");
  // server.close => will close the server , but will handele all pending requests
  server.close(() => {
    console.log("💥 Proccess terminated!");
    //we dont need to type proccess.exit(1) , becouse when SIGTERM event apeared then this will make the exit for us
  });
});
