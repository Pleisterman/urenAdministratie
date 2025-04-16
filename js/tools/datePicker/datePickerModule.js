/*
    @package        Pleisterman/MbAdmin
  
    function:       displays a date picker
                    adds the functions:

                        mbAdminApp.showDatePicker ( shows a date picker )
                        mbAdminApp.hideDatePicker ( hides the date picker )

                    to the application    

    Last revision:  28-02-2025
 
*/

// create module function
( function( mbAdminApp ){

    // get name space
    let nameSpace = mbAdminApp;
    
    // create name spaces
    nameSpace.tools = nameSpace.tools ? nameSpace.tools : {};
    nameSpace = nameSpace.tools;
    nameSpace.datePicker = nameSpace.datePicker ? nameSpace.datePicker : {};
    nameSpace = nameSpace.datePicker;
    // create name spaces
    
    // MODULE: datePickerModule( void ) named array 
    nameSpace.datePickerModule = function( ) {
        // PRIVATE:
        
        // MEMBERS
        const self = this;                          // object
        self.MODULE = 'DatePickerModule';           // string
        self.debugOn = false;                       // boolean
        self.containerOptions = {                   // named array 
            'id'                :   mbAdminApp.getUiId( self.MODULE + 'Container' ), // string 
            'element'           :   'div',          // html element type 
            'position'          :   'absolute',     // css
            'left'              :   '0px',          // css
            'top'               :   '0px',          // css
            'backgroundColor'   :   mbAdminApp.getColor( 'light' ).color, // css
            'border'            :   true,           // boolean
            'borderWidth'       :   '1px',          // css
            'borderColor'       :   mbAdminApp.getColor( 'darkest' ).color, // css 
            'borderStyle'       :   'groove'        // css
        };                                          // done named array 
        self.displayOptions = {                     // named array
            'visible'           :   false,          // boolean
            'defaultAlign'      :   'center',       // string
            'minimumTop'        :   45,             // integer
            'minimumLeft'       :   45,             // integer
            'spacingLeft'       :   -20,            // integer
            'spacingRight'      :   8,              // integer
            'spacingTop'        :   32,             // integer
            'above' : {                             // named array
                'marginBottom'  :   25              // integer                
            },                                      // done named array    
            'under' : {                             // named array        
                'marginTop'     :   55              // integer
            }                                       // done named array
        };                                          // done named array   
        self.parentId = mbAdminApp.getTopOverlayId();   // html element id
        self.modules = {};                          // named array                                          
        self.date = {};                             // named array
        self.callerOptions = null;                  // named array / null
        // DONE MEMBERS     
        
        // FUNCTIONS
        self.construct = function() {
        // FUNCTION: construct( void ) void
            
            // debug info
            self.debug( 'construct' );
            
            // add the extensions to mbAdminApp
            self.addApplicationsExtensions();
            
        // DONE FUNCTION: construct( void ) void
        };
        self.addApplicationsExtensions = function(){
        // FUNCTION addApplicationsExtensions( void ) void
        
            // add show date picker function
            mbAdminApp.showDatePicker = self.show;
            
            // add hide date picker function
            mbAdminApp.hideDatePicker = self.hide;
            
        // DONE FUNCTION: addApplicationsExtensions( void ) void
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
        self.show = function( callerOptions ){
        // FUNCTION: show( void ) void
            
            // already open
            if( self.displayOptions['visible'] ){
                
                // done 
                return;
                
            }
            // already open
            
            // remember visibility
            self.displayOptions['visible'] = true;
            
            // remember caller options
            self.callerOptions = callerOptions;
            
            // set date
            self.date['year'] = self.callerOptions['date']['year'];
            self.date['month'] = self.callerOptions['date']['month'];
            self.date['day'] = self.callerOptions['date']['day'];
            // done set date

            // create date picker
            self.createDatePicker();
            
            // add event subscriptions
            self.addEventSubscriptions();
            
            // show 
            mbAdminApp.setStyle( self.parentId, 'display', 'block' );

            // refresh layout
            self.layoutChange();
            
        // DONE FUNCTION: show( void ) void
        };
        self.hide = function() {
        // FUNCTION: hide( void ) void

            // remove date picker
            self.removeDatePicker();

            // remove event subscriptions
            self.removeEventSubscriptions();
            
            // reset caller options
            self.callerOptions = null;
            
            // hide overlay
            mbAdminApp.setStyle( self.parentId, 'display', 'none' );

            // set ! visible
            self.displayOptions['visible'] = false;            

        // DONE FUNCTION: hide( void ) void
        };
        self.createDatePicker = function(){
        // FUNCTION: createDatePicker( void ) void
            
            // add html
            self.addHtml();
            
            // add events
            self.addEvents();
            
            // add header
            self.addHeader();
            
            // add date select
            self.addDateSelect();
            
        // DONE FUNCTION: createDatePicker( void ) void
        };
        self.removeDatePicker = function(){
        // FUNCTION: removeDatePicker( void ) void
            
            // remove events
            self.removeEvents();
            
            // remove date select
            self.removeDateSelect();
            
            // remove header
            self.removeHeader();
            
            // remove html
            self.removeHtml();
            
        // DONE FUNCTION: removeDatePicker( void ) void
        };
        self.addHtml = function() {
        // FUNCTION: addHtml( void ) void
            
            // debug info
            self.debug( 'addHtml' );
            
            // add container to document
            mbAdminApp.appendContainer( self.parentId, self.containerOptions );
            
        // DONE FUNCTION: addHtml( void ) void
        };
        self.removeHtml = function() {
        // FUNCTION: removeHtml( void ) void
            
            // remove container
            mbAdminApp.getElementById( self.containerOptions['id'] ).remove();
            
        // DONE FUNCTION: removeHtml( void ) void
        };
        self.addEvents = function() {
        // FUNCTION: addEvents( void ) void
            
            // add container click
            mbAdminApp.getElementById( self.containerOptions['id'] ).addEventListener( 'click', self.containerClick ); 
            
            // add overlay click
            mbAdminApp.getElementById( self.parentId ).addEventListener( 'click', self.hide ); 
            
        // DONE FUNCTION: addEvents( void ) void
        };
        self.removeEvents = function() {
        // FUNCTION: removeEvents( void ) void
            
            // remove overlay click
            mbAdminApp.getElementById( self.containerOptions['id'] ).removeEventListener( 'click' , self.containerClick ); 
                
            // remove overlay click
            mbAdminApp.getElementById( self.parentId ).removeEventListener( 'click' , self.hide ); 
                
        // DONE FUNCTION: removeEvents( void ) void
        };
        self.containerClick = function( event ){
        // FUNCTION: containerClick( event: event ) void
                        
            // stop propagation
            event.stopPropagation();
            
        // DONE FUNCTION: containerClick( event: event ) void
        };
        self.addHeader = function(){
        // FUNCTION: addHeader( void ) void
                        
            // create callbacks
            const callbacks = {
                'previousYear'      :   self.previousYear,
                'previousMonth'     :   self.previousMonth,
                'nextYear'          :   self.nextYear,
                'nextMonth'         :   self.nextMonth
            };
            // create callbacks
            
            // add button
            self.modules['header'] = new nameSpace.headerModule( self.containerOptions['id'],
                                                                 self.date,
                                                                 callbacks );
            // add button

        // DONE FUNCTION: addHeader( void ) void
        };
        self.removeHeader = function(){
        // FUNCTION: removeHeader( void ) void
            
            // destroy header
            self.modules['header'].destruct();
                       
            // unset header
            delete self.modules['header'];
            
        // DONE FUNCTION: removeHeader( void ) void
        };
        self.addDateSelect = function(){
        // FUNCTION: addDateSelect( void ) void
                        
            // create callbacks
            const callbacks = {
                'select'        :   self.select
            };
            // create callbacks
            
            // get date select module
            const dateSelectModule = nameSpace.dateSelectModule;
            
            // add button
            self.modules['dateSelect'] = new dateSelectModule( self.containerOptions['id'],
                                                               self.date,
                                                               callbacks );
            // add button

        // DONE FUNCTION: addDateSelect( void ) void
        };
        self.removeDateSelect = function(){
        // FUNCTION: removeDateSelect( void ) void
            
            // destroy date select
            self.modules['dateSelect'].destruct();
                       
            // unset date select
            delete self.modules['dateSelect'];
            
        // DONE FUNCTION: removeDateSelect( void ) void
        };
        self.previousYear = function(){
        // FUNCTION: previousYear( void ) void
            
            // get date with month + 1 
            const date = new Date( self.date['year'] - 1, self.date['month'] - 1, self.date['day'] );
            
            // set date
            self.date['year'] = date.getFullYear();
            self.date['month'] = date.getMonth() + 1;
            self.date['day'] = date.getDate();
            // set date

            // set header date
            self.modules['header'].setDate( self.date );
            
            // set selected date
            self.modules['dateSelect'].setDate( self.date );
            
        // DONE FUNCTION: previousYear( void ) void
        };
        self.previousMonth = function(){
        // FUNCTION: previousMonth( void ) void
            
            // get date with month + 1 
            const date = new Date( self.date['year'], self.date['month'] - 2, self.date['day'] );
            
            // set date
            self.date['year'] = date.getFullYear();
            self.date['month'] = date.getMonth() + 1;
            self.date['day'] = date.getDate();
            // set date

            // set header date
            self.modules['header'].setDate( self.date );
            
            // set selected date
            self.modules['dateSelect'].setDate( self.date );
            
        // DONE FUNCTION: previousMonth( void ) void
        };
        self.nextMonth = function(){
        // FUNCTION: nextMonth( void ) void
            
            // get date with month + 1 
            const date = new Date( self.date['year'], self.date['month'], self.date['day'] );
            
            // set date
            self.date['year'] = date.getFullYear();
            self.date['month'] = date.getMonth() + 1;
            self.date['day'] = date.getDate();
            // set date

            // set header date
            self.modules['header'].setDate( self.date );
            
            // set selected date
            self.modules['dateSelect'].setDate( self.date );
            
        // DONE FUNCTION: nextMonth( void ) void
        };
        self.nextYear = function(){
        // FUNCTION: nextYear( void ) void
            
            // get date with month + 1 
            const date = new Date( self.date['year'] + 1, self.date['month'] - 1, self.date['day'] );
            
            // set date
            self.date['year'] = date.getFullYear();
            self.date['month'] = date.getMonth() + 1;
            self.date['day'] = date.getDate();
            // set date

            // set header date
            self.modules['header'].setDate( self.date );
            
            // set selected date
            self.modules['dateSelect'].setDate( self.date );
            
        // DONE FUNCTION: nextYear( void ) void
        };
        self.select = function( date ) {
        // FUNCTION: select( named aray: date ) void

            // copy calback
            const callback = self.callerOptions['callbacks']['select'];

            // hide
            self.hide();

            // call callback
            callback( date );
            
        // DONE FUNCTION: select( named aray: date ) void
        };
        self.layoutChange = function() {
        // FUNCTION: layoutChange( void ) void

            // ! visible   
            if( !self.displayOptions['visible'] ){
                
                
                // done 
                return;
                
            }
            // ! visible   
            
            // get caller layout
            const callerLayout = mbAdminApp.getElementById( self.callerOptions['elementId'] ).getBoundingClientRect();
            
            // get ovelay layout
            const overlayLayout = mbAdminApp.getElementById( self.parentId ).getBoundingClientRect();
            
            // get container layout
            const containerLayout = mbAdminApp.getElementById( self.containerOptions['id'] ).getBoundingClientRect();
            
            // set left
            self.setLeft( callerLayout, overlayLayout, containerLayout );
            
            // set top
            self.setTop( callerLayout, overlayLayout, containerLayout );
            
        // DONE FUNCTION: layoutChange( void ) void
        };
        self.setLeft = function( callerLayout, overlayLayout, containerLayout ) {
        // FUNCTION: setLeft( named array: callerLayout, named array: overlayLayout, named array: containerLayout ) void

            // get align
            const align = self.callerOptions['align'] ? self.callerOptions['align'] : self.defaultAlign;
            
            // create left
            let left = callerLayout.left;
            
            // align is left
            if( align === 'left' ){
                
                // add caller width
                left += callerLayout.width;

                // add spacing left
                left += self.displayOptions['spacingLeft'];
                
            }
            // align is left
            
            // align is center
            if( align === 'center' ){
                
                // add half caller width 
                left += callerLayout.width / 2;
                
                // subtract half container width
                left -= containerLayout.width / 2;

            }
            // align is center
            
            // align is right
            if( align === 'right' ){
                
                // subtract half width
                left -= containerLayout.width;
                
                // subtract spacing right
                left -= self.displayOptions['spacingRight'];

            }
            // align is right
            
            // move position left when caller position is 3 / 4 to the right            
            if( left > ( overlayLayout.width / 4 ) * 3 ){
                left['left'] -= containerLayout.width / 2;
            }
            // done move position left when caller position is 3 / 4 to the right            

            // set minimum left             
            if( left < self.displayOptions['minimumLeft'] ){
                left = self.displayOptions['minimumLeft'];
            }
            // set minimum left            

            // set left
            mbAdminApp.setStyle( self.containerOptions['id'], 'left', left + 'px' );
            
        // DONE FUNCTION: setLeft( named array: callerLayout, named array: overlayLayout, named array: containerLayout ) void
        };
        self.setTop = function( callerLayout, overlayLayout, containerLayout ) {
        // FUNCTION: setTop( named array: callerLayout, named array: overlayLayout, named array: containerLayout ) void
        
            // create top
            let top = callerLayout['top'];
        
            // caller top > layout height / 2
            if( callerLayout['top'] > ( overlayLayout.height / 2 ) ){
                
                // subtract date picker height
                top -= containerLayout.height;
                
                // subtract margin
                top -= self.displayOptions['above']['marginBottom'];
            
                // min top
                top = Math.max( 0, top );
                
            }
            else {
                
                // subtract margin
                top += self.displayOptions['under']['marginTop'];
                
                // min top
                top = Math.min( overlayLayout.height - ( containerLayout.height + self.displayOptions['under']['marginTop'] ), top );
                
            }
            // caller top > layout height / 2
                            
            // set top
            mbAdminApp.setStyle( self.containerOptions['id'], 'top', top + 'px' );
                        
        // DONE FUNCTION: setTop( named array: callerLayout, named array: overlayLayout, named array: containerLayout ) void
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
    // DONE MODULE: datePickerModule( void ) named array
    
})( mbAdminApp );
// done create module function
