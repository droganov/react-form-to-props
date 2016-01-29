"use strict"
var React = require( "react" );

module.exports = function( Component ){
  return React.createClass({
    displayName: Component.displayName || Component.name || "FormComponent",
    statics: Component.statics,
    bindAs: function( fieldName, formName ){
      var ctx = this;
      var formName = formName || "form";
      return {
        value: ctx.state && formName in ctx.state && fieldName in ctx.state[ formName ] ? ctx.state[ formName ][ fieldName ] : "",
        requestChange: function( newValue ) {
          var defaultState = {};
          defaultState[ formName ] = {};
          var newState = Object.assign( defaultState, ctx.state );
          newState[ formName ][ fieldName ] = newValue;
          ctx.setState( newState );
        }
      }
    },
    render: function() {
      return React.createElement( Component, Object.assign( {}, this.props, this.state, { bindAs: this.bindAs } ) );
    },
  });
}
