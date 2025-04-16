/*
        @package        Pleisterman/MbAdmin
  
        function:       contains the list template
  
        Last revision:  27-02-2025
 
*/

// create module function
( function( mbAdminApp ){

    // get name space
    let nameSpace = mbAdminApp.content.templates.edit.select;
    
    // create name space
    nameSpace.list = nameSpace.list ? nameSpace.list : {};

    // MODULE: listModule( html element id: callerId, 
    //                     named array: itemOptions, 
    //                     named array: callbacks ) named array 
    nameSpace.list.listModule = function( callerId, itemOptions, callbacks ) {
        // PRIVATE:

        // MEMBERS:
        let self = this;                                        // object
        self.MODULE = 'ContentTemplatesEditSelectListModule';   // string
        self.debugOn = false;                                   // boolean
        self.callerId = callerId;                               // html element id
        self.itemOptions = itemOptions;                         // named array
        self.callbacks = callbacks;                             // named array
        self.containerOptions = {                               // named array 
            'id'                :   mbAdminApp.getUiId( self.MODULE + 'Container' ), // string 
            'element'           :   'div',                      // html element type 
            'position'          :   'absolute',                 // css
            'width'             :   '15rem',                    // css
            'overflowX'         :   'hidden',                   // css
            'backgroundColor'   :   mbAdminApp.getColor( 'lightest' ).color, // css
            'borderRadius'      :   '3px',                      // css
            'border'            :   true,                       // boolean
            'borderWidth'       :   '1px',                      // css
            'borderColor'       :   mbAdminApp.getColor( 'darkest' ).color, // css 
            'borderStyle'       :   'groove',                   // css
            'boxShadow'         :   '1px 1px 0.0px 1px rgba( 55, 95, 55, 0.2 )' // css
        };                                                      // done named array 
        self.displayOptions = {                                 // named array
            'defaultAlign'      :   'center',                   // string
            'minimumTop'        :   45,                         // integer
            'spacingLeft'       :    -20,                       // integer
            'spacingRight'      :    8,                         // integer
            'spacingTop'        :    32,                        // integer
            'spacingBottom'     :    32                         // integer
        };                                                      // done named array 
        self.parentId = mbAdminApp.getMainOverlayId();          // html element id
        self.container = null;                                  // module / null 
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
                        
            // show
            self.show();
            
            // add events
            self.addEvents();
            
            // add laod data
            self.modules['data'].loadData();
            
        // DONE FUNCTION: construct( void ) void
        };
        self.addEventSubscriptions = function(){
        // FUNCTION: addEventSubscriptions( void ) void

            // debug info
            self.debug( 'addEventSubscriptions' );

            // add scene change
            mbAdminApp.subscribeToEvent( 'layoutChange', self.layoutChange );
            
        // DONE FUNCTION: addEventSubscriptions( void ) void
        };
        self.removeEventSubscriptions = function(){
        // FUNCTION: removeEventSubscriptions( void ) void

            // debug info
            self.debug( 'removeEventSubscriptions' );

            // remove scene change
            mbAdminApp.unSubscribeFromEvent( 'layoutChange', self.layoutChange );
            
        // DONE FUNCTION: removeEventSubscriptions( void ) void
        };
        self.addHtml = function() {
        // FUNCTION: addHtml( void ) void
            
            // debug info
            self.debug( 'addHtml' );

            // create callbacks
            let callbacks = {
                'click'         :   self.containerClick
            };
            // create callbacks

            // create input
            self.container = new mbAdminApp.ui.buttonModule( self.parentId,
                                                             self.containerOptions,
                                                             callbacks );
            // create input
            
        // DONE FUNCTION: addHtml( void ) void
        };
        self.removeHtml = function() {
        // FUNCTION: removeHtml( void ) void
            
            // remove container
            self.container.destruct();
            
            // unset entry
            self.container = null;
            
        // DONE FUNCTION: removeHtml( void ) void
        };
        self.containerClick = function( event ) {
        // FUNCTION: containerClick( event: event ) void
            
            // stop propagation
            event.stopPropagation();
            
        // DONE FUNCTION: containerClick( event: event ) void
        };
        self.createModules = function() {
        // FUNCTION: createModules( void ) void
            
            // debug info
            self.debug( 'createModules' );
            
            // create data 
            self.createData();
            
            // create header
            self.createHeader();
            
            // create selections
            self.createSelections();
            
            // create content
            self.createContent();
            
        // DONE FUNCTION: createModules( void ) void
        };
        self.removeModules = function() {
        // FUNCTION: removeModules( void ) void
            
            // loop over modules
            Object.entries( self.modules ).forEach( ( [index, module] ) => {
            
                // destroy module
                module.destruct( );
                
            });
            // done loop over modules
           
           // reset modules
           self.modules = {};
            
        // DONE FUNCTION: removeModules( void ) void
        };
        self.createData = function() {
        // FUNCTION: createData( void ) void
            
            // get data module
            let dataModule = nameSpace.list.data.dataModule;

            // create callbacks
            let callbacks = {
                'dataLoaded'    :   self.dataLoaded
            };
            // create callbacks
            
            // create data
            self.modules['data'] = new dataModule( self.itemOptions,
                                                   callbacks );
            
        // DONE FUNCTION: createData( void ) void
        };
        self.createHeader = function() {
        // FUNCTION: createHeader( void ) void
            
            // get header module
            let headerModule = nameSpace.list.header.headerModule;

            // create header
            self.modules['header'] = new headerModule( self.containerOptions['id'],
                                                       self.itemOptions['listOptions'] );
            // create header
            
        // DONE FUNCTION: createHeader( void ) void
        };
        self.createSelections = function() {
        // FUNCTION: createSelections( void ) void
            
            // get selections module
            let selectionsModule = nameSpace.list.selections.selectionsModule;

            // create callbacks
            let callbacks = {
                'loadData'    :   self.modules['data'].loadData
            };
            // create callbacks
            
            // create selections
            self.modules['selections'] = new selectionsModule( self.containerOptions['id'],
                                                               self.itemOptions['listOptions'],
                                                               callbacks );
            // create selection
            
        // DONE FUNCTION: createDateSelections( void ) void
        };
        self.createContent = function() {
        // FUNCTION: createContent( void ) void
            
            // get content module
            let contentModule = nameSpace.list.content.contentModule;
            
            // create callbacks
            let callbacks = {
                'select'    :   self.callbacks['select']
            };
            // create callbacks
            
            // create content
            self.modules['content'] = new contentModule( self.containerOptions['id'],
                                                         self.itemOptions['listOptions'],
                                                         callbacks );
            // create content
            
        // DONE FUNCTION: createContent( void ) void
        };
        self.show = function() {
        // FUNCTION: show( void ) void
            
            // show layer
            mbAdminApp.setStyle( self.parentId, 'display', 'block' );

            // adjust layout 
            self.layoutChange();
            
            // add event subscriptions
            self.addEventSubscriptions();
            
        // DONE FUNCTION: show( void ) void
        };
        self.hide = function() {
        // FUNCTION: hide( void ) void
            
            // remove event subscriptions
            self.removeEventSubscriptions();
            
            // hide layer
            mbAdminApp.setStyle( self.parentId, 'display', 'none' );

        // DONE FUNCTION: hide( void ) void
        };
        self.addEvents = function() {
        // FUNCTION: addEvents( void ) void
            
            // debug info
            self.debug( 'addEvents' );
            
            // add click
            mbAdminApp.getElementById( self.parentId ).addEventListener( 'click', self.cancel ); 
            
        // DONE FUNCTION: addEvents( void ) void
        };
        self.removeEvents = function() {
        // FUNCTION: removeEvents( void ) void
            
            // debug info
            self.debug( 'removeEvents' );
            
            // remove click
            mbAdminApp.getElementById( self.parentId ).removeEventListener( 'click' , self.cancel ); 
            
        // DONE FUNCTION: removeEvents( void ) void
        };
        self.cancel = function( event, options ) {
        // FUNCTION: cancel( event: event, named array: options ) void

            // debug info
            self.debug( 'cancel' );
            
            // call callback
            self.callbacks['cancel']();

        // DONE FUNCTION: cancel( event: event, named array: options ) void
        };
        self.dataLoaded = function( data ) {
        // FUNCTION: dataLoaded( named array: data ) void

            // set selections data 
            self.modules['selections'].setData( data );                
                
            // set content data 
            self.modules['content'].setData( data );                
                
            // adjust layout
            self.layoutChange();
            
        // DONE FUNCTION: dataLoaded( named array: data ) void
        };
        self.layoutChange = function() {
        // FUNCTION: layoutChange( void ) void

            // container ! exists
            if( !mbAdminApp.getElementById( self.callerId ) ){
                
                // done
                return;
                
            }
            // container ! exists

            // get window layout
            const windowLayout = mbAdminApp.getWindowDimensions();
            
            // get caller layout
            const callerLayout = mbAdminApp.getElementById( self.callerId ).getBoundingClientRect();
            
            // get container layout
            const containerLayout = mbAdminApp.getElementById( self.containerOptions['id'] ).getBoundingClientRect();
            
            // create left
            let left = callerLayout.left;
            
            // add caller width
            left += callerLayout.width / 2;

            // add spacing left
            left += self.displayOptions['spacingLeft'];
                
            // set minimum
            left = Math.max( left, self.displayOptions['spacingLeft'] );
       
            // set left
            mbAdminApp.setStyle( self.containerOptions['id'], 'left', left + 'px' );
            
            // calculate top
            let top = callerLayout.top - containerLayout.height + self.displayOptions['spacingTop'];
       
            // set minimum
            top = Math.max( top, self.displayOptions['spacingTop'] );
       
            // set maximum
            top = Math.min( top, windowLayout.height - ( containerLayout.height + self.displayOptions['spacingBottom'] ) );
       
            // set top
            mbAdminApp.setStyle( self.containerOptions['id'], 'top', top + 'px' );

        // DONE FUNCTION: layoutChange( void ) void
        };
        self.destruct = function() {
        // FUNCTION: destruct( void ) void

            // hide
            self.hide();

            // remove events
            self.removeEvents();
            
            // remove modules
            self.removeModules();
            
            // remove html
            self.removeHtml();
            
            // unset item options
            self.itemOptions = null;
            
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
                        
            // FUNCTION: destruct( void ) void    
            destruct : function( ){
                
                // call internal
                self.destruct( );
                
            }
            
        };
        // DONE PUBLIC
        
    };
    // DONE MODULE: listModule( html element id: callerId, 
    //                          named array: itemOptions, 
    //                          named array: callbacks ) named array  
    
})( mbAdminApp );
// done create module function
