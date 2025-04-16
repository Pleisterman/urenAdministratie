/* 
        @package        Pleisterman/MbAdmin
        function: 
            this module controls selection of vehicles. It controls the loads for open and
            closed vehicles lists
            An open vehicles list wil always be loaded and cashed 
            Closed vehicles wil be loaded and cashed when needed
  
        Last revision:  10-02-2025
 */

// create module function
( function( mbAdminApp ){
    
    // get name space
    let nameSpace = mbAdminApp.items.vehicles;
    
    // MODULE: selectModule( void ) named array
    nameSpace.selectModule = function( ) {
        // PRIVATE:
        
        // MEMBERS
        let self = this;                                    // object
        self.MODULE = 'vehiclesSelectModule';               // string
        self.debugOn = false;                               // boolean
        self.options = {                                    // named array
            'selectCallback'  :   null                      // function / null
        };                                                  // done named array
        self.openData = {                                   // named array
            'updated'   :       null,                       // dateTime 
            'rows'      :       null                        // named array
        };                                                  // done named array
        self.closedData = {                                 // named array
            'updated'   :       null,                       // dateTime
            'rows'      :       null                        // named array
        };                                                  // done named array
        self.callerOptions = {                              // named array
            'callback'          :   null,                   // function / null
            'elementId'         :   null                    // string
        };                                                  // done named array
        self.callback = null;                               // function / null
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
            
            // load open vehicles
            self.loadOpen();
            
        // DONE FUNCTION: load( function: callback ) void
        };
        self.loadOpen = function( ){
        // FUNCTION: loadOpen( void ) void
            
            // debug info
            self.debug( 'loadOpen' );

            // show busy screen
            mbAdminApp.startBusyProces();

            // construct data object
            let data = { 
                'subject'           :   'vehicles',
                'what'              :   'list',
                'selection'         :   'open',
                'lastUpdated'       :   self.openData['updated']
            };
            // done construct data object

            // ajax
            mbAdminApp.server.read( data, self.loadOpenCallback );
            
        // DONE FUNCTION: loadOpen( void ) void
        };
        self.loadOpenCallback = function( result ){
        // FUNCTION: loadOpenCallback( json: result ) void
            
            // check critical errors
            if( result['criticalError'] ){
                
                // show critical error
                mbAdminApp.showCriticalError( result['criticalError'] );
                
                // end busy
                mbAdminApp.endBusyProcess();
                
                // return error 
                return;
                
            }
            // done check critical errors

            // data changed
            if( !result['upToDate'] ){
                
                // set vehicles rows
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
            mbAdminApp.endBusyProcess();

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
                'subject'           :   'vehicles',
                'what'              :   'list',
                'selection'         :   'closed',
                'lastUpdated'       :   self.closedData['updated']
            };
            // done construct data object

            // ajax
            mbAdminApp.server.read( data, self.loadClosedCallback );
            
        // DONE FUNCTION: loadClosed( void ) void
        };
        self.loadClosedCallback = function( result ){
        // FUNCTION: loadClosedCallback( json: result ) void
            
            // check critical errors
            if( result['criticalError'] ){
                
                // show critical error
                mbAdminApp.showCriticalError( result['criticalError'] );
                
                // end busy
                mbAdminApp.endBusyProcess();
                
                // error return
                return;
                
            }
            // done check critical errors

            // data changed / else
            if( !result['upToDate'] ){
                
                // set vehicles rows
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
            // data changed / else
            
            // end busy 
            mbAdminApp.endBusyProcess();

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
            
            // load open vehicles
            self.loadOpen();
            
        // DONE FUNCTION: showListSelector( string: elementId ) void
        };
        self.lisSelectorLoadCallback = function(){
        // FUNCTION: lisSelectorLoadCallback( void ) void
            
            // sort vehicles
            self.openData['rows'].sort( mbAdminApp.orderByText );

            // create selector options
            let options = {
                'id'                    :   'vehicles',
                'elementId'             :   self.callerOptions['elementId'],
                'headerText'            :   'Vehicles',
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
            
            // filter is open / else
            if( filter === 'open' ){
                
                // set callback
                self.callerOptions['callback'] = callback;
                
                self.callback = self.listSelectionOpenRefresh;
                
                // load open vehicles
                self.loadOpen();
                

            }
            else {
                
                // set callback
                self.callerOptions['callback'] = callback;
                
                // set callback
                self.callback = self.listSelectionClosedRefresh;
                
                // load open vehicles
                self.loadClosed();
                
            }
            // filter is open / else
            
        // DONE FUNCTION: listFilterChangeCallback( string: filter, function: callback ) void
        };
        self.listSelectionOpenRefresh = function( ){
        // FUNCTION: listSelectionOpenRefresh( void ) void

            // call callback
            self.callerOptions['callback']( self.openData['rows'] );
            
        // DONE FUNCTION: listSelectionOpenRefresh( void ) void
        };
        self.listSelectionClosedRefresh = function( ){
        // FUNCTION: listSelectionClosedRefresh( void ) void
            
            // call callback
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
                'subject'           :   'vehicles',
                'what'              :   'selectData',
                'selection'         :   id,
                'lastUpdated'       :   self.openData['updated'] 
            };
            // done construct data object
             
            // make the ajax call
            mbAdminApp.server.read( data, self.getSelectDataCallback );
            
        // DONE FUNCTION: getSelectData( integer: id, function: callback ) void
        };
        self.getSelectDataCallback = function( result ){
        // FUNCTION: getSelectDataCallback( json: result ) void
            
            // check critical errors
            if( result['criticalError'] ){
                
                // show critical error
                mbAdminApp.showCriticalError( result['criticalError'] );
                
                // end busy
                mbAdminApp.endBusyProcess();
                
                // done
                return;
                
            }
            // done check critical errors

            // data changed / else
            if( !result['open']['upToDate'] ){
                
                // set vehicles rows
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
            // data changed / else
            
            // hide busy screen
            mbAdminApp.endBusyProcess();
            
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
                
                // se callback
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
    // DONE MODULE: selectModule( void ) void
    
})( mbAdminApp );
// done create module function
