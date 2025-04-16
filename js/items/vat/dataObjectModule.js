/* 
        @package        Pleisterman/MbAdmin
        function: 
                        contains the structure of the dataObject for vat
                        it defines the display of the data
                        it handles getting, updating and inserting data
                        it sets default data before insert
                        it handles the data checks before updates and inserts
                        it handles the callback errors

        Last revision:  10-02-2025
*/

// create module function
( function( mbAdminApp ){

    // get name space
    let nameSpace = mbAdminApp.items;
    
    // MODULE: dataObjectModule( void ) named array    
    nameSpace.dataObjectModule = function( ) {
        // PRIVATE:
        
        // MEMBERS
        let self = this;                                    // object
        self.MODULE = 'vatDataObjectModule';                // string
        self.debugOn = false;                               // boolean
        self.dataObject = [                                 // named array
            {                                               // named array  
                'id'                :    'id',              // string
                'type'              :    'noDisplay'        // string
            },                                              // done named array
            {                                               // named array
                'id'                :   'description',      // string
                'type'              :   'text',             // string
                'displayOptions'    :   {                   // named array
                    'firstLetterCapital'  :   true,         // boolean
                    'label'         :   {                   // named array
                        'text'          :   'Name'          // string
                    },                                      // done named array
                    'emptyError'    :   true                // boolean
                },                                          // done named array
                'value'             :   '',                 // string
                'defaultValue'      :   '',                 // string
                'errorFunction'     :   null,               // function / null
                'defaultFocus'      :   true,               // boolean
                'isDataHeaderText'  :   true                // boolean
            },                                              // done named array
            {                                               // named array
                'id'                :   'longDescription',  // string
                'type'              :   'textarea',         // string
                'displayOptions'    :   {                   // named array
                    'label'         :   {                   // named array
                        'text'          :   'Description'   // string
                    }                                       // done named array
                },                                          // done named array
                'value'             :   '',                 // string
                'defaultValue'      :   ''                  // string
            },                                              // done named array
            {                                               // named array
                'id'                :   'identification',   // string
                'type'              :   'text',             // string
                'displayOptions' : {                         // named array
                    'label' : {                             // named array
                        'text'      :   mbAdminApp.translations['identification'] // string
                    },                                      // done named array
                    'emptyError'    :   true,               // boolean
                    'input' : {                             // named array
                        'width'     :   '12.0em'            // css
                    }                                       // done named array
                },                                          // done named array
                'value'             :   '',                 // string
                'defaultValue'      :   ''                  // string
            },                                              // done named array
            {                                               // named array
                'id'                :   'percentage',       // string
                'type'              :   'text',             // string
                'displayOptions' : {                        // named array
                    'type'          :   'percentage',       // string
                    'label' : {                             // named array
                        'text'      :   'Odometer Start'    // string
                    },                                      // done named array
                    'emptyError'    :   true,               // boolean
                    'input' : {                             // named array
                        'width'     :   '4.5em'             // css
                    }                                       // done named array
                },                                          // done named array
                'value'         :   '',                     // string
                'defaultValue'  :    '0',                   // string
                'errorFunction' :   null                    // function / null
            },                                              // done named array
            {                                               // named array
                'id'                :   'opened',           // string
                'type'              :   'date',             // string
                'displayOptions'    :   {                   // named array
                    'label'         :   {                   // named array
                        'text'          :   'Opened'        // string
                    }                                       // done named array
                },                                          // done named array
                'optional'          :   false,              // boolean
                'value'             :   ''                  // string
            },                                              // done named array
            {                                               // named array
                'id'                :   'closed',           // string
                'type'              :   'date',             // string
                'displayOptions'    :   {                   // named array
                    'label'         :   {                   // named array
                        'text'          :   'Closed'        // string
                    },                                      // done named array
                    'optional'          :   true            // boolean
                },                                          // done named array
                'errorFunction'     :   null,               // function / null
                'value'             :   '',                 // string
                'defaultValue'      :   'false'             // string
            },                                              // done named array
            {                                               // named array
                'id'              : 'used',                 // string
                'type'            : 'noDisplay',            // string
                'value'           : '',                     // dateTime
                'defaultValue'    : false                   // string
            },                                              // done named array
            {                                               // named array
                'id'              : 'updated',              // string
                'type'            : 'noDisplay',            // string
                'value'           : '',                     // dateTime
                'defaultValue'    : false                   // string
            }                                               // done named array
        ];                                                  // done named array
        self.callerOptions = {                              // named array
            'callback'          :   null,                   // function / null
            'updateCallback'    :   null,                   // function / null
            'reloadCallback'    :   null                    // function / null
        };                                                  // done named array
        // DONE MEMBERS
        
        // FUNCTIONS
        self.construct = function() {
        // FUNCTION: construct( void ) void
        
            // debug info
            self.debug( 'construct' );
            
        // DONE FUNCTION: construct( void ) void
        };
        self.setDefaultData = function(){
        // FUNCTION setDefaultData( void ) void
        
            // counter
            let i = 0;
            
            // set dataObject default data
            Object.entries( self.dataObject ).forEach( ( [index, value] ) => {
                
                // which id
                switch( value['id'] ){
                    
                    // cases
                    case 'id' : {
                            
                        // unset id    
                        self.dataObject[i]['value'] = null;    
                        
                        // done     
                        break;        
                        
                    }
                    case 'opened' : {
                            
                        // set value = today    
                        self.dataObject[i]['value'] = mbAdminApp.getTodayDbDate();    
                        
                        // done
                        break;        
                        
                    }
                    default : {
                            
                        // set default value    
                        value['value'] = value['defaultValue'];
                        
                    }
                    // done cases
                    
                }
                // done which id
                
                // next counter
                i++;
                
            });
            // done set dataObject default data
            
        // DONE FUNCTION: setDefaultData( void ) void
        };
        self.getData = function( callback, id ){
        // FUNCTION: getData( callback, string: id ) void
        
            // debug info
            self.debug( 'getData id: ' + id );
            
            // remember callback
            self.callerOptions['callback'] = callback;
            
            // show busy screen
            mbAdminApp.startBusyProces();

            // construct data object
            let data = { 
                'subject'           :   'vat',
                'what'              :   'rowById',
                'selection'         :   id 
            };
            // done construct data object
             
            // AJAX: /mbAdminApp/read
            mbAdminApp.server.read( data, self.getDataCallback );

        // DONE FUNCTION: getData( callback, string: id ) void
        };
        self.getDataCallback = function( result ){
        // FUNCTION: getDataCallback( json: result ) AJAX CALLBACK
            
            // check result
            if( self.hasCallbackErrors( result ) ){
                // hide busy screen
                mbAdminApp.endBusyProcess();
                // done with error
                return;
            }
            // done check result

            // loop through result    
            Object.entries( result['data'] ).forEach( ( [dataIndex, dataValue] ) => {
                
                // loop through data object
                Object.entries( self.dataObject ).forEach( ( [objectIndex, objectValue] ) => {
                    
                    // result id = data object id
                    if( dataIndex === objectValue['id'] ){
                        
                        // set data object value 
                        objectValue['value'] = dataValue;
                        
                    }
                    // result id = data object id
                    
                });
                // done loop through data object
                
            });
            // done loop through result    

            // hide busy screen
            mbAdminApp.endBusyProcess();
            
            // call the callback
            self.callerOptions['callback']();
            
        // DONE FUNCTION: getDataCallback( json: result ) AJAX CALLBACK
        };
        self.update = function( updateCallback, reloadCallback ){
        // FUNCTION: update( function: updateCallback, function: reloadCallback ) void
        
            // debug info
            self.debug( 'update' );
            
            // remember update callback
            self.callerOptions['updateCallback'] = updateCallback;
            
            // remember reload callback
            self.callerOptions['reloadCallback'] = reloadCallback;
            
            // show busy screen
            mbAdminApp.startBusyProces();
            
            // reset data error
            mbAdminApp.setValue( 'hasError', 'data', false );

            // set data from dataEdit controls to data object 
            mbAdminApp.callEvent( 'editSetData' );

            // check data
            if( self.hasDataErrors() ){
                
                // hide busy screen
                mbAdminApp.endBusyProcess();
                
                // done with error
                return;
                
            }
            // done check data
            
            // create values object
            let values = {};
            
            // create id 
            let id = 0;
            
            // set values from dataObject
            Object.entries( self.dataObject ).forEach( ( [index, value] ) => {
                
                // not id and not projectContacts
                if( value['id'] !== 'id' && value['id'] !== 'vatProjects' ){
                    
                    // set value
                    values[value['id']] = value['value'];
                    
                }
                // done not id and not contactProjects
                
                // id
                if( value['id'] === 'id' ){
                    
                    // remember id
                    id = value['value'];
                    
                }
                // done id
                
            });
            // done set values from dataObject

            // construct data object
            let data = { 
                'subject'           :   'vat',
                'what'              :   'rowById',
                'id'                :   id,
                'values'            :   values 
            };
            // done construct data object
             
            // AJAX: /mbAdminApp/update
            mbAdminApp.server.update( data, self.updateCallback );

        // DONE FUNCTION: update( function: updateCallback, function: reloadCallback ) void
        };
        self.updateCallback = function( result ){
        // FUNCTION: updateCallback( json: result ) AJAX CALLBACK
        
            // check for errors
            if( self.hasCallbackErrors( result ) ){
                
                // end busy
                mbAdminApp.endBusyProcess();
                
                // done with error
                return;
                
            }
            // done check for errors

            // show data updated message
            mbAdminApp.callEvent( 'showEditMessage', 'dataUpdated' );

            // result has updated value
            if( result['updated'] ){
                
                // get updated object from dataObject
                let updatedObject = mbAdminApp.getJsonValue( self.dataObject, ['id=updated'] );            
                
                // set updated
                updatedObject['value'] = result['updated'];
                
            }
            // done result has updated value

            // result has used value
            if( result['used'] ){
                
                // get used object from dataObject
                let usedObject = mbAdminApp.getJsonValue( self.dataObject, ['id=used'] );            
                
                // set used
                usedObject['value'] = result['used'];
                
            }
            // done result has used value

            // call update callback
            self.callerOptions['updateCallback']();
            
            // end busy
            mbAdminApp.endBusyProcess();

        // DONE FUNCTION: updateCallback( json: result ) AJAX CALLBACK
        };
        self.insert = function( callback ){
        // FUNCTION: insert( function: callback ) void

            // debug info
            self.debug( 'insert' );
            
            // remember callback
            self.callerOptions['callback'] = callback;
            
            // show busy screen
            mbAdminApp.startBusyProces();
            
            // unset data error
            mbAdminApp.setValue( 'hasError', 'data', false );

            // set data from dataEdit controls to data object 
            mbAdminApp.callEvent( 'editSetData' );

            // check data
            if( self.hasDataErrors() ){
                
                // hide busy screen
                mbAdminApp.endBusyProcess();
                
                // done with error
                return;
                
            }
            // done check data

            // create values object
            let values = {};
            
            // set values from dataObject
            Object.entries( self.dataObject ).forEach( ( [index, value] ) => {
                
                // not id and not project contacts
                if( value['id'] !== 'id' && value['id'] !== 'vatProjects' ){
                    
                    // set value
                    values[value['id']] = value['value'];
                    
                }
                // done not id and not project contacts
                
            });
            // done set values from dataObject

            // construct data object
            let data = { 
                'workDirectory'     :   mbAdminApp.workDirectory,
                'subject'           :   'vat',
                'what'              :   'row',
                'values'            :   values 
            };
            // done construct data object
             
            // AJAX: /mbAdminApp/insert
            mbAdminApp.securePost( '/' + mbAdminApp.baseDirectory + '/insert', mbAdminApp.token, data, self.insertCallback );
            
        // DONE FUNCTION: insert( function: callback ) void
        };
        self.insertCallback = function( result ){
        // FUNCTION: insertCallback( json: result ) AJAX CALLBACK
            
            // check for errors
            if( self.hasCallbackErrors( result ) ){
                
                // end busy
                mbAdminApp.endBusyProcess();
                
                // done with error
                return;
                
            }
            // done check for errors

            // show data updated message
            mbAdminApp.callEvent( 'showEditMessage', 'dataUpdated' );

            // loop over dataObject
            Object.entries( self.dataObject ).forEach( ( [index, value] ) => {
                
                // found id 
                if( value['id'] === 'id' ){
                    
                    // set id value
                    value['value'] = result['id'];
                    
                }
                // done found id
                
                // found updated
                if( value['id'] === 'updated' && result['updated'] ){
                    
                    // set updated value
                    value['value'] = result['updated'];
                    
                }
                // done found updated
                
                // found used 
                if( value['id'] === 'used' && result['used'] ){
                    
                    // set used value
                    value['value'] = result['used'];
                    
                }
                // done found used 
                
            });
            // done loop over dataObject

            // end busy
            mbAdminApp.endBusyProcess();

            // call update callback
            self.callerOptions['callback']( result['id'] );
            
        // DONE FUNCTION: insertCallback( json: result ) AJAX CALLBACK
        };
        self.hasDataErrors = function( ){
        // FUNCTION: hasDataErrors( void ) boolean
        
            // check data error
            if( mbAdminApp.getValue( 'hasError', 'data' )  ){
                
                // done with error 
                return true;
                
            }
            // done check data error
             
            // done 
            return false;

        // DONE FUNCTION: hasDataErrors( void ) boolean
        };
        self.hasCallbackErrors = function( result ){
        // FUNCTION: hasCallbackErrors( json: result ) boolean
        
            // global check result
            if( mbAdminApp.hasAjaxResultErrors( result ) ){
                
                // done with error
                return;
                
            }
            // done global check result

            // check errors
            if( result['error'] ){
                
                // debug info
                self.debug( result['error'] );
                
                // dataOutOfDate
                if( result['error'] === 'dataOutOfDate' ){
                    
                    // show out of date dialog
                    mbAdminApp.showOutOfDateDialog( self.callerOptions['reloadCallback'] );
                    
                    // done with out of date
                    return true;
                    
                }
                // done dataOutOfDate

                // vat name empty
                if( result['error'] === 'nameEmpty' ){
                    
                    // get name object from data object
                    let nameObject = mbAdminApp.getJsonValue( self.dataObject, ['id=name'] );  
                    
                    // get error with name object errorfunction
                    mbAdminApp.getError( 'nameEmpty', nameObject['errorFunction'] );
                    
                    // done with error
                    return true;
                    
                }
                // done vat name empty

                // closed before opened
                if( result['error'] === 'ClosedBeforeOpened' ){
                    
                    // get closed object from data object
                    let closedObject = mbAdminApp.getJsonValue( self.dataObject, ['id=closed'] );  
                    
                    // get error with closed object errorfunction
                    mbAdminApp.getError( 'ClosedBeforeOpened', closedObject['errorFunction'] );                                   
                    
                }
                // done closed before opened
                 
                // show data updated message
                mbAdminApp.callEvent( 'showEditError', result['error'] );
                 
                // done with error
                return true;
            }
            // done check errors
          
            // done 
            return false;
            
        // DONE FUNCTION: hasCallbackErrors( json: result ) boolean
        };
        self.debug = function( message ) {
        // FUNCTION: debug( string: message ) void
            
            // debug on
            if( self.debugOn ) {
                
                // call global debug
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
            
            // FUNCTION: getDataObject( void ) json 
            getDataObject : function(){
                
                // return internal call
                return self.dataObject;
                
            },
            // FUNCTION: setDefaultData( void ) void 
            setDefaultData : function(){
                
                // call internal
                self.setDefaultData( );
                
            },
            // FUNCTION: getData( function: callback, string: id ) void 
            getData : function( callback, id ){
                
                // call internal
                self.getData( callback, id );
                
            },
            // FUNCTION: update( function: updateCallback, function: reloadCallback ) void 
            update : function( updateCallback, reloadCallback ){
                
                // call internal
                self.update( updateCallback, reloadCallback );
                
                
            },
            // FUNCTION: insert( function: callback ) return void 
            insert : function( callback ){
                
                // call internal
                self.insert( callback );
                
            }
            
        };
        // DONE PUBLIC
        
    };
    // DONE MODULE: dataObjectModule( void ) named array 
    
})( mbAdminApp );
// done create module function
