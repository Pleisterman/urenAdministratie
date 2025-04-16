/*
        @package        Pleisterman/MbAdmin
  
        function:       displays a the header of the list template 
  
        Last revision:  27-02-2025
 
*/

// create module function
( function( mbAdminApp ){

    // get name space
    let nameSpace = mbAdminApp.content.templates.edit.select.list;
    
    // create name space
    nameSpace.header = nameSpace.header ? nameSpace.header : {};
    
    // MODULE: headerModule( html element id: parentId, 
    //                     named array: listOptions ) named array  
    nameSpace.header.headerModule = function( parentId, listOptions ) {
        // PRIVATE:

        // MEMBERS:
        let self = this;                                        // object
        self.MODULE = 'ContentTemplatesEditSelectListHeaderModule'; // string
        self.debugOn = false;                                   // boolean
        self.parentId = parentId;                               // html element id
        self.listOptions = listOptions;                         // named array
        self.containerOptions = {                               // named array 
            'id'                :   mbAdminApp.getUiId( self.MODULE + 'Container' ), // string 
            'element'           :   'div',                      // html element type 
            'position'          :   'relative',                 // css
            'width'             :   '100%',                     // css
            'height'            :   '60px',                     // css
            'borderTop'         :   true,                       // boolean
            'borderBottom'      :   true,                       // boolean
            'borderWidth'       :   '1px',                      // css
            'borderStyle'       :   'groove',                   // css
            'color'             :   mbAdminApp.getColor( 'darkest' ).color, // css
            'backgroundColor'   :   mbAdminApp.getColor( 'lighter' ).color, // css
            'borderColor'       :   mbAdminApp.getColor( 'dark' ).color, // css 
            'colors' : {                                        // done named array
                'color'             :   mbAdminApp.getColor( 'darkest' ).color, // color
                'highlight'         :   mbAdminApp.getColor( 'light' ).highlight, // color
                'background' : {                                // named array
                    'color'         :   mbAdminApp.getColor( 'lighter' ).color, // color
                    'highlight'     :   mbAdminApp.getColor( 'dark' ).highlight // color
                },                                              // done named array
                'border' : {                                    // named array
                    'color'         :   mbAdminApp.getColor( 'dark' ).color, // color
                    'highlight'     :   mbAdminApp.getColor( 'lighter' ).highlight // color
                }                                               // done named array
            },                                                  // done named array
            'cursor'            :   'pointer'                   // css            
        };                                                      // done named array 
        self.titleOptions = {                                   // named array 
            'id'                    :   mbAdminApp.getUiId( self.MODULE + 'Title' ), // string 
            'element'           :   'div',                      // html element type 
            'position'          :   'absolute',                 // css
            'left'              :   '40px',                     // css
            'top'               :   '12px',                     // css
            'text'              :   self.listOptions['title'],  // string
            'fontWeight'        :   'bold',                     // css
            'padding'           :   '8px 10px',                 // css
            'color'             :   'inherit',                  // css
            'backgroundColor'   :   'transparent',              // css
            'pointerEvents'     :   'none'                      // css
        };                                                      // done named array 
        // DONE MEMBERS

        // FUNCTIONS
        self.construct = function() {
        // FUNCTION: construct( void ) void
            
            // debug info
            self.debug( 'construct' );
            
            // add html
            self.addHtml();
            
        // DONE FUNCTION: construct( void ) void
        };
        self.addHtml = function() {
        // FUNCTION: addTitle( void ) void
            
            // debug info
            self.debug( 'addTitle' );

            // add container to parent
            mbAdminApp.appendContainer( self.parentId, self.containerOptions );
                        
            // add title to container
            mbAdminApp.appendContainer( self.containerOptions['id'], self.titleOptions );
                        
        // DONE FUNCTION: addHtml( void ) void
        };
        self.removeHtml = function() {
        // FUNCTION: removeHtml( void ) void
            
            // remove title
            mbAdminApp.getElementById( self.titleOptions['id'] ).remove();
            
            // remove container
            mbAdminApp.getElementById( self.containerOptions['id'] ).remove();
            
        // DONE FUNCTION: removeHtml( void ) void
        };
        self.layoutChange = function() {
        // FUNCTION: layoutChange( void ) void

           
        // DONE FUNCTION: layoutChange( void ) void
        };
        self.destruct = function() {
        // FUNCTION: destruct( void ) void

            // remove html
            self.removeHtml();

            // unset list options
            self.listOptions = null;
            
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
    // DONE MODULE: headerModule( html element id: parentId, 
    //                            named array: listOptions ) named array  
    
})( mbAdminApp );
// done create module function
