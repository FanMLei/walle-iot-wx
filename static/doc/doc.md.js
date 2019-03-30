module.exports = `
## 接入指南
------

下面将会NodeMCU作为接入设备进行演示

你所需要的材料：
- 硬件：NodeMCU 
- 软件：ArduinoIDE
  
### 准备工作

###### 安装NodeMCU开发环境
&ensp;&ensp;Arduino平台不能直接对NodeMCU进开发，需要下载安装ESP8266的环境。在ArduinoIDE中点击设置文件 → 首选项 → 附加开发板管理器网址中填入*http://arduino.esp8266.com/stable/package_esp8266com_index.json*，关闭重启，在工具→ 开发板→ 开发板管理器中搜索ESP8266，点击安装。
![](https://github.com/FanMLei/imageRepository/blob/master/walle-iot-doc/esp8266.png?raw=true)
#### 安装MQTT库

&ensp;&ensp;在项目→加载库→管理库搜索PubSubClient，点击安装
![](https://github.com/FanMLei/imageRepository/blob/master/walle-iot-doc/pubsubclient.png?raw=true)
### 注册设备

&ensp;&ensp;进入小程序“我的”页面，点击设备进入设备管理页面，创建设备
![注册设备](https://github.com/FanMLei/imageRepository/blob/master/walle-iot-doc/device.png?raw=true)

&ensp;&ensp;填写好你的设备信息，第一个为必填信息，其他信息可选。
![填写信息](https://github.com/FanMLei/imageRepository/blob/master/walle-iot-doc/new_device.png?raw=true)

&ensp;&ensp;创建成功之后，你将会看到一下信息，其中红框中的数据需要记住，因为我们在连接设备的时候需要使用到。
![设备信息](https://github.com/FanMLei/imageRepository/blob/master/walle-iot-doc/device_info.png?raw=true)

#### 创建数据流

&ensp;&ensp;有了设备之后，还需要创建数据流，这样服务器才会将设备传递过来的数据写入数据库中保存再次回到“我的”页面，点击“数据流”进入到数据流管理界面
![注册数据流](https://github.com/FanMLei/imageRepository/blob/master/walle-iot-doc/stream.png?raw=true)

&ensp;&ensp;填写好你的信息，请注意你这里填写的设备，该数据流只能是这个设备发送的后台才会保存数据，否则数据保存会失败。
![填写信息](https://github.com/FanMLei/imageRepository/blob/master/walle-iot-doc/new_stream.png?raw=true)

&ensp;&ensp;创建完成之后，红框中的数据需要记住，这个是我们在上传数据是的topic信息
![数据流信息](https://github.com/FanMLei/imageRepository/blob/master/walle-iot-doc/stream_info.png?raw=true)

##### 开始连接你的设备

点击文件→示例→PubSubClient→mqtt_esp8266。
![](https://github.com/FanMLei/imageRepository/blob/master/walle-iot-doc/connection.png?raw=true)
打开文件按照自己的信息修改下面几行代码，然后烧录到开发板中。
\`\`\`c
//WIFI名称
const char* ssid = "........";   		
//WIFI密码
const char* password = "........";     
//MQTT服务器地址
const char* mqtt_server = "iotforfml.cn";  

//依次填入客户端ID、设备ID、token
if (client.connect("123","123","123123")) {   
	Serial.println("connected");
//上图中的客户端ID （用于接收服务器发送过来的消息）
	client.subscribe("client_148675");    
} 
//数据流ID、数据
client.publish("969081167", "your msg");  
\`\`\`
打开串口监视器，查看状态码，状态码为0则连接成功，一下是常见的状态码信息可供参考
![](https://github.com/FanMLei/imageRepository/blob/master/walle-iot-doc/code.png?raw=true)

##### 其他
更详细的文档请访问 http://www.iotforfml.cn
`;