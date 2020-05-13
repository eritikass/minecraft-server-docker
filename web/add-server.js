const fs = require("fs");
// Load the AWS SDK for Node.js
var AWS = require("aws-sdk");
// Load credentials and set region from JSON file
AWS.config.update({ region: "us-east-1" });

function addServer(callback) {
  // Create EC2 service object
  var ec2 = new AWS.EC2({ apiVersion: "2016-11-15" });

  const userData = fs.readFileSync("../bootstrap-script.sh", "utf8");

  let buff = new Buffer(userData);
  let base64data = buff.toString("base64");

  console.log("userData", base64data);

  var instanceParams = {
    ImageId: "ami-0915e09cc7ceee3ab",
    InstanceType: "t2.medium",
    KeyName: "home1",
    MinCount: 1,
    MaxCount: 1,
    SecurityGroupIds: ["sg-009a8692395705a51"],
    UserData: base64data,
  };

  // Create a promise on an EC2 service object
  var instancePromise = new AWS.EC2({ apiVersion: "2016-11-15" })
    .runInstances(instanceParams)
    .promise();

  // Handle promise's fulfilled/rejected states
  instancePromise
    .then(function (data) {
      console.log(data);
      const [ instance ] = data.Instances
      var instanceId = instance.InstanceId;
      console.log("Created instance", instanceId);
      // Add tags to the instance
      tagParams = {
        Resources: [instanceId],
        Tags: [
          {
            Key: "Name",
            Value: "minecraft-server",
          },
        ],
      };
      // Create a promise on an EC2 service object
      var tagPromise = new AWS.EC2({ apiVersion: "2016-11-15" })
        .createTags(tagParams)
        .promise();
      // Handle promise's fulfilled/rejected states
      tagPromise
        .then(function (data) {
          console.log("Instance tagged");
          callback({
            instance,
          });
        })
        .catch(function (err) {
          console.error(err, err.stack);
        });
    })
    .catch(function (err) {
      console.error(err, err.stack);
    });
}

module.exports = addServer;
