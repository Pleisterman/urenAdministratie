/* 
        @package        Pleisterman/MbAdmin
        function: 
            this module controls selection of projecs. It controls the loads for open and
            closed projecs lists
            An open projecs list wil always be loaded and cashed 
            Closed projecs wil be loaded and cashed when needed
  
        Last revision:  06-02-2025
 */

// create module function
( function( mbAdminApp ){

    // get name space
    let nameSpace = mbAdminApp.items.projects;
    
    // MODULE: selectModule( void ) named array    
    nameSpace.selectModule = function( ) {
        // PRIVATE:
        
        // MEMBERS
        let self = this;                                        // object
        self.MODULE = 'ContentItemsProjectsSelectModule';       // string: MODULE
        self.debugOn = false;                                   // boolean
        self.options = {                                        // named array
            'selectCallback'  :   null                          // function / null
        };                                                      // done named array 
        self.openData = {                                       // named array
            'updated'   :       null,                           // dateTime
            'rows'      :       null                            // named array / null
        };                                                      // done named array 
        self.closedData = {                                     // named array
            'updated'   :       null,                           // dateTime
            'rows'      :       null                            // named array
        };                                                      // done named array 
        self.callerOptions = {                                  // named array 
            'callback'          :   null,                       // function / null
            'elementId'         :   null                        // html element id
        };                                                      // done named array 
        self.callback = null;                                   // function / null
        // DONE MEMBERS     
        
        // FUNCTIONS
        self.construct = function() {
        // FUNCTION: construct( void ) void
            
            // debug info
            self.debug( 'construct' );
            
        // DONE FUNCTION: construct( void ) void
        };
        self.load = function( callback ){
        // FUNCTION: load( function: callback ) void
            
            // debug info
            self.debug( 'load' );
            
            // rememeber callback
            self.callback = callback;
            
            // load open
            self.loadOpen();
            
        };
        self.loadOpen = function( ){
            
            // debug info
            self.debug( 'loadOpen' );

            // show busy screen
            mbAdminApp.startBusyProces();

            // construct data object
            let data = { 
                'what'              :   'list',
                'selection'         :   'open',
                'lastUpdated'       :   self.openData['updated']
            };
            // done construct data object

            // ajax
            mbAdminApp.read( 'projects/read', data, self.loadOpenCallback );
            
        // DONE FUNCTION: load( function: callback ) void
        };
        self.loadOpenCallback = function( result ){
        // FUNCTION: loadOpenCallback( json: result ) void
            
            // data changed
            if( !result['upToDate'] ){
                
                // set projects rows
                self.openData['rows'] = result['rows'];
                
                // set updated
                self.openData['updated'] = result['updated'];
                
                // debug info
                self.debug( 'updated:' + self.openData['updated'] );
                
            }
            else {
                
                // debug info
                self.debug( 'data up to date:' + self.openData['updated'] );
                
            }
            // data changed
            
            // end busy 
            mbAdminApp.endBusyProces();

            // call the callback    
            self.callback();
            
        // DONE FUNCTION: loadOpenCallback( json: result ) void
        };
        self.loadClosed = function( ){
        // FUNCTION: loadClosed( void ) void
            
            // debug info
            self.debug( 'load closed' );
            
            // show busy screen
            mbAdminApp.startBusyProces();

            // construct data object
            let data = { 
                'workDirectory'     :   mbAdminApp.workDirectory,
                'subject'           :   'projects',
                'what'              :   'list',
                'selection'         :   'closed',
                'lastUpdated'       :   self.closedData['updated']
            };
            // done construct data object

            // ajax
            mbAdminApp.read( '', data, self.loadClosedCallback );
            
        // DONE FUNCTION: loadClosed( void ) void
        };
        self.loadClosedCallback = function( result ){
        // FUNCTION: loadClosedCallback( json: result ) void
            
            // data changed
            if( !result['upToDate'] ){
                
                // set projects rows
                self.closedData['rows'] = result['rows'];
                
                // set updated
                self.closedData['updated'] = result['updated'];
                
                // debug info
                self.debug( 'updated:' + self.closedData['updated'] );
                
            }
            else {
                
                // debug info
                self.debug( 'data up to date:' + self.closedData['updated'] );
                
            }
            // data changed
            
            // end busy 
            mbAdminApp.endBusyProces();

            // call callback
            self.callback();
            
        // DONE FUNCTION: loadClosedCallback( json: result ) void
        };
        self.showListSelector = function( elementId ) {
        // FUNCTION: showListSelector( string: elementId ) void
            
            // debug info
            self.debug( 'showListSelector' );
            
            // remember calling element
            self.callerOptions['elementId'] = elementId;
            
            // set callback
            self.callback = self.lisSelectorLoadCallback;
            
            // load open 
            self.loadOpen();
            
        // DONE FUNCTION: showListSelector( string: elementId ) void
        };
        self.lisSelectorLoadCallback = function(){
        // FUNCTION: lisSelectorLoadCallback( void ) void
            
            // sort projects
            self.openData['rows'].sort( mbAdminApp.orderByText );

            // create selector options
            let options = {
                'id'                    :   'projects',
                'elementId'             :   self.callerOptions['elementId'],
                'headerText'            :   mbAdminApp.translations['projects'],
                'rows'                  :   self.openData['rows'],
                'filterChangeCallback'  :   self.listFilterChangeCallback,
                'selectCallback'        :   self.listSelectCallback
            };
            // done create selector options
            
            // open selector
            mbAdminApp.showListSelector( options );
            
        // DONE FUNCTION: lisSelectorLoadCallback( void ) void
        };
        self.listFilterChangeCallback = function( filter, callback ){
        // FUNCTION: listFilterChangeCallback( string: filter, function: callback ) void
            
            // debug info
            self.debug( 'returned filter: ' + filter );
            
            
            if( filter === 'open' ){
                
                // set callback
                self.callerOptions['callback'] = callback;
                
                self.callback = self.listSelectionOpenRefresh;
                
                // load open projects
                self.loadOpen();

            }
            else {
                
                // set callback
                self.callerOptions['callback'] = callback;
                
                self.callback = self.listSelectionClosedRefresh;
                
                // load open projects
                self.loadClosed();
                
            }
            
        // DONE FUNCTION: listFilterChangeCallback( string: filter, function: callback ) void
        };
        self.listSelectionOpenRefresh = function( ){
        // FUNCTION: listSelectionOpenRefresh( void ) void
            
             self.callerOptions['callback']( self.openData['rows'] );
            
        // DONE FUNCTION: listSelectionOpenRefresh( void ) void
        };
        self.listSelectionClosedRefresh = function( ){
        // FUNCTION: listSelectionClosedRefresh( void ) void
            
             self.callerOptions['callback']( self.closedData['rows'] );
            
        // DONE FUNCTION: listSelectionClosedRefresh( void ) void
        };
        self.listSelectCallback = function( selection ){
        // FUNCTION: listSelectCallback( json: selection ) void
            
            // debug info
            self.debug( 'returned selection: ' + selection );
            
            // call parent callback
            self.options['selectCallback']( selection );
            
        // DONE FUNCTION: listSelectCallback( json: selection ) void
        };
        self.getSelectData = function( id, callback ){
        // FUNCTION: getSelectData( integer: id, function: callback ) void
            
            // debug info
            self.debug( 'getSelectData id: ' + id );
            
            // remember callback
            self.callerOptions['callback'] = callback;
            
            // show busy screen
            mbAdminApp.startBusyProces();

            // construct data object
            let data = { 
                'workDirectory'     :   mbAdminApp.workDirectory,
                'subject'           :   'projects',
                'what'              :   'selectData',
                'selection'         :   id,
                'lastUpdated'       :   self.openData['updated'] 
            };
            // done construct data object
             
            // make the ajax call
            mbAdminApp.securePost( '/' + mbAdminApp.baseDirectory + '/read', mbAdminApp.token, data, self.getSelectDataCallback );
            
        // DONE FUNCTION: getSelectData( integer: id, function: callback ) void
        };
        self.getSelectDataCallback = function( result ){
        // FUNCTION: getSelectDataCallback( json: result ) void
            
            // check critical errors
            if( result['criticalError'] ){
                
                mbAdminApp.showCriticalError( result['criticalError'] );
                
                mbAdminApp.endBusyProces();
                
                return;
                
            }
            // done check critical errors

            // data changed
            if( !result['open']['upToDate'] ){
                
                // set projects rows
                self.openData['rows'] = result['open']['rows'];
                
                // set updated
                self.openData['updated'] = result['open']['updated'];
                
                // debug info
                self.debug( 'updated:' + self.openData['updated'] );
                
            }
            else {
                
                result['open']['rows'] = self.openData['rows'];
                
                // debug info
                self.debug( 'data up to date:' + self.openData['updated'] );
                
            }
            // data changed
            
            // hide busy screen
            mbAdminApp.endBusyProces();
            
            // call the callback
            self.callerOptions['callback']( result );
            
        // DONE FUNCTION: getSelectDataCallback( json: result ) void
        };
        self.debug = function( message ) {
        // FUNCTION: debug( string: message ) void
            
            // debug is on
            if( self.debugOn ) {
                
                // call global debug
                mbAdminApp.debug( self.MODULE + ' ' + message );
                
            }
            // done debug is on
            
        // DONE FUNCTION: debug( string: message ) void
        };
        // DONE FUNCTIONS

        // initialize the class 
        self.construct();
        // DONE PRIVATE
        
        // PUBLIC
        return {
            
            // FUNCTION: load( function: callback ) void
            load :  function( callback ){
                // call internal
                self.load( callback );
            },
            // FUNCTION: setSelectCallback( function: callback ) void
            setSelectCallback :  function( callback ){
                // call internal
                self.options['selectCallback'] = callback;
            },
            // FUNCTION: showListSelector( string: elementId ) void
            showListSelector :  function( elementId ){
                // call internal
                self.showListSelector( elementId );
            },
            // FUNCTION: getSelectData( string: elementId, function: callback ) void
            getSelectData :  function( id, callback ){
                // call internal
                self.getSelectData( id, callback );
            }
        };
        // DONE PUBLIC
        
    };
    // DONE MODULE: selectModule( void ) named array  
    
})( mbAdminApp );
// done create module function
