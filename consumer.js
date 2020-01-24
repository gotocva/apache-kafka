const kafka = require('kafka-node');
const config = require('./config');

try {

  const client = new kafka.KafkaClient(config.kafka_server);
  let consumer = new kafka.Consumer(client,config.client_options,config.client_settings);

  consumer.on('message', async function(message) {
    console.log('message received on consumer');
    console.log('kafka-> ',message.value);
  });

  consumer.on('error', function(err) {
    console.log('error', err);
  });

}
catch(e) {
  console.log("Exception occurs on kafka consumer",e);
}
