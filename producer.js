
const kafka = require('kafka-node');
const config = require('./config');

try {

  const client = new kafka.KafkaClient(config.kafka_server);
  const producer = new kafka.Producer(client);

  let payloads = [
    {
      topic: 'sample message topic',
      messages: config.kafka_topic
    }
  ];

  producer.on('ready', async function() {
    let push_status = producer.send(payloads, (err, data) => {
      if (err) {
        console.log('[kafka-producer -> '+kafka_topic+']: broker update failed');
      } else {
        console.log('[kafka-producer -> '+kafka_topic+']: broker update success');
      }
    });
  });

  producer.on('error', function(err) {
    console.log(err);
    console.log('[kafka-producer -> '+kafka_topic+']: connection errored');
    throw err;
  });
  
}
catch(e) {
  console.log(e);
}
