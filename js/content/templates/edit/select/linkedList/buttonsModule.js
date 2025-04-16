/*
    @package        SiteAnimator\Admin

    function:       displays the previous button of the date select of the list template

    Last revision:  27-02-2025
 
*/    

// create module function
( function( mbAdminApp ){

    // get name space
    const nameSpace = mbAdminApp.content.templates.edit.select.linkedList;
    
    // MODULE: buttonsModule( html element id: parentId, 
    //                        named array: buttonOptions, 
    //                        named array: listOptions,
    //                        named array: callbacks ) named array
    nameSpace.buttonsModule = function( parentId, listOptions, callbacks ) {
        // PRIVATE:

        // MEMBERS:
        const self = this;                                      // object
        self.MODULE = 'ContentTemplatesEditLinkedListButtonsModule'; // string
        self.debugOn = false;                                   // boolean
        self.parentId = parentId;                               // html element id
        self.listOptions = listOptions;                         // named array
        self.callbacks = callbacks;                             // named array
        self.containerOptions = {                               // named array
            'id'                    :   mbAdminApp.getUiId( self.MODULE + 'Container' ), // string 
            'element'               :   'div',                  // html element type 
            'position'              :   'relative',             // css
            'width'                 :   '15.0rem',              // css
            'height'                :   '2.0rem'                // css
        };                                                      // done named array                                                          
        self.buttonOptions = {                                  // named array
            'element'               :   'div',                  // html element type 
            'position'              :   'absolute',             // css
            'width'                 :   '110px',               // css
            'height'                :   '1.8rem',               // css
            'lineHeight'            :   '1.8rem',               // css
            'textAlign'             :   'center',               // css
            'top'                   :   '6px',                  // css
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
        self.layout = {                                         // named array
            'left'                  : 0,                        // integer
            'spacing'               : 10,                       // integer
            'button' : {                                        // named array
                'width'             : 110                        // integer
            }                                                   // done named array
        };                                                      // done named array
        self.buttonTexts = {                                    // named array
            'add'                   :   'Add',                  // string
            'remove'                :   'Remove'                // string
        };                                                      // done named array
        self.left = 0;                                          // integer
        self.modules = {};                                      // named array
        // DONE MEMBERS

        // FUNCTIONS
        self.construct = function() {
        // FUNCTION: construct( void ) void
            
            // debug info
            self.debug( 'construct' );
           
            // add html
            self.addHtml();
            
            // create buttons
            self.createButtons();
            
        // DONE FUNCTION: construct( void ) void
        };
        self.addHtml = function() {
        // FUNCTION: addHtml( void ) void
            
            // add container to parent
            mbAdminApp.appendContainer( self.parentId, self.containerOptions );
                                    
        // DONE FUNCTION: addHtml( void ) void
        };
        self.removeHtml = function() {
        // FUNCTION: removetml( void ) void
            
            // debug info
            self.debug( 'removeHtml' );

            // remove container
            mbAdminApp.getElementById( self.containerOptions['id'] ).remove();
            
        // DONE FUNCTION: removeHtml( void ) void
        };
        self.createButtons = function() {
        // FUNCTION: createButtons( void ) void
            
            // create remove
            self.createButton( 'remove' );
            
            // create add
            self.createButton( 'add' );
            
        // DONE FUNCTION: createButtons( void ) void
        };
        self.removeButtons = function() {
        // FUNCTION: removeButtons( void ) void
            
            // loop over list types
            Object.entries( self.modules ).forEach( ( [index, module] ) => {
                
                // destroy module
                module.destruct( );
                
            });
            // done loop over list types
            
            // reset modules
            self.modules = {};
            
        // DONE FUNCTION: removeButtons( void ) void
        };
        self.createButton = function( id ) {
        // FUNCTION: createButton( string: id ) void
            
            // debug info
            self.debug( 'createButton' );
            
            // create button options
            let buttonOptions = mbAdminApp.extend( {}, self.buttonOptions );
            
            // set id
            buttonOptions['id'] = mbAdminApp.getUiId( self.MODULE + id );
            
            // set row id
            buttonOptions['buttonId'] = id;
            
            // set left
            buttonOptions['left'] = self.left + 'px';
            
            // set text
            buttonOptions['text'] = self.buttonTexts[id];
            
            // create callbacks
            const callbacks = {
                'mouseOver'     :   true,
                'mouseOut'      :   true,
                'click'         :   self[id]
            };
            // create callbacks
            
            // add button
            self.modules['button' + id] = new mbAdminApp.ui.buttonModule( self.containerOptions['id'],
                                                                          buttonOptions,
                                                                          callbacks );
            // add button

            // add width
            self.left += self.layout['button']['width'];
            
            // add spacing
            self.left += self.layout['spacing'];
            
        // DONE FUNCTION: createButton( string: id ) void
        };
        self.add = function( event ) {
        // FUNCTION: add( event: event ) void

            // get callback
            let callback = self.callbacks['add'];
            
            // call callback
            callback();

        // DONE FUNCTION: add( event: event ) void
        };
        self.remove = function( event ) {
        // FUNCTION: remove( event: event ) void

            // get callback
            let callback = self.callbacks['remove'];
            
            // call callback
            callback();

        // DONE FUNCTION: remove( event: event ) void
        };
        self.layoutChange = function( ) {
        // FUNCTION: layoutChange( void ) void

            
        // DONE FUNCTION: layoutChange( void ) void
        };
        self.destruct = function( ) {
        // FUNCTION: destruct( void ) void

            // remove button
            self.removeButtons();
            
            // remove html
            self.removeHtml();
            
            // unset list options
            self.listOptions = null;
            
            // unset callbacks
            self.callbacks = null;
            
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
            
            // FUNCTION: layoutChange( void ) void
            layoutChange : function( ){
                
                // call internal
                self.layoutChange( );
                
            },
            // FUNCTION: destruct( void ) void    
            destruct : function( ){
                
                // call internal
                self.destruct( );
                
            }
            
        };
        // DONE PUBLIC
        
    };
    // DONE MODULE: buttonsModule( html element id: parentId, 
    //                             named array: listOptions,
    //                             named array: callbacks ) named array
    
})( mbAdminApp );
// done create module function
