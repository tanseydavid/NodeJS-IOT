#!/bin/bash

# Create a new .htpasswd file with 'admin' user
htpasswd --create --batch .htpasswd admin just4Fuel@HOME

# Add users 'dev' and 'test'
htpasswd --batch .htpasswd dev just4Fuel@HOME
htpasswd --batch .htpasswd test just4Fuel@HOME

# Add users an admin and a regular user for company-a
htpasswd --batch .htpasswd testadmin@company-a.com junkPass!
htpasswd --batch .htpasswd testuser@company-a.com junkPass!

# Add users an admin and a regular user for company-b
htpasswd --batch .htpasswd testadmin@company-b.com junkPass!
htpasswd --batch .htpasswd testuser@company-b.com junkPass!

# Add users an admin and a regular user for company-c
htpasswd --batch .htpasswd testadmin@company-c.com junkPass!
htpasswd --batch .htpasswd testuser@company-c.com junkPass!

