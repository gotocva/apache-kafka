module.exports = {
    kafka_topic: 'example',
    kafka_server: 'localhost:2181',
    client_options : [{ topic: config.kafka_topic, partition: 0 }],
    client_settings : {
        autoCommit: true,
        fetchMaxWaitMs: 1000,
        fetchMaxBytes: 1024 * 1024,
        encoding: 'utf8',
        fromOffset: false
    }
};