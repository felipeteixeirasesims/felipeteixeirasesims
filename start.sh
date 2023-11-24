#!/bin/sh

npm prisma migrate dev

npm prisma db push

npm prisma db seed

npm prod:server
