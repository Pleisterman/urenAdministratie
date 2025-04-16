/*
        @package        Pleisterman/MbAdmin
  
        function:       displays the lists
  
        Last revision:  27-02-2025
 
*/

// create module function
( function( mbAdminApp ){

    // get name space
    let nameSpace = mbAdminApp.content;
    
    // create name space
    nameSpace.lists = nameSpace.lists ? nameSpace.lists : {};

    // MODULE: itemsModule( void ) named array
    nameSpace.lists.listsModule = function( ) {
        // PRIVATE:
  
        // MEMBERS:
        let self = this;                                        // object
        self.MODULE = 'ContentListsModule';                     // string
        self.debugOn = false;                                   // boolean
        self.containerOptions = {                               // named array 
            'id'                    :   mbAdminApp.getUiId( self.MODULE + 'Container' ), // string 
            'element'               :   'div',                  // html element type 
            'position'              :   'absolute',             // css
            'height'                :   '100%',                 // css
            'top'                   :   0,                      // css
            'left'                  :   0,                      // css
            'overflowX'             :   'hidden',               // css
            'overflowY'             :   'auto',                 // css
            'backgroundColor'       :   mbAdminApp.getColor( 'lightest' ).color // css
        };                                                      // done named array 
        self.scrollbarWidth = 6;                                // integer
        self.modules = {};                                      // named array
        // DONE MEMBERS

        // FUNCTIONS
        self.construct = function() {
        // FUNCTION: construct( void ) void
            
            // debug info
            self.debug( 'construct' );
            
            // add html
            self.addHtml();
            
            // create divider
            self.createDivider();
            
        // DONE FUNCTION: construct( void ) void
        };
        self.addHtml = function() {
        // FUNCTION: addHtml( void ) void
            
            // debug info
            self.debug( 'addHtml' );

            // get parent id
            let parentId = mbAdminApp.getLayoutId( 'leftPanelContent' );

            // add container to parent
            mbAdminApp.appendContainer( parentId, self.containerOptions );
                        
        // DONE FUNCTION: addHtml( void ) void
        };
        self.createDivider = function() {
        // FUNCTION: createDivider( void ) void
            
            // debug info
            self.debug( 'createDivider' );

            // get panel container id
            let panelContainerId = mbAdminApp.getLayoutId( 'leftPanel' );

            // get divider module
            let dividerModule = nameSpace.lists.dividerModule;

            // create divider
            self.modules['divider'] = new dividerModule( panelContainerId );
                        
        // DONE FUNCTION: createDivider( void ) void
        };
        self.layoutChange = function() {
        // FUNCTION: layoutChange( void ) integer

            // get user options
            let userOptions = mbAdminApp.options.user;

            // adjust divider
            self.modules['divider'].layoutChange();

            // subtract scroll bar
            let width = userOptions['leftPanelDividerPosition'] - self.scrollbarWidth;

            // set width
            mbAdminApp.setStyle( self.containerOptions['id'], 'width', width + 'px' );
                         
        // DONE FUNCTION: layoutChange( void ) integer
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
            
            // FUNCTION: getContainerId( void ) html element id    
            getContainerId : function( ){
                
                // return result
                return self.containerOptions['id'];
                
            },
            // FUNCTION: layoutChange( void ) void    
            layoutChange : function( ){
                
                // call internal
                self.layoutChange( );
                
            }
            
        };
        // DONE PUBLIC
        
    };
    // DONE MODULE: listsModule( void ) named array  
    
})( mbAdminApp );
// done create module function
