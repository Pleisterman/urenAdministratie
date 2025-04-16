/* 
        @package        Pleisterman/MbAdmin
        function: 
                        contains the structure of the dataObject for projects
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
    let nameSpace = mbAdminApp.items.projects;
    
    // MODULE: editModule( void ) named array  
    nameSpace.editModule = function( ) {
        // PRIVATE:
        
        // MEMBERS
        let self = this;                                        // object
        self.MODULE = 'ItemsProjectsEditModule';                // string
        self.debugOn = false;                                   // boolean
        self.titles = {                                         // named array
            'update'                    :   'Edit Project',     // string
            'insert'                    :   'Insert new Project' // string
        };                                                      // done named array
        self.editItems = [                                      // named array
            {                                                   // named array
                'id'                    :   'id',               // string
                'type'                  :   'noDisplay'         // string
            },                                                  // done named array
            {                                                   // named array
                'id'                    :   'name',             // string
                'type'                  :   'text',             // string
                'displayOptions' : {                            // named array
                    'firstLetterCapital'  :   true,             // boolean
                    'label' : {                                 // named array
                        'text'          :   'Name'              // string
                    }                                           // done named array
                },                                              // done named array
                'validate' : {                                  // named array
                    'notEmpty'          :   true                // boolean
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
                'id'                    :   'projectContacts',  // string
                'type'                  :   'linkedList',       // string 
                'displayOptions' : {                            // named array
                    'label' : {                                 // named array
                        'text'          :   'Linked Contacts',  // string
                        'width'         :   '10.0rem'           // css
                    }                                           // done named array
                },                                              // done named array
                'column'                :   'contacts',         // string
                'listOptions' : {                               // named array
                    'subject'           :   'projectContacts',  // string  
                    'title'             :   'Select Contact',   // string  
                    'listTypes' : [                             // array
                        'lastUsed',                             // string
                        'open'                                  // string
                    ],                                          // done array
                    'errors' : {                                // named array
                        'noRowSelected' :   'Select a contact.' // string
                    },                                          // done array
                    'messages' : {                              // named array
                        'deleted'       :   'Contact removed.', // string
                        'inserted'      :   'Contact added.'    // string
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
                }                                               // done named array
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
                'id'                    : 'used',               // string
                'type'                  : 'noDisplay'           // string
            },                                                  // done named array
            {                                                   // named array
                'id'                    : 'updated',            // string
                'type'                  : 'noDisplay'           // string
            }                                                   // done named array
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
