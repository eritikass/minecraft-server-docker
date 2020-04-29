# minecraft-server-docker

 * Git clone this repo
 * Install packages ( check [install-soft.sh](./install-soft.sh) )
 * Run server `sudo docker-compose up`

## 

 * Create Security Group for minecraft
    - allows incoming tcp "25565"
 * Create new EC2 machine using AWS LINUX ( `Amazon Linux AMI 2018.03.0 (HVM), SSD Volume Type` )
    - use [bootstrap-script.sh](./bootstrap-script.sh)
    - use minecraft security group
 * Once EC2 is created/stared - connect using public ip


NodeJS AWS SDK Create EC2 example -> https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/ec2-example-creating-an-instance.html
