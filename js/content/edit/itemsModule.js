/*
        @package        Pleisterman/MbAdmin
  
        function:       displays the edit items
  
        Last revision   12-03-2025
 
*/

// create module function
( function( mbAdminApp ){

    // get name space
    let nameSpace = mbAdminApp.content.edit;
    
    // MODULE: itemsModule( module: editModule, 
    //                      named array / null: row ) named array
    nameSpace.itemsModule = function( editModule, row ) {
        // PRIVATE:
  
        // MEMBERS:
        let self = this;                                        // object
        self.MODULE = 'ContentEditItemsModule';                 // string
        self.debugOn = false;                                   // boolean
        self.editModule = editModule;                           // module
        self.row = row;                                         // named array / null
        self.mode = self.row ? 'update' : 'insert';             // string
        self.containerOptions = {                               // named array 
            'id'                    :   mbAdminApp.getUiId( self.MODULE + 'Container' ), // string 
            'element'               :   'div',                  // html element type 
            'top'                   :   0,                      // css
            'left'                  :   0,                      // css
            'height'                :   '100%',                 // css
            'width'                 :   '100%',                 // css
            'backgroundColor'       :   'transparent',          // css 
        };                                                      // done named array 
        self.titleOptions = {                                   // named array 
            'id'                    :   mbAdminApp.getUiId( self.MODULE + 'Title' ), // string 
            'element'               :   'div',                  // html element type 
            'position'              :   'relative',             // css
            'fontSize'              :   '1.4rem',               // css
            'fontweight'            :   'bold',                 // css
            'paddingTop'            :   '1.2rem',               // css
            'paddingBottom'         :   '1.2rem',               // css
            'paddingLeft'           :   '1.2rem',               // css
            'backgroundColor'       :   'transparent',          // css 
            'color'                 :   mbAdminApp.getColor( 'darkest' ).color // css 
        };                                                      // done named array 
        self.contentOptions = {                                 // named array 
            'id'                    :   mbAdminApp.getUiId( self.MODULE + 'Content' ), // string 
            'element'               :   'div',                  // html element type 
            'position'              :   'relative',             // css
            'backgroundColor'       :   'transparent',          // css 
            'width'                 :   '100%',                 // css
            'overflowX'             :   'hidden',               // css
            'overflowY'             :   'auto'                  // css
        };                                                      // done named array 
        self.messageTexts = {                                   // named array
            'updateSucces'          :   'Data Updated',         // string
            'insertSucces'          :   'Data Added'            // string
        };                                                      // done named array
        self.errorTexts = {                                     // named array
            'nothingChanged'        :   'Nothing Changed',      // string
            'nameExists'            :   'This name already exists', // string
            'closedBeforeOpened'    :   'Closed before opened', // string
            'identificationExists'  :   'This identification already exists', // string
            'odometerStartBeforeFirstRide'  :   'Odometer start is bigger then first ride', // string
            'startTimeAfterEndTime' :   'Start time after end time', // string
            'periodNotFree'         :   'This time period is in use', // string
            'startfterEnd'          :   'Start after end',      // string
            'odometerStartBeforeVehicleOdometer' :   'Odometer start before vehicle odometer start', // string
            'IntervalNotFree'       :   'Odometer interval not free',  // string
            'IntervalNotInOrder'    :   'Odometer interval not in order', // string
        };                                                      // done named array
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
            
        // DONE FUNCTION: construct( void ) void
        };
        self.addHtml = function() {
        // FUNCTION: addHtml( void ) void
            
            // debug info
            self.debug( 'addHtml' );

            // get content id
            let contentId = mbAdminApp.getLayoutId( 'content' );

            // add container to content
            mbAdminApp.appendContainer( contentId, self.containerOptions );

            // add title
            self.addTitle();
            
            // add content to container 
            mbAdminApp.appendContainer( self.containerOptions['id'], self.contentOptions );
                        
        // DONE FUNCTION: addHtml( void ) void
        };
        self.removeHtml = function() {
        // FUNCTION: removeHtml( void ) void
            
            // remove content
            mbAdminApp.getElementById( self.contentOptions['id'] ).remove();
            
            // remove title
            mbAdminApp.getElementById( self.titleOptions['id'] ).remove();
            
            // remove container
            mbAdminApp.getElementById( self.containerOptions['id'] ).remove();
            
        // DONE FUNCTION: removeHtml( void ) void
        };
        self.addTitle = function() {
        // FUNCTION: addTitle( void ) void
            
            // get title
            let title = self.editModule.getTitle( self.mode, self.row );
            
            // set title
            self.titleOptions['text'] = title;
            
            // add title to container 
            mbAdminApp.appendContainer( self.containerOptions['id'], self.titleOptions );
                        
        // DONE FUNCTION: addTitle( void ) void
        };
        self.createModules = function() {
        // FUNCTION: createModules( void ) void

            // get edit items
            let editItems = self.editModule.getEditItems();
            
            // loop over edit items
            Object.entries( editItems ).forEach( ( [index, editItem] ) => {
            
                // create item
                self.createItem( editItem );
            
            });
            // done loop over modules

        // DONE FUNCTION: createModules( void ) void
        };
        self.removeModules = function() {
        // FUNCTION: removeEditItems( void ) void

            // loop over modules
            Object.entries( self.modules ).forEach( ( [index, module] ) => {
            
                // destroy module
                module.destruct();
            
            });
            // done loop over modules
            
            // reset modules
            self.modules = {};
            
        // DONE FUNCTION: removeModules( void ) void
        };
        self.createItem = function( editItem ) {
        // FUNCTION: createItem( named array: editItem ) void

            // switch type
            switch( editItem['type'] ){
                
                // cases
                case 'noDisplay' : {
                            
                    // done 
                    break;

                }
                case 'text' : {
                          
                    // create text item
                    self.createTextItem( editItem );
                            
                    // done 
                    break;

                }
                case 'textarea' : {
                          
                    // create textarea item
                    self.createTextAreaItem( editItem );
                            
                    // done 
                    break;

                }
                case 'checkbox' : {
                          
                    // create checkbox item
                    self.createCheckboxItem( editItem );
                            
                    // done 
                    break;

                }
                case 'date' : {
                          
                    // create date item
                    self.createDateItem( editItem );
                            
                    // done 
                    break;

                }
                case 'list' : {
                          
                    // create list item
                    self.createListItem( editItem );
                            
                    // done 
                    break;

                }
                case 'select' : {
                          
                    // create select item
                    self.createSelectItem( editItem );
                            
                    // done 
                    break;

                }
                case 'linkedList' : {
                          
                    // create select item
                    self.createLinkedListItem( editItem );
                            
                    // done 
                    break;

                }
                default : {

                    // debug info   
                    self.debug( 'error edit items unknown type' + editItem['type'] );


                }
                // done cases
                
            }
            // done switch type

        // DONE FUNCTION: createItem( named array: editItem ) void
        };
        self.createTextItem = function( editItem ) {
        // FUNCTION: createTextItem( named array: options ) void

            // copy options
            let item = mbAdminApp.extend( {}, editItem );
            
            // set id
            item['id'] = editItem['id'];

            // set value
            item['value'] = self.getItemValue( editItem );
            
            // get text module
            let textModule = mbAdminApp.content.templates.edit.textModule;

            // create module
            self.modules['item-' + editItem['id']] = new textModule( self.contentOptions['id'],
                                                                     item );
            // create module

        // DONE FUNCTION: createTextItem( named array: editItem ) void
        };
        self.createTextAreaItem = function( editItem ) {
        // FUNCTION: createTextAreaItem( named array: options ) void

            // copy options
            let item = mbAdminApp.extend( {}, editItem );
            
            // set id
            item['id'] = editItem['id'];

            // set value
            item['value'] = self.getItemValue( editItem );
            
            // get textarea module
            let textAreaModule = mbAdminApp.content.templates.edit.textAreaModule;

            // create module
            self.modules['item-' + editItem['id']] = new textAreaModule( self.contentOptions['id'],
                                                                         item );
            // create module

        // DONE FUNCTION: createTextAreaItem( named array: editItem ) void
        };
        self.createDateItem = function( editItem ) {
        // FUNCTION: createDateItem( named array: options ) void

            // copy options
            let item = mbAdminApp.extend( {}, editItem );
            
            // set id
            item['id'] = editItem['id'];

            // set value
            item['value'] = self.getItemValue( editItem );
            
            // get date module
            let dateModule = mbAdminApp.content.templates.edit.dateModule;

            // create module
            self.modules['item-' + editItem['id']] = new dateModule( self.contentOptions['id'],
                                                                     item );
            // create module

        // DONE FUNCTION: createDateItem( named array: editItem ) void
        };
        self.createListItem = function( editItem ) {
        // FUNCTION: createListItem( named array: options ) void

            // copy options
            let item = mbAdminApp.extend( {}, editItem );
            
            // set id
            item['id'] = editItem['id'];

            // set value
            item['value'] = self.getItemValue( editItem );
            
            // get list module
            let listModule = mbAdminApp.content.templates.edit.listModule;

            // create module
            self.modules['item-' + editItem['id']] = new listModule( self.contentOptions['id'],
                                                                     item );
            // create module

        // DONE FUNCTION: createListItem( named array: editItem ) void
        };
        self.createCheckboxItem = function( editItem ) {
        // FUNCTION: createCheckboxItem( named array: options ) void

            // copy options
            let item = mbAdminApp.extend( {}, editItem );
            
            // set id
            item['id'] = editItem['id'];

            // set value
            item['value'] = self.getItemValue( editItem );
            
            // get checkbox module
            let checkboxModule = mbAdminApp.content.templates.edit.checkboxModule;

            // create module
            self.modules['item-' + editItem['id']] = new checkboxModule( self.contentOptions['id'],
                                                                         item );
            // create module

        // DONE FUNCTION: createCheckboxItem( named array: editItem ) void
        };
        self.createSelectItem = function( editItem ) {
        // FUNCTION: createSelectItem( named array: options ) void

            // copy options
            let item = mbAdminApp.extend( {}, editItem );
            
            // set id
            item['id'] = editItem['id'];

            // set value
            item['value'] = self.getItemValue( editItem );
            
            // set display value
            item['displayValue'] = self.getSelectItemDisplayValue( editItem );
            
            // get checkbox module
            let checkboxModule = mbAdminApp.content.templates.edit.select.selectModule;

            // create module
            self.modules['item-' + editItem['id']] = new checkboxModule( self.contentOptions['id'],
                                                                         item );
            // create module

        // DONE FUNCTION: createSelectItem( named array: editItem ) void
        };
        self.createLinkedListItem = function( editItem ) {
        // FUNCTION: createLinkedListItem( named array: options ) void

            // no row
            if( !self.row ){
                
                // no action
                return;
                
            }
            // no row

            // copy options
            let item = mbAdminApp.extend( {}, editItem );
            
            // set id
            item['id'] = editItem['id'];
            
            // set selected id
            item['selectedId'] = self.row['id'];
            
            // add rows
            item['rows'] = self.row[editItem['column']];
            
            // get linked list module
            let linkedListModule = mbAdminApp.content.templates.edit.select.linkedList.linkedListModule;

            // create module
            self.modules['item-' + editItem['id']] = new linkedListModule( self.contentOptions['id'],
                                                                           item );
            // create module

        // DONE FUNCTION: createLinkedListItem( named array: editItem ) void
        };
        self.getItemValue = function( editItem ) {
        // FUNCTION: getItemValue( named array: options ) void

            // row ! exists
            if( !self.row ){
                
                // is date
                if( editItem['type'] === 'date' ){
                
                    // is optional
                    if( editItem['displayOptions'] &&
                        editItem['displayOptions']['optional'] ){

                        // return null
                        return null;
                        
                    }
                    // is optional
                
                    // return date
                    return mbAdminApp.getDatabaseDate();
                    
                }
                // is date
                
                // return default value
                return editItem['defaultValue'] ? editItem['defaultValue'] : '';
                
            }
            // row ! exists

            // return row value
            return self.row[editItem['id']];

        // DONE FUNCTION: getItemValue( named array: options ) void
        };
        self.getSelectItemDisplayValue = function( editItem ) {
        // FUNCTION: getSelectItemDisplayValue( named array: options ) void

            // row ! exists
            if( !self.row ){
                
                // return default value
                return editItem['defaultDisplayValue'] ? editItem['defaultDisplayValue'] : '';
                
            }
            // row ! exists

            // return row value
            return self.row[editItem['displayValueId']];

        // DONE FUNCTION: getSelectItemDisplayValue( named array: options ) void
        };
        self.layoutChange = function() {
        // FUNCTION: layoutChange( void ) void
            
            // get container layout
            let containerLayout = mbAdminApp.getElementById( self.containerOptions['id'] ).getBoundingClientRect();
            
            // get title layout
            let titleLayout = mbAdminApp.getElementById( self.titleOptions['id'] ).getBoundingClientRect();
                        
            // calculate height
            let height = containerLayout.height - titleLayout.height;
            
            // set content height
            mbAdminApp.setStyle( self.contentOptions['id'], 'height', height + 'px' );
                        
        // DONE FUNCTION: layoutChange( void ) void
        };
        self.changed = function() {
        // FUNCTION: changed( void ) boolean

            // create changed
            let changed = false;
            
            // loop over modules
            Object.entries( self.modules ).forEach( ( [index, module] ) => {
            
                // item changed
                if( module.changed( ) ){
                    
                    // set changed
                    changed = true;
                    
                }
                // item changed
            
            });
            // done loop over modules
            
            // return result
            return changed;
            
        // DONE FUNCTION: changed( void ) boolean
        };
        self.cancelEdit = function() {
        // FUNCTION: cancelEdit( void ) void
            
            // loop over modules
            Object.entries( self.modules ).forEach( ( [index, module] ) => {
            
                // call module
                module.resetValue( );
            
            });
            // done loop over modules
            
        // DONE FUNCTION: cancelEdit( void ) void
        };
        self.validate = function() {
        // FUNCTION: validate( void ) boolean

            // create valid
            let valid = true;
            
            // loop over modules
            Object.entries( self.modules ).forEach( ( [index, module] ) => {
            
                // valid
                if( valid ){
                    
                    // call module
                    valid = module.validate( );
                    
                }
                // done valid
            
            });
            // done loop over modules
            
            // return result
            return valid;
            
        // DONE FUNCTION: validate( void ) void
        };
        self.showMessage = function( options ) {
        // FUNCTION: showMessage( named array: options ) void

            // get message text
            options['text'] = self.messageTexts[options['messageId']];
            
            // set element id
            options['elementId'] = self.titleOptions['id'];
            
            // show message
            mbAdminApp.showHoverText( options );            
            
        // DONE FUNCTION: showMessage( named array: options ) void
        };
        self.showError = function( options ) {
        // FUNCTION: showError( named array: options ) void

            // get error text
            options['text'] = self.errorTexts[options['errorId']];
            
            // element ! exists
            if( !options['element'] ){

                // set element id
                options['elementId'] = self.titleOptions['id'];

            }
            // element ! exists
            
            // has element
            if( options['element'] ){
                
                // get element id
                options['elementId'] = self.modules['item-' + options['element']].getElementId();
                
            }
            // has element
            
            // show error
            mbAdminApp.showErrorText( options );            
            
        // DONE FUNCTION: showError( named array: options ) void
        };
        self.getData = function() {
        // FUNCTION: getData( void ) named array

            // get edit items
            let editItems = self.editModule.getEditItems();
            
            // create data
            let data = {};

            // loop over modules
            Object.entries( editItems ).forEach( ( [index, editItem] ) => {
                
                // module exists / else
                if( self.modules['item-' + editItem['id']] ){

                    // get module
                    let module = self.modules['item-' + editItem['id']];
                    
                    // create column
                    data[module.getId()] = module.getValue();
                
                }
                else {
                    
                    // create column
                    data[editItem['id']] = self.row ? self.row[editItem['id']] : null;
                    
                }
                
            });
            // done loop over modules
            
            // return result
            return data;

        // DONE FUNCTION: getData( void ) named array
        };
        self.destruct = function() {
        // FUNCTION: destruct( void ) void
            
            // debug info
            self.debug( 'destruct' );
            
            // remove modules
            self.removeModules();
            
            // remove html
            self.removeHtml();
            
            // unset edit module
            self.editModule = null;
            
            // unset row
            self.row = null;            
            
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
            
            // FUNCTION: cancelEdit( void ) void
            cancelEdit : function( ){
                
                // call internal
                self.cancelEdit( );
                
            },
            // FUNCTION: hasChanged( void ) boolean
            changed : function( ){
                
                // return internal call
                return self.changed( );
                
            },
            // FUNCTION: validate( void ) boolean
            validate : function( ){
                
                // return internal call
                return self.validate( );
                
            },
            // FUNCTION: showMessage( named array: options ) void
            showMessage : function( options ){
                
                // call internal
                self.showMessage( options );
                
            },
            // FUNCTION: showError( named array: options ) void
            showError : function( options ){
                
                // call internal
                self.showError( options );
                
            },
            // FUNCTION: getRowId( void ) named array
            getRowId : function( ){
                
                // return result
                return self.row ? row['id'] : null;
                
            },
            // FUNCTION: getRowId( void ) named array
            getData : function( ){
                
                // return internal call
                return self.getData( );
                
            },
            // FUNCTION: layoutChange( void ) void    
            layoutChange : function( ){
                
                // call internal
                self.layoutChange( );
                
            },
            // FUNCTION: destruct( void ) void    
            destruct : function( ){
                
                // call internal
                self.destruct( );
                
            }
            
        };
        // DONE PUBLIC
        
    };
    // DONE MODULE: itemsModule( module: editModule, 
    //                           named array / null: row ) named array  
    
})( mbAdminApp );
// done create module function
