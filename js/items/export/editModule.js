/* 
        @package        Pleisterman/MbAdmin
        function: 
                        contains the structure of the dataObject for export
                        it defines the display of the data
                        it handles getting, updating and inserting data
                        it sets default data before insert
                        it handles the data checks before updates and inserts
                        it handles the callback errors

        Last revision:  07-03-2025
*/

// create module function
( function( mbAdminApp ){

    // get name space
    let nameSpace = mbAdminApp.items.export;
    
    // MODULE: editModule( void ) named array  
    nameSpace.editModule = function( ) {
        // PRIVATE:
        
        // MEMBERS
        let self = this;                                        // object
        self.MODULE = 'ItemsExportEditModule';                  // string
        self.debugOn = false;                                   // boolean
        self.titles = {                                         // named array
            'update'                    :   'Export Data'       // string
        };                                                      // done named array
        self.editItems = [                                      // array
            {                                                   // named array
                'id'                    :   'id',               // string
                'type'                  :   'noDisplay'         // string
            },                                                  // done named array 
            {                                                   // named array 
                'id'                    :   'name',             // string
                'type'                  :   'noDisplay'         // string
            },                                                  // done named array 
            {                                                   // named array 
                'id'                        :   'fromDate',     // string
                'type'                      :   'date',         // string
                'displayOptions' : {                            // named array 
                    'label' : {                                 // named array 
                        'text'              :   'From date'     // string
                    },                                          // done named array 
                    'input' : {                                 // named array 
                        'width'             :   '7.0rem'        // css
                    }                                           // done named array 
                },                                              // done named array 
                'optional'                  :   false           // boolean
            },                                                  // done named array 
            {                                                   // named array 
                'id'                        :   'toDate',       // string
                'type'                      :   'date',         // string
                'displayOptions' : {                            // named array 
                    'label' : {                                 // named array 
                        'text'              :   'To date'       // string
                    },                                          // done named array 
                    'input' : {                                 // named array 
                        'width'             :   '7.0rem'        // css
                    }                                           // done named array 
                },                                              // done named array 
                'optional'                  :   false           // boolean
            },                                                  // done named array
            {                                                   // named array
                'id'                    :   'addHeaders',       // string
                'type'                  :   'checkbox',         // string
                'displayOptions' : {                            // named array
                    'label' : {                                 // named array
                        'text'          :   'Add headers'       // string
                    }                                           // done named array
                }                                               // done named array
            },                                                  // done named array
            {                                                   // named array
                'id'                    :   'addTotals',        // string
                'type'                  :   'checkbox',         // string
                'displayOptions' : {                            // named array
                    'label' : {                                 // named array
                        'text'          :   'Add totals'        // string
                    }                                           // done named array
                }                                               // done named array
            },                                                  // done named array
            {                                                   // named array
                'id'                    :   'delimiter',        // string
                'type'                  :   'list',             // string
                'displayOptions' : {                            // named array
                    'label' : {                                 // named array
                        'text'          :   'Delimiter'         // string
                    },                                          // done named array
                    'row' : {                                   // named array
                        'width'         :   '6rem'              // css
                    }                                           // done named array
                },                                              // done named array
                'rowOptions' : {                                // named array
                    'loadData'          :   false,              // boolean
                    'data' : [                                  // array
                        {                                       // named array
                            'id'        :   'comma',            // string
                            'title'     :   'Comma'             // string
                        },                                      // done named array
                        {                                       // named array
                            'id'        :   'space',            // string
                            'title'     :   'Space'             // string
                        },                                      // done named array
                        {                                       // named array
                            'id'        :   'semicolon',        // string
                            'title'     :   'Semicolon'         // string
                        }                                       // done named array
                    ]                                           // done named array
                }                                               // done named array
            },                                                  // done named array
            {                                                   // named array 
                'id'                    :   'type',             // string
                'type'                  :   'list',             // string
                'displayOptions' : {                            // named array
                    'label' : {                                 // named array
                        'text'          :   'Output'            // string
                    },                                          // done named array
                    'row' : {                                   // named array
                        'width'         :   '6rem'              // css
                    }                                           // done named array
                },                                              // done named array
                'rowOptions' : {                                // named array
                    'loadData'          :   false,              // boolean
                    'data' : [                                  // array
                        {                                       // named array
                            'id'        :   'csv',              // string
                            'title'     :   'Csv'               // string
                        },                                      // done named array
                        {                                       // named array
                            'id'        :   'html',             // string
                            'title'     :   'Html'              // string
                        },                                      // done named array
                        {                                       // named array
                            'id'        :   'excel',            // string
                            'title'     :   'Excel'             // string
                        }                                       // done named array
                    ]                                           // done named array
                }                                               // done named array
            }                                                   // done named array 
        ];                                                      // done array
        self.buttons = {                                        // named array
            'update' :  ['export']                              // array
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
            
            // FUNCTION: getTitle( string: mode, named array: row ) string
            getTitle : function( mode, row ){
                
                // return result
                return self.titles[ mode ] + ' ' + row['name'];
                
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
