/*
        @package        Pleisterman/MbAdmin
  
        function:       displays the row select of the list template
  
        Last revision:  27-02-2025
 
*/

// create module function
( function( mbAdminApp ){

    // get name space
    const nameSpace = mbAdminApp.content.templates.edit.select.list.selections;
    
    // create name space
    nameSpace.rowSelect = nameSpace.rowSelect ? nameSpace.rowSelect : {};
    
    // MODULE: rowSelectModule( html element id: parentId, 
    //                          named array: listOptions, 
    //                          named array: data,
    //                          named array: callbacks ) named array  
    nameSpace.rowSelect.rowSelectModule = function( parentId, listOptions, data, callbacks ) {
        // PRIVATE:

        // MEMBERS:
        const self = this;                                      // object
        self.MODULE = 'ContentTemplatesEditSelectListRowSelectModule';    // string
        self.debugOn = false;                                   // boolean
        self.parentId = parentId;                               // html element id
        self.listOptions = listOptions;                         // named array
        self.data = data;                                       // named array
        self.callbacks = callbacks;                             // named array
        self.containerOptions = {                               // named array 
            'id'                    :   mbAdminApp.getUiId( self.MODULE + 'Container' ), // string 
            'element'               :   'div',                  // html element type 
            'position'              :   'relative',             // css
            'width'                 :   '100%',                 // css
            'backgroundColor'       :   mbAdminApp.getColor( 'lightest' ).color, // css
            'borderTop'             :   true,                   // boolean
            'borderBottom'          :   true,                   // boolean
            'borderWidth'           :   '1px',                  // css
            'borderColor'           :   mbAdminApp.getColor( 'dark' ).color, // css 
            'borderStyle'           :   'groove'                // css          
        };                                                      // done named array 
        self.contentOptions = {                                 // named array 
            'id'                    :   mbAdminApp.getUiId( self.MODULE + 'Container' ), // string 
            'element'               :   'div',                  // html element type 
            'position'              :   'relative',             // css
            'width'                 :   '220px',                // css
            'margin'                :   '0 auto',               // css
            'height'                :   '40px'                  // css
        };                                                      // done named array 
        self.buttonOptions = {                                  // named array
            'element'               :   'div',                  // html element type 
            'position'              :   'absolute',             // css
            'width'                 :   '40px',                 // css
            'height'                :   '25px',                 // css
            'top'                   :   '6px',                  // css
            'backgroundSize'        :   '20px',                 // css
            'backgroundRepeat'      :   'no-repeat',            // css
            'backgroundPosition'    :   'center',               // css
            'color'                 :   mbAdminApp.getColor( 'dark' ).color, // css 
            'backgroundColor'       :   mbAdminApp.getColor( 'lightest' ).color, // css 
            'colors' : {                                        // named array
                'color'             :   mbAdminApp.getColor( 'dark' ).color, // color
                'highlight'         :   mbAdminApp.getColor( 'darker' ).highlight, // color
                'background' : {                                    // named array
                    'color'         :   mbAdminApp.getColor( 'lightest' ).color, // color
                    'highlight'     :   mbAdminApp.getColor( 'lightest' ).highlight // color
                }                                               // done named array
            },                                                  // done named array
            'border'                :   true,                   // boolean
            'borderWidth'           :   '1px',                  // css
            'borderColor'           :   'transparent',          // css 
            'borderStyle'           :   'groove',               // css
            'cursor'                :   'pointer'               // css            
        };                                                      // done named array                                                          
        self.layout = {                                         // named array
            'left'                  : 0,                        // integer
            'spacing'               : 10,                       // integer
            'button' : {                                        // named array
                'width'             : 40                        // integer
            },                                                  // done named array
            'display' : {                                       // named array
                'width'             : 120                       // integer
            }                                                   // done named array
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
            
            // create modules
            self.createModules();
            
        // DONE FUNCTION: construct( void ) void
        };
        self.addHtml = function() {
        // FUNCTION: addHtml( void ) void
            
            // debug info
            self.debug( 'addHtml' );

            // add container to parent
            mbAdminApp.appendContainer( self.parentId, self.containerOptions );
                                    
            // add content to container
            mbAdminApp.appendContainer( self.containerOptions['id'], self.contentOptions );
                                    
        // DONE FUNCTION: addHtml( void ) void
        };
        self.removeHtml = function() {
        // FUNCTION: removetml( void ) void
            
            // debug info
            self.debug( 'removeHtml' );

            // remove content
            mbAdminApp.getElementById( self.contentOptions['id'] ).remove();
            
            // remove container
            mbAdminApp.getElementById( self.containerOptions['id'] ).remove();
            
        // DONE FUNCTION: removeHtml( void ) void
        };
        self.createModules = function() {
        // FUNCTION: createModules( void ) void
            
            // add previous button
            self.addPreviousButton();
            
            // add display
            self.addDisplay();
            
            // add next button
            self.addNextButton();
            
        // DONE FUNCTION: createModules( void ) void
        };
        self.removeModules = function() {
        // FUNCTION: removeModules( void ) void
            
            // loop over list types
            Object.entries( self.modules ).forEach( ( [index, module] ) => {
                
                // destroy module
                module.destruct( );
                
            });
            // done loop over list types
            
            // reset modules
            self.modules = {};
            
        // DONE FUNCTION: removeModules( void ) void
        };
        self.addPreviousButton = function() {
        // FUNCTION: addButtons( void ) void
            
            // debug info
            self.debug( 'addPreviousButton' );

            // set left
            self.left = self.layout['left'];
            
            // set button left
            self.buttonOptions['left'] = self.left + 'px';

            // get previous button module
            const previousButtonModule = nameSpace.rowSelect.previousButtonModule;

            // create previous button
            self.modules['previousButton'] = new previousButtonModule( self.contentOptions['id'],
                                                                       self.buttonOptions,
                                                                       self.data,
                                                                       self.listOptions,
                                                                       self.callbacks );
            // create previous button
            
            // add button width to left
            self.left += self.layout['button']['width'];

            // add spacing
            self.left += self.layout['spacing'];
            
        // DONE FUNCTION: addPreviousButton( void ) void
        };
        self.addDisplay = function() {
        // FUNCTION: addDisplay( void ) void
            
            // debug info
            self.debug( 'addDisplay' );

            // get display module
            const displayModule = nameSpace.rowSelect.displayModule;

            // create display 
            self.modules['display'] = new displayModule( self.contentOptions['id'],
                                                         self.left,
                                                         self.data,
                                                         self.listOptions,
                                                         self.callbacks );
            // create display 
            
            // add display width to left
            self.left += self.layout['display']['width'];

            // add spacing
            self.left += self.layout['spacing'];
            
        // DONE FUNCTION: addDateDisplay( void ) void
        };
        self.addNextButton = function() {
        // FUNCTION: addNextButton( void ) void
            
            // debug info
            self.debug( 'addPreviousButton' );

            // set button left
            self.buttonOptions['left'] = self.left + 'px';

            // get next button module
            const nextButtonModule = nameSpace.rowSelect.nextButtonModule;

            // create next button
            self.modules['nextButton'] = new nextButtonModule( self.contentOptions['id'],
                                                               self.buttonOptions,
                                                               self.data,
                                                               self.listOptions,
                                                               self.callbacks );
            // create next button
            
        // DONE FUNCTION: addNextButton( void ) void
        };
        self.layoutChange = function() {
        // FUNCTION: layoutChange( void ) void

           
       // DONE FUNCTION: layoutChange( void ) void
        };
        self.destruct = function() {
        // FUNCTION: destruct( void ) void

            // remove modules
            self.removeModules();
            
            // remove html
            self.removeHtml();
            
            // unset list options
            self.listOptions = null;
            
            // unset data
            self.data = null;
            
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
    // DONE MODULE: rowSelectModule( html element id: parentId, 
    //                               named array: listOptions,
    //                               named array: data,
    //                               named array: callbacks ) named array  
    
})( mbAdminApp );
// done create module function
