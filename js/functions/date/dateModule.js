/*
    @package        Pleisterman/MbAdmin

    function:       Returns the week number of a date

                    Adds the function:
                
                        mbAdminApp.getWeekNumber( named array: date ) integer
                        mbAdminApp.getDate( ) named array
                    
                    to the application

    Last revision:  27-02-2025
 
*/    

// create module function
( function( mbAdminApp ){
        
    // create name space
    mbAdminApp.functions = mbAdminApp.functions ? mbAdminApp.functions : {};
            
    // MODULE: dateModule( void ) named array
    mbAdminApp.functions.dateModule = function( ) {
        // PRIVATE:

        // MEMBERS:
        let self = this;                                    // object
        self.debugOn = false;                               // boolean
        self.MODULE = 'FunctionsDateModule';                // string
        // DONE MEMBERS     
        
        // FUNCTIONS
        self.construct = function() {
        // FUNCTION: construct( void ) void
            
            // add the extensions to the application
            self.addApplicationsExtensions();
            
        // DONE FUNCTION: construct( void ) void
        };
        self.addApplicationsExtensions = function(){
        // FUNCTION addApplicationsExtensions( void ) void
        
            // add get weej number function
            mbAdminApp.getWeekNumber = self.getWeekNumber;
            
            // add get date function
            mbAdminApp.getDate = self.getDate;
            
            // add get database date function
            mbAdminApp.getDatabaseDate = self.getDatabaseDate;
            
            // add get date string function
            mbAdminApp.getDateString = self.getDateString;
            
            // add database date to date function
            mbAdminApp.databaseDateToDate = self.databaseDateToDate;
            
        // DONE FUNCTION: addApplicationsExtensions( void ) void
        };
        self.getWeekNumber = function( date ) {
        // FUNCTION: getWeekNumber( named array: date ) integer

            // copy date
            let dateCopy = new Date( date['year'], date['month'] - 1, date['day'] );
            dateCopy.setHours(0, 0, 0, 0);
            dateCopy.setDate( dateCopy.getDate() + 3 - ( dateCopy.getDay() + 6 ) % 7 );
            
            // create week date
            let week = new Date( dateCopy.getFullYear(), 0, 4 );

            // done calculate week number from date
            return 1 + Math.round( ( ( dateCopy.getTime() - week.getTime()) / 86400000 - 3 + ( week.getDay() + 6 ) % 7 ) / 7 );
            
        // DONE FUNCTION: setStyle( named array: date ) integer
        };
        self.getDate = function(){
        // FUNCTION getDate( void ) named array
        
            // copy date
            let dateCopy = new Date( );
        
            // create date
            let date = {
                'year'      :   dateCopy.getFullYear(),
                'month'     :   dateCopy.getMonth() + 1,
                'day'       :   dateCopy.getDate()
            };
            // create date
            
            // return result
            return date;
        
        // DONE FUNCTION: getDate( void ) named array
        };
        self.getDatabaseDate = function(){
        // FUNCTION getDatabaseDate( void ) named array
        
            // copy date
            let dateCopy = new Date( );
        
            // create date
           let date = dateCopy.getFullYear();
           date += '-' + mbAdminApp.pad( parseInt( dateCopy.getMonth() + 1 ), '0', 2 );
           date += '-' + mbAdminApp.pad( parseInt( dateCopy.getDate() ), '0', 2 );
            // create date
            
            // return result
            return date;
        
        // DONE FUNCTION: getDatabaseDate( void ) named array
        };
        self.getDateString = function( date ){
        // FUNCTION getDateString( named array: date ) string
        
            // create date string
            let dateString = '';
            dateString +=  mbAdminApp.pad( date['day'], '0', 2 );
            dateString +=  '-';
            dateString +=  mbAdminApp.pad( date['month'], '0', 2 );
            dateString +=  '-';
            dateString +=  date['year'];
            // create date string
        
            // return result
            return dateString;
        
        // DONE FUNCTION: getDateString( named array: date ) string
        };
        self.databaseDateToDate = function( date ) {
        // FUNCTION: databaseDateToDate( string: date ) named array

            // string length is 8
            if( date.length <= 8 ){
                
                // get database day to date
                return self.databaseDayToDate( date );
                
            }
            // string length is 8

            // split date
            let dateParts = date.split( " " );
            
            // get date part
            let datePart = dateParts[0];
            
            //  cretae result
            let result = {
                'year'      :   parseInt( datePart.substring( 0, 4 ) ),
                'month'     :   parseInt( datePart.substring( 5, 7 ) ),
                'day'       :   parseInt( datePart.substring( 8, 10 ) )
            };
            //  cretae result

            // return result
            return result;

        // DONE FUNCTION: databaseDateToDate( string: date ) named array
        };
        self.databaseDayToDate = function( date ) {
        // FUNCTION: databaseDayToDate( string: date ) named array

            // split date
            let dateParts = date.split( " " );
            
            // get date part
            let datePart = dateParts[0];
            
            //  cretae result
            let result = {
                'year'      :   parseInt( datePart.substring( 0, 4 ) ),
                'month'     :   parseInt( datePart.substring( 4, 6 ) ),
                'day'       :   parseInt( datePart.substring( 6, 8 ) )
            };
            //  cretae result

            // return result
            return result;

        // DONE FUNCTION: databaseDayToDate( string: date ) named array
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
        };
        // DONE PUBLIC
        
    };
    // DONE MODULE: dateModule( void ) named array 
    
})( mbAdminApp );
// done create module function


