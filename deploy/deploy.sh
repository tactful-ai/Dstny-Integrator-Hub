#!/bin/bash

ansible-playbook -i playbooks/inventory.yml playbooks/init_start_deploy.yml
