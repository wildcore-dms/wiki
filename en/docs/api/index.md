# API
The REST API can be a powerful tool to help you manage your equipment and users. By integrating this API into your system(such as billing system), you can improve additional functionally for your system.
Additionally, you can also use this API to query your equipment for information, manage devices. 


## Authentication
Supporting methods for access:

1. Using auth token 
2. Using trusted networks 


### Use auth token
**1. Create some user(with login api_user for example)**    
**2. Over console utility generate auth token, over command**     
```shell
wca user:generate-key api_user 365d
```
_where arguments api_user - user login and 365d - key expiration._     
The answer should be a table, with one field containing the key.     
**3. Now, You can work with API, adding header `X-Auth-Key: API_KEY_FROM_TABLE`**

### Use trusted networks (not recommended)
Over web panel, go to Configuration->System configuration->Configuration[Tab].      
In block security, set field trusted network list, in CIDR (10.0.0.0/8 for example).   

_Requests without a key but on a trusted network will show up from the builtin **sys** user_    

## Documentation
API methods, example of responses are documented in [postman wildcoreAPI](https://documenter.getpostman.com/view/6612340/TWDRqyW4) _(The documentation may not contain all the information of you need)_     
      
Also, since the web panel is built on the SPA framework, you can view the called API methods (via F12) and use them

## Development 
For PHP developers added SDK (testing) - [github.com/meklis/wildcore-api-client](https://github.com/meklis/wildcore-api-client), [examples](https://github.com/meklis/wildcore-api-client/tree/master/examples)    
