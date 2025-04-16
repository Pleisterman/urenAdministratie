/*
        @package        Pleisterman/MbAdmin
        function:       contains layout options 
                        for dialogs
                        
        Last revision:  27-02-2025
 
*/

// create module function
( function( mbAdminApp ){
    
    // get namespace
    let nameSpace = mbAdminApp;
    
    // create name space
    nameSpace.dialogs = nameSpace.dialogs ? nameSpace.dialogs : {};
    
    // MODULE: dialogsModule( void ) named array
    nameSpace.dialogs.dialogsModule = function( ) {
        
        
        // private
        let self = this;                                // object
        self.debugOn = true;                            // boolean
        self.MODULE = 'DialogsModule';                  // string
        self.layoutOptions = {                          // named array
            'overlay' : {                               // named array
                'backgroundColor'       :   mbAdminApp.getColor( 'lightest' )['transparent-50'] // css
            },                                          // done named array
            'container' : {                             // named array
                'element'           :   'div',          // html element type 
                'overflow'          :   'hidden',       // css
                'position'          :   'absolute',     // css
                'border'            :   true,           // boolean 
                'borderWidth'       :   '1.0rem',       // css 
                'borderStyle'       :   '1.0rem',       // css 
                'borderRadius'      :   '1.0rem',       // css 
                'borderColor'       :   mbAdminApp.getColor( 'dark' )['color'], // css
                'backgroundColor'   :   mbAdminApp.getColor( 'lighter' )['color'] // css
            },                                          // done named array
            'header' : {                                // named array
                'element'           :   'div',          // html element type 
                'fontSize'          :   '1.0rem',       // css
                'fontWeight'        :   '1.0rem',       // css 
                'textAlign'         :   'center',       // css 
                'padding'           :   '1.0rem'        // css 
            },                                          // done named array
            'content' : {                               // named array
                'element'           :   'div',          // html element type 
                'fontSize'          :   '1.0rem',       // css
                'fontWeight'        :   '1.0rem',       // css 
                'lineHeight'        :   '1.6rem',       // css
                'margin'            :   '1.0rem',       // css
                'padding'           :   '1.0rem',       // css 
                'borderRadius'      :   '0.5rem',       // css 
                'backgroundColor'   :   mbAdminApp.getColor( 'lightest' )['color'] // css 
            },                                          // done named array
            'button' : {                                // named array
                'element'           :   'div',          // html element type 
                'minimumWidth'      :   '6.0rem',       // css
                'fontWeight'        :   '1.0rem',       // css 
                'lineHeight'        :   '1.6rem',       // css
                'textAlign'         :   'center',       // css 
                'margin'            :   '1.0rem',       // css
                'padding'           :   '1.0rem',       // css 
                'cursor'            :   'pointer',      // css
                'borderRadius'      :   '0.5rem',       // css 
                'border'            :   true,           // boolean 
                'borderWidth'       :   '1.0rem',       // css 
                'borderStyle'       :   '1.0rem',       // css 
                'color'             :   mbAdminApp.getColor( 'lightest' )['color'], // css
                'borderColor'       :   mbAdminApp.getColor( 'darker' )['color'], // css
                'backgroundColor'   :   mbAdminApp.getColor( 'darker' )['color'], // css
                'colors' : {                            // done named array
                    'color'             :   mbAdminApp.getColor( 'lightest' ).color, // color
                    'highlight'         :   mbAdminApp.getColor( 'light' ).highlight, // color
                    'background' : {                     // named array
                        'color'         :   mbAdminApp.getColor( 'darker' ).color, // color
                        'highlight'     :   mbAdminApp.getColor( 'dark' ).highlight // color
                    },                                   // done named array
                    'border' : {                         // named array
                        'color'         :   mbAdminApp.getColor( 'darker' ).color, // color
                        'highlight'     :   mbAdminApp.getColor( 'light' ).highlight // color
                    }                                   // done named array
                }                                       // done named array
            }                                           // done named array
        };                                              // done named array
        self.modules = {};                              // named array
        // DONE MEMBERS     
        
        // FUNCTIONS
        self.construct = function() {
        // FUNCTION: construct( void ) void

            // create dialogs
            self.createDialogs();
            
        // DONE FUNCTION: construct( void ) void
        };
        self.createDialogs = function() {
        // FUNCTION: createDialogs( void ) void

            // get message dialog module
            let messageDialogModule = mbAdminApp.dialogs.messageDialogModule;

            // create message dialog module
            self.modules.messageDialog = new messageDialogModule( self.layoutOptions );

        // DONE FUNCTION: createDialogs( void ) void
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
            
            
        };
        // DONE PUBLIC
        
    };
    // DONE MODULE: dialogsModule( void ) named array 
    
})( mbAdminApp );
// done create module function


