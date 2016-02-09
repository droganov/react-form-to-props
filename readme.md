A simple react form binding helper which utilizes [valueLink](https://facebook.github.io/react/docs/two-way-binding-helpers.html#reactlink-before-and-after) prop.

**Install:**
```
npm install -S react-form-to-props
```

**Use:**

Connect the wrapper

```javascript
import React, { Component } from "react"
import connectForm from "react-form-to-props"

class Form extends Component {
  render(){
    return ( ... );
  }
}
export default connectForm( Form );
```

Bind props
```javascript
<input valueLink={ this.props.bindAs( "fieldName1" ) } />
<input type="checkbox" checkedLink={ this.props.bindAs( "fieldName2" ) } />
```

Your form data is binded as `this.props.form`. You can set a custom prop name this way: `this.props.bindAs( "fieldName1", "myCustomFormName" )`

Complete example
```javascript
import React, { Component } from "react"
import connectForm from "react-form-to-props"

class Form extends Component {
  _submit( ev ){
    ev.preventDefault()
    this.props.trimForm( "loginForm" );
    console.log( this.props.loginForm );
    this.props.resetForm( "loginForm" );
  }
  render(){
    return <form onSubmit={ this._submit.bind( this ) }>
      <input type="text" valueLink={ this.props.bindAs( "login", "loginForm" ) } />
      <input type="password" valueLink={ this.props.bindAs( "password", "loginForm" ) } />
      <label>
        <input type="checkbox" checkedLink={ this.props.bindAs( "remember", "loginForm" ) } />
        Keep me signed in
      </label>
      <button>Submit</button>
    </form>;
  }
}
export default connectForm( Form );
```

To reset a form:
```javascript
this.props.resetForm();
```
