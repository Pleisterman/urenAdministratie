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
    
    // MODULE: textAreaModule( html element id: parentId, 
    //                         named array: itemOptions ) named array 
    nameSpace.edit.textAreaModule = function( parentId, itemOptions ) {
        // PRIVATE:

        // MEMBERS:
        let self = this;                                        // object
        self.MODULE = 'ContentTemplatesTextAreaModule';         // string
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
        self.inputContentOptions = {                            // named array
            'id'                    :   mbAdminApp.getUiId( self.MODULE + 'InputContent' ), // string 
            'element'               :   'div'                   // html element type
        };                                                      // done named array
        self.inputOptions = {                                   // named array
            'id'                    :   mbAdminApp.getUiId( self.MODULE + 'Input' ), // string 
            'element'               :   'textarea',             // html element type 
            'height'                :   '5.0rem',               // css 
            'width'                 :   '35rem',                // css
            'padding'               :   '0.2rem 0.3rem',        // css
            'backgroundColor'       :   mbAdminApp.getColor( 'edit' ).color, // css 
            'borderRadius'          :   '0.2rem'                // css
        };                                                      // done named array
        self.toggeleButtonOptions = {                           // named array
            'id'                    :   mbAdminApp.getUiId( self.MODULE + 'ToggleButton' ), // string 
            'element'               :   'div',                  // html element type 
            'text'                  :   'Expand',               // string
            'position'              :   'relative',             // css
            'width'                 :   '110px',                // css
            'height'                :   '1.8rem',               // css
            'lineHeight'            :   '1.8rem',               // css
            'textAlign'             :   'center',               // css
            'marginTop'             :   '22px',                 // css
            'backgroundSize'        :   '20px',                 // css
            'backgroundRepeat'      :   'no-repeat',            // css
            'backgroundPosition'    :   'center',               // css
            'color'                 :   mbAdminApp.getColor( 'dark' ).color, // css 
            'backgroundColor'       :   mbAdminApp.getColor( 'lightest' ).color, // css 
            'borderColor'           :   mbAdminApp.getColor( 'darkest' ).color,          // css 
            'colors' : {                                        // named array
                'color'             :   mbAdminApp.getColor( 'dark' ).color, // color
                'highlight'         :   mbAdminApp.getColor( 'darker' ).highlight, // color
                'background' : {                                    // named array
                    'color'         :   mbAdminApp.getColor( 'lightest' ).color, // color
                    'highlight'     :   mbAdminApp.getColor( 'lightest' ).highlight // color
                },                                              // color
                'border' : {                                    // named array
                    'color'         :   mbAdminApp.getColor( 'darkest' ).color, // color
                    'highlight'     :   mbAdminApp.getColor( 'darkest' ).highlight // color
                }                                               // done named array
            },                                                  // done named array
            'border'                :   true,                   // boolean
            'borderWidth'           :   '1px',                  // css
            'borderStyle'           :   'groove',               // css
            'cursor'                :   'pointer'               // css            
        };                                                      // done named array
        self.toggleOptions = {                                  // named array    
            'texts' : {                                         // named array
                'expanded'          :   'Collaps',              // string
                'collapsed'         :   'Expand'                // string
            },                                                  // done named array
            'expanded'              :   false,                  // boolean
            'sizes' : {                                         // named array
                'expanded' : {                                  // named array
                    'height'        :   '20rem',                // css     
                    'width'         :   '40rem'                 // css
                },                                              // done named array
                'collapsed' : {                                 // named array
                    'height'        :   '5.0rem',                // css     
                    'width'         :   '35rem'                 // css
                }                                               // done named array
            }                                                   // done named array
        };                                                      // done named array        
        self.contracted = true;                                 // boolean
        self.hasChanged = false;                                // boolean
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
            
            // add toggle button
            self.addToggleButton();
            
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
                        
            // add input content to item content
            mbAdminApp.appendContainer( self.itemContentOptions['id'], self.inputContentOptions );
                        
            // add input to input content
            mbAdminApp.appendContainer( self.inputContentOptions['id'], self.inputOptions );
                        
        // DONE FUNCTION: addHtml( void ) void
        };
        self.removeHtml = function() {
        // FUNCTION: removeHtml( void ) void
            
            // remove input
            mbAdminApp.getElementById( self.inputOptions['id'] ).remove();
            
            // remove input content
            mbAdminApp.getElementById( self.inputContentOptions['id'] ).remove();
            
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
        self.addToggleButton = function() {
        // FUNCTION: addToggleButton( void ) void
            
            // create callbacks
            let callbacks = {
                'mouseOver'     :   true,
                'mouseOut'      :   true,
                'click'         :   self.toggle
            };
            // create callbacks
            
            // create toggle button
            self.modules['toggleButton'] = new mbAdminApp.ui.buttonModule( self.inputContentOptions['id'],
                                                                           self.toggeleButtonOptions,
                                                                           callbacks );
            // create input           
            
        // DONE FUNCTION: addToggleButton( void ) void
        };
        self.removeToggleButton = function() {
        // FUNCTION: removeToggleButton( void ) void
            
            // destroy toggle button
            self.modules['toggleButton'].destruct();
            
            // unset entry
            delete self.modules['toggleButton'];            
            
        // DONE FUNCTION: removeToggleButton( void ) void
        };
        self.toggle = function() {
        // FUNCTION: toggle( void ) void
            
            // set expanded
            self.toggleOptions['expanded'] = !self.toggleOptions['expanded'];
            
            // get state
            let state = self.toggleOptions['expanded'] ? 'expanded' : 'collapsed';
            
            // get text
            let text = self.toggleOptions['texts'][state];
            
            // set text
            mbAdminApp.getElementById( self.toggeleButtonOptions['id'] ).innerHTML = text;
            
            // get size
            let sizes = self.toggleOptions['sizes'][state];
            
            // set width
            mbAdminApp.setStyle( self.inputOptions['id'], 'width', sizes['width'] );
            
            // set height
            mbAdminApp.setStyle( self.inputOptions['id'], 'height', sizes['height'] );            
            
        // DONE FUNCTION: toggle( void ) void
        };
        self.addEvents = function() {
        // FUNCTION: addEvents( void ) void
            
            // add change
            mbAdminApp.getElementById( self.inputOptions['id'] ).addEventListener( 'change', self.change );             
            
        // DONE FUNCTION: addEvents( void ) void
        };
        self.removeEvents = function() {
        // FUNCTION: removeEvents( void ) void
            
            // remove change
            mbAdminApp.getElementById( self.inputOptions['id'] ).removeEventListener( 'change' , self.change ); 
                
        // DONE FUNCTION: removeEvents( void ) void
        };
        self.change = function() {
        // FUNCTION: change( void ) void
        
            // set changed
            self.hasChanged = true;
                
        // DONE FUNCTION: change( void ) void
        };
        self.setValue = function() {
        // FUNCTION: setValue( void ) void
            
            // set input value
            mbAdminApp.getElementById( self.inputOptions['id'] ).value = self.itemOptions['value'];
            
        // DONE FUNCTION: setValue( void ) void
        };
        self.changed = function() {
        // FUNCTION: changed( void ) boolean

            // return result
            return self.hasChanged;

        // DONE FUNCTION: changed( void ) boolean
        };
        self.validate = function() {
        // FUNCTION: validate( void ) boolean

            // return result
            return true;

        // DONE FUNCTION: validate( void ) boolean
        };
        self.resetValue = function() {
        // FUNCTION: resetValue( void ) string

            // set input value
            mbAdminApp.getElementById( self.inputOptions['id'] ).value = self.itemOptions['value'];
            
        // DONE FUNCTION: resetValue( void ) string
        };
        self.getValue = function() {
        // FUNCTION: getValue( void ) string

            // return result
            return mbAdminApp.getElementById( self.inputOptions['id'] ).value;

        // DONE FUNCTION: getValue( void ) string
        };
        self.destruct = function() {
        // FUNCTION: destruct( void ) void

            // remove events
            self.removeEvents();
            
            // remove toggle button
            self.removeToggleButton();
            
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
            // FUNCTION: resetValue( void ) void
            resetValue : function( ){
                
                // call internal
                self.setValue( );
                
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
    // DONE MODULE: textAreaModule( html element id: parentId, 
    //                              named array: itemOptions ) named array  
    
})( mbAdminApp );
// done create module function
