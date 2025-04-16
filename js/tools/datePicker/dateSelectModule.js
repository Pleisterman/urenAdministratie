/*
    @package        Pleisterman/MbAdmin
  
    function:       displays the date selection of the date picker
                    and handels the events

    Last revision:  28-02-2025
 
*/

// create module function
( function( mbAdminApp ){

    // get name space
    const nameSpace = mbAdminApp.tools.datePicker;
        
    // MODULE: dateSelectModule( html element id: parentId, 
    //                           named array: date, 
    //                           named array: callbacks ) named array 
    nameSpace.dateSelectModule = function( parentId, date, callbacks ) {
        // PRIVATE:
        
        // MEMBERS
        const self = this;                                  // object
        self.MODULE = 'DatePickerDateSelectModule';         // string
        self.debugOn = true;                                // boolean
        self.parentId = parentId;                           // html element id
        self.date = date;                                   // done named array 
        self.callbacks = callbacks;                         // named array 
        self.containerOptions = {                           // named array 
            'id'                :   mbAdminApp.getUiId( self.MODULE + 'Container' ), // string 
            'element'           :   'table'                 // html element type 
        };                                                  // done named array 
        self.headerOptions = {                              // named array 
            'id'                :   mbAdminApp.getUiId( self.MODULE + 'Header' ), // string 
            'element'           :   'tr'                    // html element type 
        };                                                  // done named array 
        self.weekHeaderOptions = {                          // named array 
            'id'                :   mbAdminApp.getUiId( self.MODULE + 'WeekHeader' ), // string 
            'element'           :   'td',                   // html element type 
            'text'              :   '&nbsp;',               // string
            'fontSize'          :   '1.2rem',               // css
            'fontWeight'        :   'bold',                 // css
            'padding'           :   '0.3rem'                // css
        };                                                  // done named array 
        self.weekRowOptions = {                             // named array 
            'element'           :   'tr'                    // html element type 
        };                                                  // done named array 
        self.dayNamesOptions = {                            // named array 
            'element'           :   'td',                   // html element type 
            'fontSize'          :   '1.2rem',               // css
            'fontWeight'        :   'bold',                 // css
            'textAlign'         :   'center',               // css
            'minimumWidth'      :   '3.5rem',               // css
            'padding'           :   '0.3rem'                // css
        };                                                  // done named array 
        self.weekNumberOptions = {                          // named array 
            'element'           :   'td',                   // html element type 
            'text'              :   '&nbsp;',               // string
            'textAlign'         :   'center',               // css
            'fontSize'          :   '1.2rem',               // css
            'fontWeight'        :   'bold',                 // css
            'minimumWidth'      :   '2.5rem',               // css
            'padding'           :   '0.3rem'                // css
        };                                                  // done named array 
        self.dayOptions = {                                 // named array 
            'element'           :   'td',                   // html element type 
            'text'              :   '&nbsp;',               // string
            'textAlign'         :   'center',               // css
            'fontSize'          :   '1.2rem',               // css
            'fontWeight'        :   'bold',                 // css
            'minimumWidth'      :   '3.5rem',               // css
            'padding'           :   '0.3rem',               // css
            'color'                 :   mbAdminApp.getColor( 'dark' ).color, // css 
            'backgroundColor'       :   mbAdminApp.getColor( 'lightest' ).color, // css 
            'colors' : {                                        // named array
                'color'             :   mbAdminApp.getColor( 'dark' ).color, // color
                'highlight'         :   mbAdminApp.getColor( 'dark' ).highlight, // color
                'disabled'          :   mbAdminApp.getColor( 'darkest' ).color, // color
                'background' : {                                    // named array
                    'color'         :   mbAdminApp.getColor( 'lightest' ).color, // color
                    'highlight'     :   mbAdminApp.getColor( 'lightest' ).highlight, // color
                    'disabled'      :   mbAdminApp.getColor( 'lightest' ).disabled // color
                },                                              // done named array
                'border' : {                                    // named array
                    'color'         :   mbAdminApp.getColor( 'dark' ).color, // color
                    'highlight'     :   mbAdminApp.getColor( 'dark' ).highlight, // color
                    'disabled'      :   mbAdminApp.getColor( 'dark' ).disabled // color
                }                                              // done named array
            },                                                  // done named array
            'border'            :   true,                   // boolean
            'borderWidth'       :   '1px',                  // css
            'borderColor'       :   'rgba( 175, 175, 175, 1 )', // css 
            'borderStyle'       :   'groove',               // css 
            'borderRadius'      :   '0.1em'                 // css
        };                                                  // done named array 
        self.toDayColors = {                                // named array 
            'color'             :   mbAdminApp.getColor( 'dark' ).color, // color
            'highlight'         :   mbAdminApp.getColor( 'dark' ).highlight, // color
            'disabled'          :   mbAdminApp.getColor( 'dark' ).disabled, // color
            'background' : {                                    // named array
                'color'         :   mbAdminApp.getColor( 'lighter' ).color, // color
                'highlight'     :   mbAdminApp.getColor( 'lightest' ).highlight, // color
                'disabled'      :   mbAdminApp.getColor( 'lightest' ).disabled // color
            },                                              // done named array
            'border' : {                                    // named array
                'color'         :   mbAdminApp.getColor( 'dark' ).color, // color
                'highlight'     :   mbAdminApp.getColor( 'dark' ).highlight, // color
                'disabled'      :   mbAdminApp.getColor( 'dark' ).disabled // color
            }                                               // done named array
        };                                                  // done named array 
        self.toDayButtonOptions = {                         // named array 
            'id'                :   mbAdminApp.getUiId( self.MODULE + 'ToDayButton' ), // string 
            'element'           :   'div',                   // html element type 
            'text'              :   'To day',               // string
            'textAlign'         :   'center',               // css
            'fontSize'          :   '1.2rem',               // css
            'fontWeight'        :   'bold',                 // css
            'width'             :   '100%',                // css
            'paddingTop'        :   '0.3rem',               // css
            'paddingBottom'     :   '0.3rem',               // css
            'color'                 :   mbAdminApp.getColor( 'dark' ).color, // css 
            'backgroundColor'       :   mbAdminApp.getColor( 'lightest' ).color, // css 
            'colors' : {                                        // named array
                'color'             :   mbAdminApp.getColor( 'dark' ).color, // color
                'highlight'         :   mbAdminApp.getColor( 'dark' ).highlight, // color
                'disabled'          :   mbAdminApp.getColor( 'darkest' ).color, // color
                'background' : {                                    // named array
                    'color'         :   mbAdminApp.getColor( 'lightest' ).color, // color
                    'highlight'     :   mbAdminApp.getColor( 'lightest' ).highlight, // color
                    'disabled'      :   mbAdminApp.getColor( 'lightest' ).disabled // color
                },                                              // done named array
                'border' : {                                    // named array
                    'color'         :   mbAdminApp.getColor( 'dark' ).color, // color
                    'highlight'     :   mbAdminApp.getColor( 'dark' ).highlight, // color
                    'disabled'      :   mbAdminApp.getColor( 'dark' ).disabled // color
                }                                              // done named array
            },                                                  // done named array
            'border'            :   true,                   // boolean
            'borderWidth'       :   '1px',                  // css
            'borderColor'       :   'rgba( 175, 175, 175, 1 )', // css 
            'borderStyle'       :   'groove',               // css 
            'borderRadius'      :   '0.1em'                 // css
        };                                                  // done named array 
        self.dayButtons = {};                               // named array                                          
        self.modules = {};                                  // named array                                          
        // DONE MEMBERS     
        
        // FUNCTIONS
        self.construct = function() {
        // FUNCTION: construct( void ) void
            
            // debug info
            self.debug( 'construct' );
            
            // add html
            self.addHtml();
            
            // add header
            self.addHeader();
            
            // add body
            self.addBody();
            
            // add to day button
            self.addToDayButton();
            
            // refresh selection
            self.refreshSelection();
            
        // DONE FUNCTION: construct( void ) void
        };
        self.addHtml = function() {
        // FUNCTION: addHtml( void ) void
            
            // debug info
            self.debug( 'addHtml' );

            // add container to parent
            mbAdminApp.appendContainer( self.parentId, self.containerOptions );
                        
        // DONE FUNCTION: addHtml( void ) void
        };
        self.removeHtml = function(){
        // FUNCTION: removeHtml( void ) void
            
            // remove container
            mbAdminApp.getElementById( self.containerOptions['id'] ).remove();
            
        // DONE FUNCTION: removeHtml( void ) void
        };
        self.addHeader = function(){
        // FUNCTION: addHeader( void ) void
        
            // create header
            mbAdminApp.appendContainer( self.containerOptions['id'], self.headerOptions );
            
            // create week header
            mbAdminApp.appendContainer( self.headerOptions['id'], self.weekHeaderOptions );
            
            // get day names
            const dayNames = mbAdminApp.getSetting( 'dayNames' ).short.split( ',' );
            
            // loop over day names
            for( let i = 0; i < dayNames.length; i++ ){
                
                // set id
                self.dayNamesOptions['id'] = self.MODULE + 'dayName_' + i;
                
                // set text
                self.dayNamesOptions['text'] = dayNames[i];
                
                // add day header
                mbAdminApp.appendContainer( self.headerOptions['id'], self.dayNamesOptions );
                
            }
            // loop over day names
                        
        // DONE FUNCTION: addHeader( void ) void
        };
        self.removeHeader = function(){
        // FUNCTION: removeHeader( void ) void
        
            // get day names
            const dayNames = mbAdminApp.getSetting( 'dayNames' ).short.split( ',' );
            
            // loop over day names
            for( let i = 0; i < dayNames.length; i++ ){
                
                // create id
                const id = self.MODULE + 'dayName_' + i;
                
                // add day header
                mbAdminApp.getElementById( id ).remove();
                
            }
            // loop over day names
                        
            // remove week header
            mbAdminApp.getElementById( self.weekHeaderOptions['id'] ).remove();
            
            // remove header
            mbAdminApp.getElementById( self.headerOptions['id'] ).remove();
            
        // DONE FUNCTION: removeHeader( void ) void
        };
        self.addBody = function(){
        // FUNCTION: addBody( void ) void
            
            // loop over rows
            for( let i = 0; i < 6; i++ ){
                
                // set day header text
                self.weekRowOptions['id'] = self.MODULE + 'WeekRow' + i;
                
                // add day header
                mbAdminApp.appendContainer( self.containerOptions['id'], self.weekRowOptions );

                // set id
                self.weekNumberOptions['id'] = self.MODULE + 'WeekNumber' + i;

                // add week number
                mbAdminApp.appendContainer( self.weekRowOptions['id'], self.weekNumberOptions );
                
                // add day selection
                self.addDaySelection( self.weekRowOptions['id'], i );
                                
            }
            // done loop over rows
            
        // DONE FUNCTION: addBody( void ) void
        };
        self.removeBody = function(){
        // FUNCTION: removeBody( void ) void
            
            // remove day selection
            self.removeDaySelection();

            // remove week selection
            self.removeWeekSelection();
            
        // DONE FUNCTION: removeBody( void ) void
        };
        self.removeWeekSelection = function(){
        // FUNCTION: removeWeekSelection( void ) void
            
            // loop over rows
            for( let i = 0; i < 6; i++ ){
                
                // get week number id
                const weekNumberId = self.MODULE + 'WeekNumber' + i;
                
                // remove week number
                mbAdminApp.getElementById( weekNumberId ).remove();
                
                // get week row id
                const weekRowId = self.MODULE + 'WeekRow' + i;
                
                // remove week row
                mbAdminApp.getElementById( weekRowId ).remove();
                
            }
            // done loop over rows
            
        // DONE FUNCTION: removeWeekSelection( void ) void
        };
        self.addDaySelection = function( parentId, row ){
        // FUNCTION: addDaySelection( html element id: parentId, integer: row ) void
            
            // add days
            for( let j = 0; j < 7; j++ ){

                // create id
                const id = self.MODULE + 'Day' + row + '_' + j;

                // add day selection
                self.addDayButton( parentId, id );

            }                
            // done add days
                                
        // DONE FUNCTION: addDaySelection( html element id: parentId, integer: row ) void
        };
        self.removeDaySelection = function(){
        // FUNCTION: removeDaySelection( void ) void
            
            // loop over day buttons
            Object.entries( self.dayButtons ).forEach( ( [index, button] ) => {

                // destroy button
                button.destruct();

            });
            // loop over day buttons

            // reset day buttons
            self.dayButtons = {};
            
        // DONE FUNCTION: removeDaySelection( void ) void
        };
        self.addDayButton = function( parentId, id ){
        // FUNCTION: addDayButton( html element id: parentId, string: id ) void
            
            // extend day options
            let dayOptions = mbAdminApp.extend( {}, self.dayOptions );
            
            // set id
            dayOptions['id'] = id;
            
            // create callbacks
            const callbacks = {
                'mouseOver'     :   true,
                'mouseOut'      :   true,
                'click'         :   self.dayButtonClick
            };
            // create callbacks
            
            // add button
            self.dayButtons[id] = new mbAdminApp.ui.buttonModule( parentId,
                                                                  dayOptions,
                                                                  callbacks );
            // add button            
            
        // DONE FUNCTION: addDayButton( html element id: parentId, string: id ) void
        };
        self.dayButtonClick = function( event, options ){
        // FUNCTION: dayButtonClick( event: event, named array: options ) void

            // debug info
            self.debug( 'click' );
        
            // stop propagation
            event.stopPropagation();

            // copy callback
            const callback = self.callbacks['select'];
            
            // call callback
            callback( options['date'] );
            
        // DONE FUNCTION: dayButtonClick( event: event, named array: options ) void
        };
        self.addToDayButton = function(){
        // FUNCTION: addToDayButton( void ) void
                        
            // create callbacks
            const callbacks = {
                'mouseOver'     :   true,
                'mouseOut'      :   true,
                'click'         :   self.toDayButtonClick
            };
            // create callbacks
            
            // add button
            self.modules['toDayButton'] = new mbAdminApp.ui.buttonModule( parentId,
                                                                         self.toDayButtonOptions,
                                                                         callbacks );
            // add button            
            
        // DONE FUNCTION: addToDayButton( void ) void
        };
        self.toDayButtonClick = function( event, options ){
        // FUNCTION: toDayButtonClick( event: event, named array: options ) void

            // debug info
            self.debug( 'to day click' );
            
            // stop propagation
            event.stopPropagation();
            
            // copy callback
            const callback = self.callbacks['select'];
            
            // call callback
            callback( self.getToDay() );

        // DONE FUNCTION: toDayButtonClick( event: event, named array: options ) void
        };
        self.getToDay = function( ) {
        // FUNCTION: getToDay( void ) void

            // create date
            const date = new Date( );
            
            // create result
            const result = {
                'year'  :   date.getFullYear(),
                'month' :   date.getMonth() + 1,
                'day'   :   date.getDate()
            };
            // create result

            // return result string
            return result;
            
        // DONE FUNCTION: getToDay( void ) void
        };
        self.removeToDayButton = function(){
        // FUNCTION: removeToDayButton( void ) void
                
            // destroy button
            self.modules['toDayButton'].destruct();
            
            // unset to day button
            delete self.modules['toDayButton'];
            
        // DONE FUNCTION: removeToDayButton( void ) void
        };
        self.refreshSelection = function(){
        // FUNCTION: refreshSelection( void ) void
                        
            // get calander start 
            const calenderStart = self.getCalenderStart();
            
            // show week numbers
            self.showWeekNumbers( calenderStart );
            
            // show days
            self.showDays( calenderStart );
            
        // DONE FUNCTION: refreshSelection( void ) void
        };
        self.getCalenderStart = function( ){
        // FUNCTION: getCalenderStart( void ) void
            
            // create result
            let result = {};
            
            // first day 
            const firstDayOfMonth = new Date( self.date['year'], self.date['month'] - 1, 0 );
            
            // get day
            const day = firstDayOfMonth.getDay() - 1;
            
            // return calender start
            firstDayOfMonth.setDate( firstDayOfMonth.getDate() - day );
            
            // set result
            result['year'] = firstDayOfMonth.getFullYear();
            result['month'] = firstDayOfMonth.getMonth() + 1;
            result['day'] = firstDayOfMonth.getDate();
            // set result
            
            // return result
            return result;
            
        // DONE FUNCTION: getCalenderStart( void ) void
        };
        self.showWeekNumbers = function( calenderStart ){
        // FUNCTION: showWeekNumbers( named array: calenderStart ) void
            
            // copy date
            const date = mbAdminApp.extend( {}, calenderStart );
            
            // get week
            let week = mbAdminApp.getWeekNumber( date );
                
            // create loop date
            let loopDate = new Date( date['year'], date['month'] - 1, date['day'] );
                
            // loop over weeks
            for( let i = 0; i < 6; i++ ){
                
                // get date
                date['year'] = loopDate.getFullYear();
                date['month'] = loopDate.getMonth() + 1;
                date['day'] = loopDate.getDate();
                // get date
                
                // get week
                week = mbAdminApp.getWeekNumber( date );
            
                // get id 
                const id = self.MODULE + 'WeekNumber' + i;
                
                // set element text
                mbAdminApp.getElementById( id ).innerHTML = week;
                
                // set week later
                loopDate.setDate( loopDate.getDate() + 7 );
                
            }
            // loop over weeks
            
        // DONE FUNCTION: showWeekNumbers( named array: calenderStart ) void
        };
        self.showDays = function( calenderStart ){
        // FUNCTION: showDays( named array: calenderStart ) void
            
            // copy date
            const date = mbAdminApp.extend( {}, calenderStart );

            // get current month
            const currentMonth = self.date['month'];

            // create loop date
            let loopDate = new Date( date['year'], date['month'] - 1, date['day'] );

            // create now
            const now = new Date( );

            // get day
            const day = loopDate.getDay() - 1;
            
            // go to first day of display
            loopDate.setDate( loopDate.getDate() - day );
            
            // reset day elements
            for( let i = 0; i < 6; i++ ){
                
                // loop over columns
                for( let j = 0; j < 7; j++ ){
                    
                    // get id
                    let id = self.MODULE + 'Day' + i + '_' + j;
                    
                    // is in current month / else
                    if( loopDate.getMonth() + 1 === currentMonth ){
                        
                        // show day enabled
                        self.showDayEnabled( id, loopDate, now );
                        
                    }
                    else {
                        
                        // show day disabled
                        self.showDayDisabled( id, loopDate.getDate() );
                        
                    }
                    // is in current month / else
                    
                    // go to first day of display
                    loopDate.setDate( loopDate.getDate() + 1 );
                    
                }
                
            
            }
            // done reset day elements
            
        // DONE FUNCTION: showDays( named array: calenderStart ) void
        };
        self.showDayEnabled = function( id, loopDate, now ){
        // FUNCTION: showDayEnabled( string: id, Date: loopDate, Date: now ) void
            
            // set colors
            if( loopDate.getFullYear() === now.getFullYear() &&
                loopDate.getMonth() === now.getMonth() &&
                loopDate.getDate() === now.getDate()  ){

                // set colors
                self.dayButtons[id].setColors( self.toDayColors );

            }
            else {

                // set colors
                self.dayButtons[id].setColors( self.dayOptions['colors'] );

            }
            // set colors

            // create date
            const date = {
                'year'  :   loopDate.getFullYear(),
                'month' :   loopDate.getMonth() + 1,
                'day'   :   loopDate.getDate()
            };
            // create date

            // disable button
            self.dayButtons[id].enable();
            self.dayButtons[id].setOption( 'date', date );
            mbAdminApp.setStyle( id, 'border-width', '1px' );
            mbAdminApp.setStyle( id, 'cursor', 'pointer' );
            mbAdminApp.getElementById( id ).innerHTML = loopDate.getDate();
            // done set style
            
        // DONE FUNCTION: showDayEnabled( string: id, Date: loopDate, Date: now ) void
        };
        self.showDayDisabled = function( id, text ){
        // FUNCTION: showDayDisabled( string: id, string: text ) void
            
            // set style
            self.dayButtons[id].disable();
            mbAdminApp.setStyle( id, 'border-width', '0px' );
            mbAdminApp.setStyle( id, 'cursor', 'hand' );
            mbAdminApp.getElementById( id ).innerHTML = text;
            // done set style
                    
        // DONE FUNCTION: showDayDisabled( string: id, string: text ) void
        };
        self.setDate = function( date ){
        // FUNCTION: setDate( named array: date ) void
            
            // set date
            self.date['year'] = date['year'];
            self.date['month'] = date['month'];
            self.date['day'] = date['day'];
            // set date
            
            // refresh selection
            self.refreshSelection();
            
        // DONE FUNCTION: setDate( named array: date ) void
        };
        self.destruct = function(){
        // FUNCTION: destruct( void ) void
            
            // remove to day button
            self.removeToDayButton();
            
            // remove body
            self.removeBody();
            
            // remove header
            self.removeHeader();
            
            // remove html
            self.removeHtml();
            
            // unset date
            self.date = null;
            
            // unset callbacks
            self.callbacks = null;
            
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

            // FUNCTION: setDate( named array: date ) void    
            setDate : function( date ){
                
                // call internal
                self.setDate( date );
                
            },
            // FUNCTION: destruct( void ) void    
            destruct : function( ){
                
                // call internal
                self.destruct( );
                
            }
            
        };
        // DONE PUBLIC
        
    };
    // DONE MODULE: dateSelectModule( html element id: parentId, 
    //                                named array: date, 
    //                                named array: callbacks ) named array
    
})( mbAdminApp );
// done create module function
