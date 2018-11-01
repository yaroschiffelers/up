# How to Write Your Own Modules  

The easiest way to create a new module is by using the create ```-c``` flag. 

```node
// Create a new module with a name 
up -c myNewModule

// If you don't add a string containing the name of your 
// new module after the -c flag, Up will create a module 
// with 'newModule' as name.
up -c 
```

### How do they look 
A module is an array of actions. Each action is an object and has a required ```name``` and ```method``` field. Actions can have a ```question``` array. 

```js
module.exports = {
    actions: [
        {
            name: 'Hello World',
            method: () => console.log('Hello World')
        }
    ]
}
``` 

[<-- back](./)
