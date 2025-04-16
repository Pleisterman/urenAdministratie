/*
        @package        Pleisterman/MbAdmin
        function:       displays the the horizontal divider of the lists module
                        the divider is position is set in:
                            user option: leftPanelDividerPosition
                        the minimum width of the panel is set in 
                            settings: leftPanel.minimumWidth    

        Last revision:  27-02-2025
 
*/

// create module function
( function( mbAdminApp ){

    // get name space
    let nameSpace = mbAdminApp.content.lists;
    
    // MODULE: dividerModule( html element id: parentId ) named array 
    nameSpace.dividerModule = function( parentId ) {
    // PRIVATE:
        
        // MEMBERS
        let self = this;                                    // object
        self.MODULE = 'ContentListsDividerModule';          // string
        self.debugOn = false;                               // boolean
        self.parentId = parentId;                           // html element id
        self.containerOptions = {                           // named array 
            'id'                :   mbAdminApp.getUiId( self.MODULE + 'Divider' ), // string 
            'element'           :   'div',                  // html element type 
            'position'          :   'absolute',             // css
            'totalWidth'        :   8,                      // integer
            'width'             :   '8px',                  // css
            'cursor'            :   'ew-resize',            // css    
            'height'            :   '100%',                 // css
            'imageUrl'          :   'url(' + 
                                        mbAdminApp.options.imageUrl + 
                                        'verticalDividerBackground.png' +
                                    ')',                     // css
            'images' : {                                     // named array
                'image'         :   'url(' + 
                                        mbAdminApp.options.imageUrl + 
                                        'verticalDividerBackground.png' +
                                    ')',                     // css
                'highlight'     :   'url(' + 
                                        mbAdminApp.options.imageUrl + 
                                        'verticalDividerHighlightBackground.png' +
                                    ')'                      // css
            },                                               // done named array
            'backgroundSize'    :   '8px 28px',              // css
            'backgroundPosition':   'center center',         // css
            'zIndexDragArea'    :   mbAdminApp.getSetting( 'zIndexes' ).dragArea // css
        };                                                   // done named array 
        self.postition = parseInt( mbAdminApp.getUserOption( 'leftPanelDividerPosition' ) ); // string
        self.modules = {};                                   // named array  
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

            // create callbacks
            let callbacks = {
                'drag'      :   self.drag,
                'endDrag'   :   self.endDrag
            };
            // create callbacks

            // create dragable
            self.modules['dragAble'] = new mbAdminApp.ui.dragAbleModule( self.parentId, 
                                                                         self.containerOptions, 
                                                                         callbacks );
            // create dragable
                                       
            // set align
            self.modules['dragAble'].setAlign( 'right' );
            
        // DONE FUNCTION: createModules( void ) void
        };
        self.drag = function( change ) {
        // FUNCTION: drag( named array: change ) void

            // debug info
            self.debug( ' drag X: ' + change['x'] );
            self.debug( ' div os: ' + self.postition );
            // debug info
                        
            // get window dimensions
            let windowDimensions = mbAdminApp.getWindowDimensions();
            
            // calculate parentWidth
            let panelWidth = self.postition + change['x'];
            
            // set maximum
            panelWidth = Math.min( panelWidth, windowDimensions.width );
            
            // set divider position
            self.postition = panelWidth;
            
            // set left
            mbAdminApp.setStyle( self.parentId, 'width', self.postition + 'px' );
            
        // DONE FUNCTION: drag( named array: change ) void
        };
        self.endDrag = function(  ) {
        // FUNCTION: endDrag( void ) void
                        
            // debug info            
            self.debug( ' end drag ' );
            
            // get minimum width
            let minimumWidth = mbAdminApp.getSetting( 'leftPanel' ).minimumWidth;
            
            // claculate minimum
            self.postition = Math.max( minimumWidth, self.postition );
            
            // set user options
            mbAdminApp.setUserOption( 'leftPanelDividerPosition', self.postition );

            // adjust scene
            mbAdminApp.callEvent( 'sceneChange' );

        // DONE FUNCTION: endDrag( void ) void
        };
        self.layoutChange = function() {
        // FUNCTION: layoutChange( void ) integer

            // get parent layout
            let parentLayout = mbAdminApp.getElementById( parentId ).getBoundingClientRect();

            // calculate left
            let left = parentLayout.width - self.containerOptions['totalWidth'];

            // set left
            mbAdminApp.setStyle( self.containerOptions['id'], 'left', left + 'px' );

            // return container width
            return self.containerOptions['totalWidth'];
            
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
            
            // FUNCTION: layoutChange( void ) integer
            layoutChange : function( ){
                
                // return internal
                return self.layoutChange( );
                
            }
            
        };
        
    // DONE PUBLIC
    };
    // DONE MODULE: horizontalDividerModule( html element id: parentId ) named array
    
})( mbAdminApp );
// done create module function
