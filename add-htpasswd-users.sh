#!/bin/bash

# Create a new .htpasswd file with 'admin' user
htpasswd -c -B -b .htpasswd admin junk

# Add users 'dev' and 'test'
htpasswd -b -B .htpasswd dev junk
htpasswd -b -B .htpasswd test junk

# Add users 'admin' and a 'regular' user for 'company-a'
htpasswd -b -B .htpasswd testadmin@company-a.com junk
htpasswd -b -B .htpasswd testuser@company-a.com junk

# Add users 'admin' and a 'regular' user for 'company-b'
htpasswd -b -B .htpasswd testadmin@company-b.com junk
htpasswd -b -B .htpasswd testuser@company-b.com junk

# Add users 'admin' and a 'regular' user for 'company-c'
htpasswd -b -B .htpasswd testadmin@company-c.com junk
htpasswd -b -B .htpasswd testuser@company-c.com junk


# CHECK user 'admin'
htpasswd -vb .htpasswd admin junk

# CHECK users 'dev' and 'test'
htpasswd -vb .htpasswd dev junk
htpasswd -vb .htpasswd test junk

# Check users 'admin' and a 'regular' user for 'company-a'
htpasswd -vb .htpasswd testadmin@company-a.com junk
htpasswd -vb .htpasswd testuser@company-a.com junk


# Check users 'admin' and a 'regular' user for 'company-b'
htpasswd -vb .htpasswd testadmin@company-b.com junk
htpasswd -vb .htpasswd testuser@company-b.com junk


# Check users 'admin' and a 'regular' user for 'company-c'
htpasswd -vb .htpasswd testadmin@company-c.com junk
htpasswd -vb .htpasswd testuser@company-c.com junk
