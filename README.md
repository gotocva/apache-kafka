
Prerequisites

Kafka is written in Java, so it requires a JVM;
OpenJDK 8 must be installed on your server.

To install OpenJDK 8, execute the following command:

```
$ sudo apt install openjdk-8-jdk
```

Verify that this is installed with
```
$ java -version
```

Install apache kafka 

```
$ sudo useradd kafka -m
```

```
$ sudo passwd kafka
```
It asks for new password for user kafka

```
$ sudo adduser kafka sudo
```

```
$ su -l kafka
```

To start, create a directory in /home/kafka called Downloads to store your downloads:

```
$ mkdir ~/Downloads
```

```
$ curl "https://www.apache.org/dist/kafka/2.1.1/kafka_2.11-2.1.1.tgz" -o ~/Downloads/kafka.tgz
```

```
$ mkdir ~/kafka && cd ~/kafka
```

```
$ tar -xvzf ~/Downloads/kafka.tgz --strip 1
```

Configuring kafka server

```
$ nano ~/kafka/config/server.properties
```

Let’s add a setting that will allow us to delete Kafka topics. Add the following to the bottom of the file:
~/kafka/config/server.properties

delete.topic.enable = true

```
$ sudo nano /etc/systemd/system/zookeeper.service
```

[Unit]
Requires=network.target remote-fs.target
After=network.target remote-fs.target

[Service]
Type=simple
User=kafka
ExecStart=/home/kafka/kafka/bin/zookeeper-server-start.sh /home/kafka/kafka/config/zookeeper.properties
ExecStop=/home/kafka/kafka/bin/zookeeper-server-stop.sh
Restart=on-abnormal

[Install]
WantedBy=multi-user.target

```
$ sudo nano /etc/systemd/system/kafka.service
```

```
$ sudo systemctl start kafka
```

To ensure that the server has started successfully, check the journal logs for the kafka unit:

```
$ sudo journalctl -u kafka
```

You should see output similar to the following:

Output
Jul 17 18:38:59 kafka-ubuntu systemd[1]: Started kafka.service.

You now have a Kafka server listening on port 9092.

While we have started the kafka service, if we were to reboot our server, it would not be started automatically. To enable kafka on server boot, run:

```
$ sudo systemctl enable kafka
```