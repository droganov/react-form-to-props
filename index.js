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

    getInitialState: function(){
      return {
        trimForm: this.trim,
      }
    },

    trim: function( formName ){
      var formName = getFormName( formName );
      var form = this.state && this.state[ formName ] || false;
      if( !form ) return;
      for( var fieldName in form ){
        if( form.hasOwnProperty( fieldName ) ) form[ fieldName ] = form[ fieldName ].trim();
      }
      var newState = {};
      newState[ formName ] = form;

      this.setState( newState );
    },


    bindAs: function( fieldName, formName ){
      var ctx = this;
      var formName = getFormName( formName );
      var formContainer = ctx.props && ctx.props[ formName ] || ctx.state && ctx.state[ formName ] || {};

      return {
        value: formContainer[ fieldName ] || "",
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
