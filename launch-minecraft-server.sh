#!/bin/sh

SECURITY_GROUP_IDS="sg-009a8692395705a51"

aws ec2 run-instances \
    --image-id=ami-0915e09cc7ceee3ab \
    --count=1 \
    --instance-type=t2.medium \
    --key-name=home1 \
    --security-group-ids=$SECURITY_GROUP_IDS \
    --user-data=file://bootstrap-script.sh \
    --tag-specifications 'ResourceType=instance,Tags=[{Key=Name,Value=minecraft-server}]' \
    --query='Instances[*].{InstanceId:InstanceId,IP:PrivateIpAddress}' --output table