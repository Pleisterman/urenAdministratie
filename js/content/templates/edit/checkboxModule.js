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
    
    // MODULE: checkboxModule( html element id: parentId, 
    //                         named array: itemOptions ) named array 
    nameSpace.edit.checkboxModule = function( parentId, itemOptions ) {
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
            'checked'               :   false,                  // boolean
            'fontSize'              :   '1.2rem',               // css
            'width'                 :   '1.2em',                // css 
            'height'                :   '1.2em',                // css 
            'readOnly'              :   true,                   // boolean
            'textAlign'             :   'center',               // css
            'padding'               :   '0.2rem 0.3rem',        // css
            'backgroundColor'       :   mbAdminApp.getColor( 'edit' ).color, // css 
            'borderRadius'          :   '0.2rem'                // css
        };                                                      // done named array
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
            
            // set checked
            self.inputOptions['checked'] = self.itemOptions['value'] === 0 ? false : true;
            
            // show value
            self.showValue();
            
        // DONE FUNCTION: construct( void ) void
        };
        self.extendOptions = function() {
        // FUNCTION: extendOptions( void ) void
            
            // has display options
            if( self.itemOptions['displayOptions'] ){
            
                // extend label
                self.labelOptions = mbAdminApp.extend( self.labelOptions, self.itemOptions['displayOptions']['label'] );

                // extend input
                self.inputOptions = mbAdminApp.extend( self.inputOptions, self.itemOptions['displayOptions']['input'] );

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
                        
            // create input
            self.createInput();
                                    
        // DONE FUNCTION: addHtml( void ) void
        };
        self.removeHtml = function() {
        // FUNCTION: removeHtml( void ) void
            
            // remove input
            self.removeInput();
            
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
        self.createInput = function() {
        // FUNCTION: createInput( void ) void
            
            // create callbacks
            let callbacks = {
                'mouseOver'     :   true,
                'mouseOut'      :   true,
                'click'         :   self.toggle
            };
            // create callbacks

            // create input
            self.modules['input'] = new mbAdminApp.ui.buttonModule( self.itemContentOptions['id'],
                                                                    self.inputOptions,
                                                                    callbacks );
            // create input
            
        // DONE FUNCTION: createInput( void ) void
        };
        self.removeInput = function() {
        // FUNCTION: removeInput( void ) void

            // destroy input
            self.modules['input'].destruct();
            
            // unset input
            delete self.modules['input'];
            
        // DONE FUNCTION: removeInput( void ) void
        };
        self.toggle = function() {
        // FUNCTION: toggle( void ) void

            // toggle
            self.inputOptions['checked'] = !self.inputOptions['checked'];

            // show value
            self.showValue();
            
        // DONE FUNCTION: toggle( void ) void
        };
        self.showValue = function() {
        // FUNCTION: showValue( void ) void
            
            // get value
            let value = self.inputOptions['checked'] ? 'X' : '';
            
            // set input value
            mbAdminApp.getElementById( self.inputOptions['id'] ).value = value;
            
        // DONE FUNCTION: showValue( void ) void
        };
        self.changed = function() {
        // FUNCTION: changed( void ) boolean

            // get original value
            let originalValue = self.itemOptions['value'] === 0 ? false : true;

            // origanal value ! checked
            if( originalValue !== self.inputOptions['checked'] ){

                // return changed 
                return true;
                
            }
            // origanal value ! checked

            // return not changed
            return false;

        // DONE FUNCTION: changed( void ) boolean
        };
        self.validate = function() {
        // FUNCTION: validate( void ) boolean

            // return valid
            return true;
            
        // DONE FUNCTION: validate( void ) boolean
        };
        self.getValue = function() {
        // FUNCTION: getValue( void ) string

            // return result
            return self.inputOptions['checked'];

        // DONE FUNCTION: getValue( void ) string
        };
        self.destruct = function() {
        // FUNCTION: destruct( void ) void

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
    // DONE MODULE: checkboxModule( html element id: parentId, 
    //                              named array: itemOptions ) named array  
    
})( mbAdminApp );
// done create module function
