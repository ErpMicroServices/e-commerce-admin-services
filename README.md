# e-commerce admin Services

## Build the docker image
'''
docker build --tag ems-e-commerce-admin-service .
'''

## Run The Services

## Local/Dev
'''
docker run --detach --publish 8000:80 --name ems-e-commerce-admin-service_1 -v $(pwd):/usr/src/app --link ems-e-commerce-db-1:erp-e-commerce-db erp-e-commerce-admin-service
'''

## Staging or Prod
'''
docker run --detach --publish 8000:80 --name ems-e-commerce-admin-service_1 -v $(pwd):/usr/src/app --link ems-e-commerce-db-1:erp-e-commerce-db ems-e-commerce-admin-service
'''
