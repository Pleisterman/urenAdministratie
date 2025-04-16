/* 
        @package        Pleisterman/MbAdmin
        function: 
                        contains the structure of the dataObject for contacts
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
    let nameSpace = mbAdminApp.items.contacts;
    
    // MODULE: editModule( void ) named array
    nameSpace.editModule = function( ) {
        // PRIVATE:
        
        // MEMBERS
        let self = this;                                        // object
        self.MODULE = 'ItemsContactsEditModule';                // string
        self.debugOn = false;                                   // boolean
        self.titles = {                                         // named array
            'update'                :   'Edit Contact',         // string
            'insert'                :   'Insert new Contact'    // string
        };                                                      // done named array
        self.editItems = [                                      // named array
            {                                                   // named array
                'id'                    :    'id',              // string
                'type'                  :    'noDisplay'        // string
            },                                                  // done named array
            {                                                   // named array
                'id'                    :   'name',             // string
                'type'                  :   'text',             // string
                'displayOptions' : {                            // named array
                    'firstLetterCapital':   true,               // boolean
                    'label' : {                                 // named array
                        'text'          :   'Name'              // string
                    },                                          // done named array
                    'input' : {                                 // named array
                        'width'         :   '32rem'             // css
                    }                                           // done named array
                },                                              // done named array
                'validate' : {                                  // named array
                    'notEmpty'          :   true                // boolean
                }                                               // done named array
            },                                                  // done named array
            {                                                   // named array
                'id'                    :   'companyName',      // string
                'type'                  :   'text',             // string
                'displayOptions' : {                            // named array
                    'firstLetterCapital':   true,               // boolean
                    'label' : {                                 // named array
                        'text'          :   'Company Name',     // string
                        'width'         :   '9.0rem'            // css
                    },                                          // done named array
                    'input' : {                                 // named array
                        'width'         :   '30rem'             // css
                    }                                           // done named array
                }                                               // done named array
            },                                                  // done named array
            {                                                   // named array
                'id'                    :   'description',      // string
                'type'                  :   'textarea',         // string
                'displayOptions' : {                            // named array
                    'label' : {                                 // named array
                        'text'          :   'Description'       // string
                    }                                           // done named array
                }                                               // done named array
            },                                                  // done named array
            {                                                   // named array
                'id'                    :   'contactProjects',  // string
                'type'                  :   'linkList',         // string
                'displayOptions' : {                            // named array
                    'label' : {                                 // named array
                        'text'          :   'Contact Projects'  // string
                    }                                           // done named array
                }                                               // done named array
            },                                                  // done named array
            {                                                   // named array
                'id'                    :   'email',            // string
                'type'                  :   'text',             // string
                'displayOptions' : {                            // named array
                    'type'              :   'email',            // string
                    'label' : {                                 // named array
                        'text'          :   'Email'             // string
                    },                                          // done named array
                    'input' : {                                 // named array
                        'width'         :   '32rem'             // css
                    }                                           // done named array
                }                                               // done named array
            },                                                  // done named array
            {                                                   // named array
                'id'                    :   'address',          // string
                'type'                  :   'text',             // string
                'displayOptions' : {                            // named array
                    'label' : {                                 // named array
                        'text'          :   'Address'           // string
                    }                                           // done named array
                }                                               // done named array
            },                                                  // done named array
            {                                                   // named array
                'id'                    :   'zipCode',          // string
                'type'                  :   'text',             // string
                'displayOptions' : {                            // named array
                    'label' : {                                 // named array
                        'text'          :   'Zip Code'          // string
                    }                                           // done named array
                }                                               // done named array
            },                                                  // done named array
            {                                                   // named array
                'id'                    :   'place',            // string
                'type'                  :   'text',             // string
                'displayOptions' : {                            // named array
                    'label' : {                                 // named array
                        'text'          :   'Place'             // string
                    }                                           // done named array
                }                                               // done named array
            },                                                  // done named array
            {                                                   // named array
                'id'                    :   'country',          // string
                'type'                  :   'text',             // string
                'displayOptions' : {                            // named array
                    'label' : {                                 // named array
                        'text'          :   'Country'           // string
                    }                                           // done named array
                }                                               // done named array
            },                                                  // done named array
            {                                                   // named array
                'id'                    :   'telephone1',       // string
                'type'                  :   'text',             // string
                'displayOptions' : {                            // named array
                    'label' : {                                 // named array
                        'text'          :   'Telephone'         // string
                    },                                          // done named array
                    'input' : {                                 // named array
                        'width'         :   '12.0em'            // css
                    }                                           // done named array
                }                                               // done named array
            },                                                  // done named array
            {                                                   // named array
                'id'                    :   'telephone2',       // string
                'type'                  :   'text',             // string
                'displayOptions' : {                            // named array
                    'label' : {                                 // named array
                        'text'          :   'Second Telephone', // string
                        'width'         :   '12.0rem'           // css
                    },                                          // done named array
                    'input' : {                                 // named array
                        'width'         :   '12.0em'            // css
                    }                                           // done named array
                }                                               // done named array
            },                                                  // done named array
            {                                                   // named array
                'id'                    :   'mobile',           // string
                'type'                  :   'text',             // string
                'displayOptions' : {                            // named array
                    'label'  : {                                // named array
                        'text'          :   'Mobile'            // string
                    },                                          // done named array
                    'input' : {                                 // named array
                        'width'         :   '12.0em'            // css
                    }                                           // done named array
                }                                               // done named array
            },                                                  // done named array
            {                                                   // named array
                'id'                    :   'isCustomer',       // string
                'type'                  :   'checkbox',         // string
                'displayOptions' : {                            // named array
                    'label' : {                                 // named array
                        'text'          :   'Is Customer'       // string
                    }                                           // done named array
                }                                               // done named array
            },                                                  // done named array
            {                                                   // named array
                'id'                    :   'opened',           // string
                'type'                  :   'date',             // string
                'displayOptions' : {                            // named array
                    'label' : {                                 // named array
                        'text'          :   'Opened'            // string
                    }                                           // done named array
                },                                              // done named array
                'optional'              :   false               // boolean
            },                                                  // done named array
            {                                                   // named array
                'id'                    :   'closed',           // string
                'type'                  :   'date',             // string
                'displayOptions' : {                            // named array
                    'label' : {                                 // named array
                        'text'          :   'Closed'            // string
                    },                                          // done named array
                    'optional'          :   true                // boolean
                }                                               // done named array
            },                                                  // done named array
            {                                                   // named array
                'id'                : 'used',                   // string
                'type'              : 'noDisplay'               // string
            },                                                  // done named array
            {                                                   // named array
                'id'                : 'updated',                // string
                'type'              : 'noDisplay'               // string
           }                                                    // done named array
        ];                                                      // done named array
        self.buttons = {                                        // named array
            'update' :  ['update','cancel'],                    // arrray
            'insert' :  ['insert','cancel']                     // arrray
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
