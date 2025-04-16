/* 
        @package        Pleisterman/MbAdmin
        function: 
                        contains the structure of the dataObject for rides
                        it defines the display of the data
                        it handles getting, updating and inserting data
                        it sets default data before insert
                        it handles the data checks before updates and inserts
                        it handles the callback errors

        Last revision:  01-04-2025
*/

// create module function
( function( mbAdminApp ){

    // get name space
    let nameSpace = mbAdminApp.items.rides;
    
    // MODULE: editModule( void ) named array
    nameSpace.editModule = function( ) {
        // PRIVATE:
        
        // MEMBERS
        let self = this;                                        // object
        self.MODULE = 'ItemsRidesEditModule';                   // string
        self.debugOn = false;                                   // boolean
        self.titles = {                                         // named array
            'update'                    :   'Edit Ride',        // string
            'insert'                    :   'Insert new Ride'   // string
        };                                                      // done named array
        self.editItems = [                                      // named array
            {                                                   // named array
                'id'                    :   'id',               // string
                'type'                  :   'noDisplay'         // string
            },                                                  // done named array
            {                                                   // named array
                'id'                    :   'description',      // string
                'type'                  :   'text',             // string
                'displayOptions' : {                            // named array
                    'firstLetterCapital':   true,               // boolean
                    'label' : {                                 // named array
                        'text'          :   'Description'       // string
                    },                                          // done named array
                    'validate' : {                              // named array
                        'notEmpty'      :   true                // boolean
                    }                                           // done named array        
                }                                               // done named array
            },                                                  // done named array
            {                                                   // named array 
                'id'                    :   'vehicleId',        // string
                'type'                  :   'select',           // string
                'displayOptions' : {                            // named array 
                    'label' : {                                 // named array 
                        'text'          :   'Vehicle'           // string
                    }                                           // done named array 
                },                                              // done named array 
                'displayValueId'        :   'vehicleName',      // string
                'listOptions' : {                               // named array
                    'subject'           :   'rideVehicle',      // string  
                    'title'             :   'Select Vehicle',   // string  
                    'listTypes' : [                             // array
                        'lastUsed',                             // string
                        'open'                                  // string
                    ],                                          // done array
                    'listType'          :   'lastUsed'          // string 
                }                                               // done named array
            },                                                  // done named array
            {                                                   // named array
                'id'                    :   'date',             // string
                'type'                  :   'date',             // string
                'displayOptions' : {                            // named array
                    'label' : {                                 // named array
                        'text'          :   'Date'              // string
                    }                                           // done named array
                },                                              // done named array
                'optional'              :   false,              // boolean: optional
            },                                                  // done named array
            {                                                   // named array
                'id'                :   'fromDescription',      // string
                'type'              :   'textarea',             // string
                'displayOptions' : {                            // named array
                    'label' : {                                 // named array
                        'text'          :   'From'              // string
                    },                                          // done named array
                    'validate' : {                              // named array
                        'notEmpty'      :   true                // boolean
                    }                                           // done named array        
                }                                               // done named array
            },                                                  // done named array
            {                                                   // named array
                'id'                    :   'toDescription',    // string
                'type'                  :   'textarea',         // string
                'displayOptions' : {                            // named array
                    'label' : {                                 // named array
                        'text'          :   'To'                // string
                    }                                           // done named array
                },                                              // done named array
                'validate' : {                                  // named array
                    'notEmpty'          :   true                // boolean
                }                                               // done named array        
            },                                                  // done json: longDescription
            {                                                   // named array 
                'id'                    :   'projectId',        // string
                'type'                  :   'select',           // string
                'displayOptions' : {                            // named array 
                    'label' : {                                 // named array 
                        'text'          :   'Project'           // string
                    }                                           // done named array 
                },                                              // done named array 
                'displayValueId'        :   'projectName',      // string
                'listOptions' : {                               // named array
                    'subject'           :   'rideProject',      // string  
                    'title'             :   'Select Project',   // string  
                    'listTypes' : [                             // array
                        'lastUsed',                             // string
                        'open'                                  // string
                    ],                                          // done array
                    'listType'          :   'lastUsed'          // string 
                }                                               // done named array
            },                                                  // done named array
            {                                                   // named array
                'id'                    :   'odometerStart',    // string
                'type'                  :   'text',             // string
                'displayOptions' : {                            // named array
                    'type'              :   'number',           // string
                    'label' : {                                 // named array
                        'text'          :   'Start'             // string
                    },                                          // done named array
                    'input' : {                                 // named array
                        'width'         :   '4.5em'             // css 
                    }                                           // done named array
                }                                               // done named array
            },                                                  // done named array
            {                                                   // named array
                'id'                    :   'odometerEnd',      // string
                'type'                  :   'text',             // string
                'displayOptions' : {                            // named array
                    'type'              :   'number',           // string
                    'label' : {                                 // named array
                        'text'          :   'End'               // string
                    },                                          // done named array
                    'input' : {                                 // named array
                        'width'         :   '4.5em'             // css
                    }                                           // done named array
                }                                               // done named array
            },                                                  // done named array
            {                                                   // named array
                'id'                    :   'used',             // string
                'type'                  :   'noDisplay'         // string
            },                                                  // done named array
            {                                                   // named array
                'id'                    :   'updated',          // string
                'type'                  :   'noDisplay'         // string
           }                                                    // done named array
        ];                                                      // done named array
        self.buttons = {                                        // named array
            'update' :  ['update','cancel'],                    // array
            'insert' :  ['insert','cancel']                     // array
        };                                                      // done named array
        // DONE MEMBERS
        
        // FUNCTIONS
        self.construct = function() {
        // FUNCTION: construct( void ) void
            
            // debug info
            self.debug( 'construct' );
            
        // DONE FUNCTION: construct( void ) void
        };
        self.destruct = function() {
        // FUNCTION: destruct( void ) void
            
            // debug info
            self.debug( 'destruct' );
            
        // DONE FUNCTION: destruct( void ) void
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
            
            // FUNCTION: getTitle( string: mode ) string
            getTitle : function( mode ){
                
                // return result
                return self.titles[ mode ];
                
            },
            // FUNCTION: getButtons( string: mode ) array
            getButtons : function( mode ){
                
                // return result
                return self.buttons[ mode ];
                
            },
            // FUNCTION: getEditItems( void ) named array
            getEditItems : function(){
                
                // return result
                return self.editItems;
                
            },
            // FUNCTION: destruct( void ) void    
            destruct : function( ){
                
                // call internal
                self.destruct( );
                
            }
            
        };
        // DONE PUBLIC
        
    };
    // DONE MODULE: editModule( void ) named array
    
})( mbAdminApp );
// done create module function
