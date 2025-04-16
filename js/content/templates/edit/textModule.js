/*
        @package        Pleisterman/MbAdmin
  
        function:       contains the text input template
  
        Last revision:  08-03-2025
 
*/

// create module function
( function( mbAdminApp ){

    // get name space
    let nameSpace = mbAdminApp.content;
    
    // create name space
    nameSpace.templates = nameSpace.templates ? nameSpace.templates : {};

    // set name space
    nameSpace = nameSpace.templates;
    
    // create name space
    nameSpace.edit = nameSpace.edit ? nameSpace.edit : {};
    
    // MODULE: textModule( html element id: parentId, 
    //                     named array: itemOptions ) named array 
    nameSpace.edit.textModule = function( parentId, itemOptions ) {
        // PRIVATE:

        // MEMBERS:
        let self = this;                                        // object
        self.MODULE = 'ContentTemplatesEditTextModule';         // string
        self.debugOn = false;                                   // boolean
        self.parentId = parentId;                               // html element id
        self.itemOptions = itemOptions;                         // named array
        self.containerOptions = {                               // named array 
            'id'                    :   mbAdminApp.getUiId( self.MODULE + 'Container' ), // string 
            'element'               :   'div',                  // html element type 
            'backgroundColor'       :   'transparent'           // css 
        };                                                      // done named array 
        self.itemContainerOptions = {                           // named array 
            'id'                    :   mbAdminApp.getUiId( self.MODULE + 'ItemContainer' ), // string 
            'element'               :   'div',                  // html element type 
            'display'               :   'inline-block',         // css
            'padding'               :   '0.8rem 1.2rem',        // css
            'backgroundColor'       :   'transparent',          // css 
            'border'                :   true,                   // boolean
            'borderStyle'           :   'solid',                // css
            'borderWidth'           :   '0.1rem',               // css
            'borderRadius'          :   '1.0rem',               // css
            'borderColor'           :   mbAdminApp.getColor( 'light' )['transparent-50'] // css
        };                                                      // done named array 
        self.itemContentOptions = {                             // named array 
            'id'                    :   mbAdminApp.getUiId( self.MODULE + 'ItemContent' ), // string 
            'element'               :   'div',                  // html element type 
            'display'               :   'flex'                  // css
        };                                                      // done named array 
        self.labelOptions = {                                   // named array
            'id'                    :   mbAdminApp.getUiId( self.MODULE + 'Label' ), // string 
            'element'               :   'div',                  // html element type
            'width'                 :   '7.0rem',               // css
            'fontSize'              :   '1.2rem',               // css
            'paddingTop'            :   '0.4rem',               // css
            'fontWeight'            :   'bold',                 // css
            'paddingRight'          :   '0.8rem',               // css
            'color'                 :   mbAdminApp.getColor( 'dark' ).color, // css
            'backgroundColor'       :   'transparent'           // css 
        };                                                      // done named array
        self.inputOptions = {                                   // named array
            'id'                    :   mbAdminApp.getUiId( self.MODULE + 'Input' ), // string 
            'element'               :   'input',                // html element type
            'type'                  :   'text',                 // input type 
            'fontSize'              :   '1.2rem',               // css
            'padding'               :   '0.2rem 0.3rem',        // css
            'backgroundColor'       :   mbAdminApp.getColor( 'edit' ).color, // css 
            'borderRadius'          :   '0.2rem'                // css
        };                                                      // done named array
        self.inputType = 'text';                                // string
        self.timeOptions = {                                    // named array
            'width'                 :   '3.5rem',               // css
            'textAlign'             :   'center'                // css
        };                                                      // done named array
        self.priceOptions = {                                   // named array
            'width'                 :   '8.5rem',               // css
            'textAlign'             :   'right'                 // css
        };                                                      // done named array
        self.errorOptions = {                                   // named array
            'align'                 :   'center'                // string
        };                                                      // done named array
        self.errors = {                                         // named array
            'notANumber'            :   'This must be a number value' // string
        };                                                      // done named array
        self.cleanRegelurExpression = ['[:]',, '[[:space:]]'];  // array
        self.modules = {};                                      // named array
        // DONE MEMBERS

        // FUNCTIONS
        self.construct = function() {
        // FUNCTION: construct( void ) void
            
            // debug info
            self.debug( 'construct' );
            
            // extend options
            self.extendOptions();
            
            // add html
            self.addHtml();
            
            // add events
            self.addEvents();
            
            // set value
            self.setValue();
            
        // DONE FUNCTION: construct( void ) void
        };
        self.extendOptions = function() {
        // FUNCTION: extendOptions( void ) void
                                   
            // has display options
            if( self.itemOptions['displayOptions'] ){
            
                // get input type
                self.inputType = self.itemOptions['displayOptions']['type'] ? 
                                 self.itemOptions['displayOptions']['type'] : 
                                 self.inputType;
                // get input type
            
                // extend label
                self.labelOptions = mbAdminApp.extend( self.labelOptions, self.itemOptions['displayOptions']['label'] );

                // extend input
                self.inputOptions = mbAdminApp.extend( self.inputOptions, self.itemOptions['displayOptions']['input'] );

                // switch type
                switch( self.inputType ){
                    
                    // cases
                    case 'time' : {
                            
                        // add price options    
                        self.inputOptions = mbAdminApp.extend( self.inputOptions, self.timeOptions );
                            
                        // done
                        break;
                        
                    } 
                    case 'price' : {
                            
                        // add price options    
                        self.inputOptions = mbAdminApp.extend( self.inputOptions, self.priceOptions );
                            
                        // done
                        break;
                        
                    } 
                    case 'password' : {
                            
                        self.inputOptions['type'] = 'password';
                        
                        // done
                        break;
                    } 
                    // done cases                    
                    
                };
                // done switch type

            }
            // done has display options
            
        // DONE FUNCTION: extendOptions( void ) void
        };
        self.addHtml = function() {
        // FUNCTION: addHtml( void ) void
            
            // debug info
            self.debug( 'addHtml' );

            // add container to parent
            mbAdminApp.appendContainer( self.parentId, self.containerOptions );
                        
            // add item container to container
            mbAdminApp.appendContainer( self.containerOptions['id'], self.itemContainerOptions );
                        
            // add item content to item container
            mbAdminApp.appendContainer( self.itemContainerOptions['id'], self.itemContentOptions );
                        
            // add label to item content
            mbAdminApp.appendContainer( self.itemContentOptions['id'], self.labelOptions );
                        
            // add input to item content
            mbAdminApp.appendContainer( self.itemContentOptions['id'], self.inputOptions );
                        
        // DONE FUNCTION: addHtml( void ) void
        };
        self.removeHtml = function() {
        // FUNCTION: removeHtml( void ) void
            
            // remove input
            mbAdminApp.getElementById( self.inputOptions['id'] ).remove();
            
            // remove label
            mbAdminApp.getElementById( self.labelOptions['id'] ).remove();
            
            // remove item content
            mbAdminApp.getElementById( self.itemContentOptions['id'] ).remove();
            
            // remove item container
            mbAdminApp.getElementById( self.itemContainerOptions['id'] ).remove();
            
            // remove container
            mbAdminApp.getElementById( self.containerOptions['id'] ).remove();
            
        // DONE FUNCTION: removeHtml( void ) void
        };
        self.addEvents = function() {
        // FUNCTION: addEvents( void ) void
            
            // add loose focus
            mbAdminApp.getElementById( self.inputOptions['id'] ).addEventListener( 'focusout' , self.focusout ); 
            
        // DONE FUNCTION: addEvents( void ) void
        };
        self.removeEvents = function() {
        // FUNCTION: removeEvents( void ) void
            
            // remove loose focus
            mbAdminApp.getElementById( self.inputOptions['id'] ).removeEventListener( 'focusout' , self.focusout ); 
            
        // DONE FUNCTION: removeEvents( void ) void
        };
        self.focusout = function() {
        // FUNCTION: focusout( void ) void

            // switch type
            switch( self.inputType ){

                // cases
                case 'time' : {
                  
                  // trsnsform time value
                  self.transformTimeValue();
                  
                }
                // done cases
                
            };
            // done switch type
            
        // DONE FUNCTION: focusout( void ) void
        };
        self.transformTimeValue = function() {
        // FUNCTION: transformTimeValue( void ) void

            // get current text
            let text = mbAdminApp.getElementById( self.inputOptions['id'] ).value;
            
            // create regalur expression
            let regexSpaces = new RegExp( ' ', 'g');
            
            // remove spaces
            text = text.replace( regexSpaces, '' );
            
            // create regex expression
            let regex = new RegExp( '[,.;-]', 'g');
            
            // replace .,;- with :
            text = text.replace( regex, ':' );
            
            // add zeros
            while( text.length < 4 ){
                text += '0';
            }
            // add zeros
            
            // remove colons after first colon 
            let indexOfColon = text.indexOf( ':' );
            let hoursText = '0';
            let minutesText = '0';
            if( indexOfColon >= 0 ){
                hoursText = text.substring( 0, indexOfColon );
                minutesText = text.substring( indexOfColon + 1, indexOfColon + 3 );
            }
            else {
                hoursText = text.substring( 0, 2 );
                minutesText = text.substring( 2, 4 );
            }
            let hoursInteger = parseInt( hoursText );
            let minutesInteger = parseInt( minutesText );
            
            // check hours and minutes
            if( hoursInteger > 23 || isNaN( hoursInteger ) || minutesInteger > 59 || isNaN( minutesInteger ) ){
                
                // show error
                self.showError( 'Invalid time.' );
                
                // done 
                return;
                
            }
            // done check hours and minutes

            // create hours text
            hoursText = mbAdminApp.pad( hoursInteger, '0', 2 );
            // create minutes text
            minutesText = mbAdminApp.pad( minutesInteger, '0', 2 );

            // create formatted value
            let value = hoursText;
            value += ':';
            value += minutesText;
            // create formatted value

             // set input value -> formatted value
            mbAdminApp.getElementById( self.inputOptions['id'] ).value = value;
                        
        // DONE FUNCTION: transformTimeValue( void ) void
        };
        self.setValue = function() {
        // FUNCTION: setValue( void ) void
            
            // switch type
            switch( self.inputType ){

                // cases
                case 'number' : {
               
                    // set number value
                    self.setNumberValue();

                    // done 
                    break;
                        
                }
                case 'time' : {
                        
                    // set time value
                    self.setTimeValue();

                    // done 
                    break;
                        
                }
                case 'price' : {
            
                    // set time value
                    self.setPriceValue();

                    // done 
                    break;
                    
                }
                default : {
                        
                    // set input value
                    mbAdminApp.getElementById( self.inputOptions['id'] ).value = self.itemOptions['value'];
            
                }
                // done cases
                
            };
            // done switch type
            
        // DONE FUNCTION: setValue( void ) void
        };
        self.setNumberValue = function() {
        // FUNCTION: setNumberValue( void ) void
            
            // set value
            mbAdminApp.getElementById( self.inputOptions['id'] ).value = self.itemOptions['value'];

            // set align
            self.inputOptions['textAlign'] = 'right';

        // DONE FUNCTION: setNumberValue( void ) void
        };
        self.setTimeValue = function() {
        // FUNCTION: setTimeValue( void ) void
            
            // create time text
            let text = '';
            text += self.itemOptions['value'].substring( 0, 2 );
            text += ':';
            text += self.itemOptions['value'].substring( 2, 4 );
            // done create time text

            // set value
            mbAdminApp.getElementById( self.inputOptions['id'] ).value = text;

        // DONE FUNCTION: setTimeValue( void ) void
        };
        self.setPriceValue = function() {
        // FUNCTION: setPriceValue( void ) void
            
            // create time text
            var text = '';
            text += self.itemOptions['value'].substring( 0, self.itemOptions['value'].length - 2 );
            text += ',';
            text += self.itemOptions['value'].substring( self.itemOptions['value'].length - 2, self.itemOptions['value'].length );
            // done create time text
                        
            // set value
            mbAdminApp.getElementById( self.inputOptions['id'] ).value = text;

        // DONE FUNCTION: setPriceValue( void ) void
        };
        self.changed = function() {
        // FUNCTION: changed( void ) boolean

            // value changed
            if( self.getValue() !== self.itemOptions['value'] ){

                // return changed
                return true;
                
            }
            // value changed            

            // return not changed
            return false;

        // DONE FUNCTION: changed( void ) boolean
        };
        self.validate = function() {
        // FUNCTION: validate( void ) boolean

            // get value
            let value = self.getValue();
            
            // is number type
            if( self.inputType === 'number' ||
                self.inputType === 'time' ||
                self.inputType === 'price' ){

                // value is NaN
                if( isNaN( value ) ||
                    isNaN( parseInt( value ) ) ){
                    
                    // show error
                    self.showError( self.errors['notANumber'] );

                    // return invalid
                    return false;

                }
                // value is NaN

            }            
            // is number type
            
            // validate
            let validateResult = mbAdminApp.validate( value, self.itemOptions['validate'] ); 

            // valid
            if( !validateResult['valid'] ){
                
                // show error
                self.showError( validateResult['message'] );

                // return invalid
                return false;

            }
            // done valid

            // return valid
            return true;

        // DONE FUNCTION: validate( void ) boolean
        };
        self.showError = function( error ) {
        // FUNCTION: showError( string: error ) void

            // create options
            const options = {
                'elementId' :   self.inputOptions['id'],
                'text'      :   error,
                'align'     :   self.errorOptions['align']
            };
            // create options
            
            // show error message
            mbAdminApp.showErrorText( options );

        // DONE FUNCTION: showError( string: error ) void
        };
        self.getValue = function() {
        // FUNCTION: getValue( void ) string

            // replace .,;- with :
            let value = mbAdminApp.getElementById( self.inputOptions['id'] ).value;
            
            // remove special chars
            let result = value.trim();
            
            // input type is price or time
            if( self.inputType === 'time' ||
                self.inputType === 'price' ||
                self.inputType === 'number' ){
            
                // type is price or time
                result = result.replace( /[:,]/gm, '');
            
            }
            // input type is price or time
            
            // input type is price or time
            if( self.inputType === 'number' ){
            
                // type is price or time
                result = parseInt( result );
            
            }
            // input type is price or time
            
            // return result
            return result;

        // DONE FUNCTION: getValue( void ) string
        };
        self.destruct = function() {
        // FUNCTION: destruct( void ) void

            // remove events
            self.removeEvents();
            
            // remove html
            self.removeHtml();
            
            // unset item options
            self.itemOptions = null;
            
        // DONE FUNCTION: destruct( void ) void
        };
        self.debug = function( message ) {
        // FUNCTION: debug( string: message ) void
            
            // debug on
            if( self.debugOn ) {
                
                // call app debug
                mbAdminApp.debug( self.MODULE + ' ' + message );
                
            }
            // done debug on
            
        // DONE FUNCTION: debug( string: message ) void
        };
        // DONE FUNCTIONS

        // initialize the class 
        self.construct();
        
        // DONE PRIVATE
        
        // PUBLIC
        return {
            
            // FUNCTION: getElementId( void ) html element id
            getElementId : function( ){
                
                // return result
                return self.inputOptions['id'];
                
            },
            // FUNCTION: changed( void ) boolean
            changed : function( ){
                
                // return internal call
                return self.changed( );
                
            },
            // FUNCTION: validate( void ) boolean
            validate : function( ){
                
                // return internal call
                return self.validate( );
                
            },
            // FUNCTION: getId( void ) string
            getId : function( ){
                
                // return result
                return self.itemOptions['id'];

            },
            // FUNCTION: resetValue( void ) string
            resetValue : function( ){
                
                // return internal call
                return self.setValue( );
                
            },
            // FUNCTION: getValue( void ) string
            getValue : function( ){
                
                // return internal call
                return self.getValue( );
                
            },
            // FUNCTION: destruct( void ) void    
            destruct : function( ){
                
                // call internal
                self.destruct( );
                
            }
            
        };
        // DONE PUBLIC
        
    };
    // DONE MODULE: textModule( html element id: parentId, 
    //                          named array: itemOptions ) named array  
    
})( mbAdminApp );
// done create module function
