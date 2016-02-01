"use strict"
var React = require( "react" );


function getFormName( formName ){
  return formName || "form";
}
function getEmptyState( formName ){
  var emptyState = {};
  emptyState[ formName ] = {};
  return emptyState;
}


module.exports = function( Component ){
  return React.createClass({
    displayName: Component.displayName || Component.name || "FormComponent",
    statics: Component.statics,
    bindAs: function( fieldName, formName ){
      var ctx = this;
      var formName = getFormName( formName );
      return {
        value: ctx.state && formName in ctx.state && fieldName in ctx.state[ formName ] ? ctx.state[ formName ][ fieldName ] : "",
        requestChange: function( newValue ) {
          var newState = Object.assign( getEmptyState( formName ), ctx.state );
          newState[ formName ][ fieldName ] = newValue;
          ctx.setState( newState );
        }
      }
    },
    resetForm: function( formName ){
      this.setState( getEmptyState( getFormName( formName ) ) );
    },
    render: function() {
      var props = Object.assign( {}, this.props, this.state, {
        bindAs: this.bindAs,
        resetForm: this.resetForm
      });
      return React.createElement( Component, props );
    },
  });
}
