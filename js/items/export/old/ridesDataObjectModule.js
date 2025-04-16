/*
        @package        Pleisterman/MbAdmin
  
        function:       controls export of tasks data 
  
        Last revision:  09-02-2025
 
*/


// create module function
( function( mbAdminApp ){

    // MODULE: ridesDataObjectModule( module: delimiterSelectModule, module: ridesTotalsSelectModule ) named array
    mbAdminApp.ridesDataObjectModule = function( delimiterSelectModule, ridesTotalsSelectModule ) {
        // PRIVATE:
        
        // MEMBERS
        let self = this;                                            // object
        self.MODULE = 'ContentItemsExportRidesDataObjectModule';    // string
        self.debugOn = false;                                       // boolean
        self.dataObject = [                                         // named array
            {                                                       // named array
                'id'                :   'from',                     // string
                'type'              :   'date',                     // string
                'displayOptions'    :   {                           // named array
                    'label'             :   {                       // named array
                        'text'          :   'From'                  // string
                    }                                               // done named array
                },                                                  // done named array
                'optional'          :   false,                      // boolean
                'value'             :   null                        // named array / null    
            },                                                      // done named array
            {                                                       // named array
                'id'                :   'till',                     // string
                'type'              :   'date',                     // string
                'displayOptions'    :   {                           // named array
                    'label'             :   {                       // named array
                        'text'          :   'Till'                  // string
                    }                                               // done named array
                },                                                  // done named array
                'optional'      :   false,                          // boolean
                'value'         :   null                            // named array / null    
            },                                                      // done named array
            {                                                       // named array
                'id'                :   'delimiter',                // string
                'type'              :   'select',                   // string
                'displayOptions'    :   {                           // named array
                    'label'             :   {                       // named array
                        'text'          :   'Delimiter'             // string
                    }                                               // done named array
                },                                                  // done named array
                'value'             :   'comma',                    // string
                'selectModule'      :   delimiterSelectModule,      // module
                'selectImageId'     :   'projects',                 // string
                'selectOption'      :   'delimiterLastSelection'    // string
            },                                                      // done named array
            {                                                       // named array
                'id'            :   'addHeaders',                   // string
                'type'          :   'checkbox',                     // string
                'displayOptions'    :   {                           // named array
                    'label'             :   {                       // named array
                        'text'          :   'Add Export Headers'    // string
                    }                                               // done named array
                },                                                  // done named array
                'value'             :   mbAdminApp.getUserOption( 'exportRidesAddHeaders' ) === 'true' ? true : false, // boolean
                'changeFunction'    :  null                         // function / null
            },                                                      // done named array
            {                                                       // named array
                'id'            :   'addTotals',                    // string
                'type'          :   'select',                       // string
                'displayOptions'    :   {                           // named array
                    'label'             :   {                       // named array
                        'text'          :   'Add Totals'            // string
                    }                                               // done named array
                },                                                  // done named array
                'value'         :   'comma',                        // string
                'selectModule'      :   ridesTotalsSelectModule,    // module
                'selectImageId'     :   'projects',                 // string
                'selectOption'      :   'exportRidesTotalsLastSelection' // string
            }                                                       // done named array
        ];                                                          // done named array
        self.callerOptions = {                                      // named array
            'callback'    :   null                                  // function / null
        };                                                          // done named array
        // DONE MEMBERS     

        // FUNCTIONS
        self.construct = function() {
        // FUNCTION: construct( void ) void
            
            // debug info
            self.debug( 'construct' );
            
            // get today date
            let date = mbAdminApp.getTodayDbDate( );
            
            // loop over data object
            Object.entries( self.dataObject ).forEach( ( [objectIndex, objectValue] ) => { 
                
                // id = from
                if( objectValue['id'] === 'from' ){
                    
                    // set from value 
                    objectValue['value'] = date;
                    
                }
                // done id = from

                // id = till
                if( objectValue['id'] === 'till' ){
                    
                    // set to value 
                    objectValue['value'] = date;
                    
                }
                // done id = till
                
                // id = addHeaders
                if( objectValue['id'] === 'addHeaders' ){
                    
                    // set from value 
                    objectValue['changeFunction'] = self.changeHeaderOption;
                    
                }
                // done id = addHeaders
                
            });
            // done loop over data object 
                        
        // DONE FUNCTION: construct( void ) void    
        };
        self.export = function( exportType, callback ) {
        // FUNCTION: export( string: exportType, function: callback ) void

            // debug info
            self.debug( 'rides export type: ' + exportType );
            
            // remember callback
            self.callerOptions['callback'] = callback;
            
            // show busy screen
            mbAdminApp.startBusyProces();

            // get data from display
            mbAdminApp.callEvent( 'displaySetData' );
            
            // create json: selection
            let selection = {
                'languageId'    : mbAdminApp.selectedLanguageId
            };
            // done create json: selection
            
            // loop over dataObject
            Object.entries( self.dataObject ).forEach( ( [index, value] ) => { 
                
                // id = delimiter / else
                if( value['id'] === 'delimiter' ){
                    
                    // get delimiter value
                    let delimiter = value['selectModule'].getValue( value['value'] );
                    
                    // set delimiter selection
                    selection[value['id']] = delimiter;
                    
                }
                else {
                    
                    // set selection
                    selection[value['id']] = value['value'];
                    
                }
                // done id = delimiter / else
                
            });
            // done loop over dataObject
            
            // construct jaon: data
            let data = { 
                'subject'           :   'rides',
                'what'              :   'exportPeriodList',
                'exportType'        :   exportType,
                'selection'         :   selection 
            };
            // done construct jaon: data
             
            // AJAX: /mbAdminApp/export
            mbAdminApp.read( 'export',data, self.exportCallback );
            
        // DONE FUNCTION: export( string: exportType, function: callback ) void
        };
        self.exportCallback = function( result ){
        // FUNCTION: exportCallback( json: result ) void
        
            // check for errors
            if( self.hasCallbackErrors( result ) ){
                
                // end busy
                mbAdminApp.endBusyProcess();
                
                // done with error
                return;
                
            }
            // done check for errors
        
            // hide busy screen
            mbAdminApp.endBusyProcess();
            
            // call callback
            self.callerOptions['callback']( result );
        
        // DONE FUNCTION: exportCallback( json: result ) void
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
          
                // show error
                mbAdminApp.callEvent( 'showExportMessage', result['error'] );
                
                // done with error
                return true;
                
            }
            // done check errors
          
            // done 
            return false;
            
        };
        self.changeHeaderOption = function( value ){
        // FUNCTION: changeHeaderOption( string: value ) void
            
            // set option
            mbAdminApp.setOption( 'exportRidesAddHeaders', value );
            
        // DONE FUNCTION: changeHeaderOption( string: value ) void
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
            
            // FUNCTION: getDataObject( void ) json: data object
            getDataObject : function(){
                
                return self.dataObject;
                
            },        
            // FUNCTION: export( string: exportType, function: callback ) void
            export : function( exportType, callback ){
                
                self.export( exportType, callback );
                
            }   
            
        };
        // DONE PUBLIC
        
    };
    // DONE MODULE: ridesDataObjectModule( module: delimiterSelectModule, module: ridesTotalsSelectModule ) named array
    
})( mbAdminApp );
// done create module function
