/*
        @package        Pleisterman/MbAdmin
  
        function:       displays the buttons of the header of the list template 
  
        Last revision:  27-02-2025
 
*/

// create module function
( function( mbAdminApp ){

    // get name space
    let nameSpace = mbAdminApp.content.templates.list.header;
        
    // MODULE: buttonsModule( html element id: parentId, 
    //                        named array: listOptions,
    //                        named array: callbacks ) named array  
    nameSpace.buttonsModule = function( parentId, listOptions, callbacks ) {
        // PRIVATE:

        // MEMBERS:
        let self = this;                                        // object
        self.MODULE = 'ContentTemplatesListHeaderButtonsModule'; // string
        self.debugOn = false;                                   // boolean
        self.parentId = parentId;                               // html element id
        self.listOptions = listOptions;                         // named array
        self.callbacks = callbacks;                             // named array
        self.buttonOptions = {                                  // named array
            'element'               :   'div',                  // html element type 
            'float'                 :   'right',                // css
            'width'                 :   '40px',                 // css
            'height'                :   '40px',                 // css
            'marginTop'             :   '10px',                 // css
            'marginRight'           :   '20px',                 // css
            'backgroundSize'        :   '25px',                 // css
            'backgroundRepeat'      :   'no-repeat',            // css
            'backgroundPosition'    :   'center',               // css
            'color'                 :   mbAdminApp.getColor( 'dark' ).color, // css 
            'backgroundColor'       :   mbAdminApp.getColor( 'lightest' ).color, // css 
            'colors' : {                                        // named array
                'color'             :   mbAdminApp.getColor( 'dark' ).color, // color
                'highlight'         :   mbAdminApp.getColor( 'dark' ).highlight, // color
                'background' : {                                    // named array
                    'color'         :   mbAdminApp.getColor( 'lightest' ).color, // color
                    'highlight'     :   mbAdminApp.getColor( 'lightest' ).highlight // color
                },                                              // done named array
                'border' : {                                    // named array
                    'color'         :   mbAdminApp.getColor( 'dark' ).color, // color
                    'highlight'     :   mbAdminApp.getColor( 'dark' ).highlight // color
                }                                              // done named array
            },                                                  // done named array
            'border'                :   true,                   // boolean
            'borderWidth'           :   '1px',                  // css
            'borderColor'           :   mbAdminApp.getColor( 'dark' ).color, // css 
            'borderStyle'           :   'groove',               // css
            'cursor'                :   'pointer'               // css            
        };                                                      // done named array                                                          
        self.buttonLayout = {                                   // named array
            'left'                  : 10,                       // integer
            'spacing'               : 6,                        // integer
            'width'                 : 40                        // integer
        };                                                      // done named array
        self.modules = {};                                      // named array
        // DONE MEMBERS

        // FUNCTIONS
        self.construct = function() {
        // FUNCTION: construct( void ) void
            
            // debug info
            self.debug( 'construct' );
            
            // create modules
            self.createModules();
            
        // DONE FUNCTION: construct( void ) void
        };
        self.createModules = function() {
        // FUNCTION: createModules( void ) void
            
            // debug info
            self.debug( 'createModules' );
            
            // create left
            let left = self.buttonLayout['left'];
            
            // new callback exists
            if( self.listOptions['newButton'] ){
            
                // get new button module
                let newButtonModule = nameSpace.newButtonModule;

                // set left
                self.buttonOptions['left'] = left + 'px';
                
                // create new button
                self.modules['newNutton'] = new newButtonModule( self.parentId,
                                                                 self.buttonOptions,
                                                                 self.listOptions,
                                                                 self.callbacks );
                // create new button            
                
            }
            // new callback exists            
            
        // DONE FUNCTION: createModules( void ) void
        };
        self.layoutChange = function() {
        // FUNCTION: layoutChange( void ) integer

           
        // DONE FUNCTION: layoutChange( void ) integer
        };
        self.destruct = function() {
        // FUNCTION: destruct( void ) void

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
                
            }
            
        };
        // DONE PUBLIC
        
    };
    // DONE MODULE: buttonsModule( html element id: parentId, 
    //                             named array: listOptions,
    //                             named array: callbacks ) named array  
    
})( mbAdminApp );
// done create module function
